const AWS = require("aws-sdk");
const uuid = require("uuid");
const config = require("../config");

AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.addPurchase_post = (req, res) => {
  const params = req.body;
  params.Item.order_id = uuid.v1();
  console.log("Adding a new item...");
  try {
    docClient.put(params, function (err, data) {
      if (err) {
        throw (JSON.stringify(err, null, 2));
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        return res.status(200).send("Added item");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error)
  }
};
