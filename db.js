var AWS = require('aws-sdk')
AWS.config.loadFromPath('./config.json');

var dynamodb = new AWS.DynamoDB();
var config = require('./config.json');
var table = config.database;

var docClient = new AWS.DynamoDB.DocumentClient()

var write = function (data, callback) {

  //console.log("my data is ", data)

  var params = {
    RequestItems: {
    }
  };
  params.RequestItems[table] = []
  for (var i =0; i<data.statuses.length; i++) {
    var obj = {
      PutRequest: {
        Item: {}
      }
    };
    obj.PutRequest.Item.text = { S: data.statuses[i].text};
    var url = "https://twitter.com/statuses/"+data.statuses[i].id_str
    obj.PutRequest.Item.url = { S: url };
    obj.PutRequest.Item.tweetid = { S: data.statuses[i].id_str };
    //obj.PutRequest.Item.new_date = { S: data.new_date };
    //obj.PutRequest.Item.paid_date = { S: data.paid_date };
    //obj.PutRequest.Item.queued_date = {S: data.queued_date};
    //obj.PutRequest.Item.submitted_date = {S: data.submitted_date};
    //obj.PutRequest.Item.completed_date = {S: data.completed_date};
    //obj.PutRequest.Item.hash = { S: data.hash };
    //obj.PutRequest.Item.name = { S: data.name };
    //obj.PutRequest.Item.type = { S: data.type };
    //obj.PutRequest.Item.size = { S: data.size };
    //obj.PutRequest.Item.lastModified = { S: data.lastModified };
    //obj.PutRequest.Item.eth_transaction_id = {S: data.eth_transaction_id};
    //obj.PutRequest.Item.eth_contract_id = {S: data.eth_contract_id};
    //obj.PutRequest.Item.currency = { S: data.currency };
    //obj.PutRequest.Item.amount = { N: "" + data.amount };
    //obj.PutRequest.Item.client_email = { S: data.client_email };

    params.RequestItems[table].push(obj);
    console.log(JSON.stringify(params))
    dynamodb.batchWriteItem(params, callback);

  };
}


module.exports = {
  write: write
};