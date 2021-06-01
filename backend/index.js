
const AWS = require("aws-sdk");
const uuid = require('uuid');
const config = require('./config.js');
const express = require('express');
const app = express();



AWS.config.update(config.aws_remote_config);

const docClient = new AWS.DynamoDB.DocumentClient();
const table = "E-Commerce";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName:table,
    Item:{
        "order_id": uuid.v1(),
        "full_name": year,
        "total_price": title,
        "user_data":{
            "email_adress": "Nothing happens at all.",
            "phone_number": 0,
            "adress":"",


        }   
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});