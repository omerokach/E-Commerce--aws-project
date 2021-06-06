const AWS = require("aws-sdk");
const uuid = require("uuid");
const config = require("../config");

AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.addPurchase_post = (req, res) => {
  console.log(req.body);
  const params = {
    Item: req.body,
    TableName: "E-Commerce",
  };
  params.Item.order_id = uuid.v1();
  console.log("Adding a new item...");
  try {
    docClient.put(params, function (err, data) {
      if (err) {
        throw JSON.stringify(err, null, 2);
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        // sns sms
        const snsParams = {
          Message: `thank you for buying 😇 ${req.body.full_name}` ,
          PhoneNumber: "+972" + req.body.phone_number,
          MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
              DataType: "String",
              StringValue: "Shoping",
            },
          },
        };
        const publishTextPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
          .publish(snsParams)
          .promise();

        publishTextPromise
          .then(function (data) {
            console.log(data);
            // res.end(JSON.stringify({ MessageID: data.MessageId }));
          })
          .catch(function (err) {
            console.log(err);
            // res.end(JSON.stringify({ Error: err }));
          });

        // Create sendEmail params
          var params = {
            Destination: {
              ToAddresses: [req.body.email]
            },
            Message: {
              /* required */
              Body: {
                /* required */
                Html: {
                  Charset: "UTF-8",
                  Data: "<html><body><h1>Dear consumer,</h1><p style='color:red'>Thank you for buying</p></body></html>",
                },
                Text: {
                  Charset: "UTF-8",
                  Data: `${req.body.full_name}, thank you for buying with us 😇`,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Thank for using our service",
              },  
            },
            Source: "omerrokach@gmail.com" /* required */,
          };

          // Create the promise and SES service object
          var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();

          // Handle promise's fulfilled/rejected states
          sendPromise
            .then(function (data) {
              console.log(data.MessageId);
            })
            .catch(function (err) {
              console.error(err, err.stack);
            });
        return res.status(200).send("Added item");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
