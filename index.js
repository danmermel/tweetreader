var Twitter=require("twitter");

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});


var options = {
  q: "education OR school OR pupil OR student OR college",
  geocode: "52.550370,-0.890966,200mi",
  count:10
}
client.get('search/tweets', options, function(error, tweets, response) {
   console.log(tweets.statuses.length)
   for (var i=0; i<tweets.statuses.length; i++) {
     console.log(tweets.statuses[i].text);
     console.log("https://twitter.com/statuses/"+tweets.statuses[i].id_str);
   }
});
