var Twitter = require("twitter");
var AWS = require('aws-sdk');
var db = require("./db.js");
var config = require('./config.json');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./config.json');

var client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});


var options = {
  q: "education OR school OR pupil OR student OR college",
  geocode: "52.550370,-0.890966,200mi",  //this is the middle of the UK and a 200 mile radius around it. 
  count: 25  //you can only batch write up to 25 items into dynamodb so this would be the upper limit
  // we can add more params, like a time window etc
}
client.get('search/tweets', options, function (error, tweets, response) {
  console.log(tweets.statuses.length)
  console.log(response)
  db.write(tweets, function (err, data) {
    if (err) {
      throw (new Error('failed to write to database'))
    } else {
      console.log("Written to db");

    }
  })

});
