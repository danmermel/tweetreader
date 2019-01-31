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

    params.RequestItems[table].push(obj);
    console.log(JSON.stringify(params))
    dynamodb.batchWriteItem(params, callback);

  };
}


module.exports = {
  write: write
};