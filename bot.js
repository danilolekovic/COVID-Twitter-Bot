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
    "We appreciate you, healthcare workers!"
];

https.get("https://pomber.github.io/covid19/timeseries.json", (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let data = JSON.parse(body);

            jsonToday = data.Canada[data.Canada.length - 1];
            let todayCases = jsonToday.confirmed;
            let todayRecoveries = jsonToday.recovered;
        
            jsonYesterday = data.Canada[data.Canada.length - 2];
            let newCases = jsonToday.confirmed - jsonYesterday.confirmed;
            let newDeaths = jsonToday.deaths - jsonYesterday.deaths;
            let newRecoveries = jsonToday.recovered - jsonYesterday.recovered;
        
            Bot.tweet("There are currently " + todayCases + " COVID-19 cases in Canada. #covid19");
            Bot.tweet("Since yesterday, there have been " + newCases + " new cases in Canada. That's a " + Math.round(newCases / todayCases * 100) + "% increase since yesterday. #covid19");
            Bot.tweet(newRecoveries + " people have recovered from COVID-19 in Canada today! " + thankingPhrases[Math.floor(Math.random() * thankingPhrases.length)] + " #covid19");
            Bot.tweet(newDeaths + " people have died from COVID-19 in Canada today. #covid19");
            Bot.tweet("In total, " + todayRecoveries + " people have recovered from COVID-19. " + thankingPhrases[Math.floor(Math.random() * thankingPhrases.length)] + " #covid19");
        
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});