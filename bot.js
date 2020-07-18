let Twit = require("twit");
const https = require("https");

let T = new Twit({
	consumer_key: process.env.BOT_CONSUMER_KEY,
	consumer_secret: process.env.BOT_CONSUMER_SECRET,
	access_token: process.env.BOT_ACCESS_TOKEN,
	access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

let thankingPhrases = [
	"Thank you to the healthcare workers!",
	"Good work healthcare workers!",
	"To our frontline healthcare workers, thank you!",
	"This wouldn't be possible without our healthcare workers!",
	"We appreciate you, healthcare workers!"
];

https.get("https://corona.lmao.ninja/v2/countries/Canada", (res) => {
	let body = "";

	res.on("data", (chunk) => {
		body += chunk;
	});

	res.on("end", () => {
		try {
			let data = JSON.parse(body);

			T.post("statuses/update", {
					status: "Currently, there are a total of " + data.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " confirmed cases and " + data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " deaths in #Canada. #COVID19"
				},
				function(error, tweet, response) {
					if (error) {
						console.log(error);
					}
					console.log(tweet);
					console.log(response);
				}
			);

			T.post("statuses/update", {
					status: "At the moment, there have been " + data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " recoveries in #Canada. " + thankingPhrases[Math.floor(Math.random() * thankingPhrases.length)] + " 🙏 #COVID19"
				},
				function(error, tweet, response) {
					if (error) {
						console.log(error);
					}
					console.log(tweet);
					console.log(response);
				}
			);

			T.post("statuses/update", {
					status: "Today, there have been " + data.todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " new confirmed cases and " + data.todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " deaths in #Canada. #COVID19"
				},
				function(error, tweet, response) {
					if (error) {
						console.log(error);
					}
					console.log(tweet);
					console.log(response);
				}
			);

			T.post("statuses/update", {
					status: "At the moment, there have been " + data.tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " tests for #COVID19 in #Canada"
				},
				function(error, tweet, response) {
					if (error) {
						console.log(error);
					}
					console.log(tweet);
					console.log(response);
				}
			);
		} catch (error) {
			console.error(error.message);
		};
	});

}).on("error", (error) => {
	console.error(error.message);
});