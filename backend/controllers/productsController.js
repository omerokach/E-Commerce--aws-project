const AWS = require("aws-sdk");
const uuid = require("uuid");
const config = require("../config");

AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.products_get = (req, res) => {
  const params = {
    TableName: "products",
  };
  try {
    docClient.scan(params, (err, data) => {
      if (err) {
        throw(err);
      } else {
        console.log(`Found ${data.Count} products`);
        res.status(200).json(data);
      }
    });
  } catch (error) {
    res.status(403).send(error)
  }
};
