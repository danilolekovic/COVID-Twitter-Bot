let Twit = require("twit");
let TwitterBot = require("node-twitterbot").TwitterBot;
const https = require("https");

let Bot = new TwitterBot({
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

https.get("https://corona.lmao.ninja/countries/Canada", (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let data = JSON.parse(body);

            Bot.tweet("Currently, there are a total of " + data.cases + " confirmed cases and " + data.deaths + " deaths in Canada. #COVID19");
            Bot.tweet("At the moment, there have been " + data.recovered + " recoveries in Canada. " + thankingPhrases[Math.floor(Math.random() * thankingPhrases.length)] + " 🙏 #COVID19");
            Bot.tweet("Today, there have been " + data.todayCases + " new confirmed cases and " + data.todayDeaths + " deaths in Canada. #COVID19");
        
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});