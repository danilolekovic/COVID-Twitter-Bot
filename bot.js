let Twit = require("twit");
let TwitterBot = require("node-twitterbot").TwitterBot;

let Bot = new TwitterBot({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

let thankingPhrases = [
    "Thank you to the healthcare workers!",
    "Good work!",
    "Thank you!",
    "We appreciate you, healthcare workers!"
];

$.getJSON("https://pomber.github.io/covid19/timeseries.json", function(data) {
    jsonToday = data.Canada[data.Canada.length - 1];
    let todayCases = jsonToday.confirmed;
    let todayRecoveries = jsonToday.recovered;

    jsonYesterday = data.Canada[data.Canada.length - 2];
    let newCases = jsonToday.confirmed - jsonYesterday.confirmed;
    let newDeaths = jsonToday.deaths - jsonYesterday.deaths;
    let newRecoveries = jsonToday.recovered - jsonYesterday.recovered;

    Bot.tweet("Right now, there are " + newCases + " new cases in Canada. That's a " + round(newCases / todayCases) + "% increase since yesterday. #covid19");
    Bot.tweet(newRecoveries + " people have recovered from COVID-19 in Canada today! " + thankingPhrases[Math.floor(Math.random() * thankingPhrases.length)] + " #covid19");
    Bot.tweet(newDeaths + " people have died from COVID-19 in Canada today. #covid19");
    Bot.tweet("So far, " + todayRecoveries + " have recovered from COVID-19. Big thanks to our healthcare professionals! #covid19");
});