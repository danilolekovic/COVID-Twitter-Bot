let Twit = require("twit");

let Bot = new Twit({
	consumer_key: process.env.BOT_CONSUMER_KEY,
	consumer_secret: process.env.BOT_CONSUMER_SECRET,
	access_token: process.env.BOT_ACCESS_TOKEN,
	access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

var params = {
	q: "from:CanadianPM #COVID19",
	result_type: "recent",
	lang: "en"
}

Bot.get("search/tweets", params, function(err, data) {
	if (!err) {
		var retweetId = data.statuses[0].id_str;
		Bot.post("statuses/retweet/:id", {
			id: retweetId
		}, function(err, response) {
			if (response) {
				console.log("Retweeted!");
			}
			if (err) {
				console.log(err);
				console.log("Problem when retweeting.");
			}
		});
	} else {
		console.log("Error during tweet search call");
	}
});