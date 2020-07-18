# COVID [![Twitter](http://i.imgur.com/tXSoThF.png)](https://twitter.com/CanadaCovid19B1) Bot

This repository contains a Twitter bot that tweets the latest information about the COVID-19 pandemic in Canada. It uses [twit](https://github.com/ttezel/twit#readme) and [disease.sh](https://github.com/disease-sh/api). The part of the bot that tweets new information is in [this file](bot.js), and the part of the bot that retweet Prime Minister Trudeau's latest COVID-related tweet is in [this file](retweet.js).

The bot's twitter account is [@CanadaCovid19B1](https://twitter.com/CanadaCovid19B1).

## Your Country

Want to make the same thing for your country? Fork the repository. Go to [bot.js](bot.js) and, on `line #19`, change **"Canada"** to the name of your country. Beforehand, you will need to setup access to the [Twitter API](https://developer.twitter.com/en) and a [Heroku](https://www.heroku.com) application. Additionally, if you want your bot to retweet your goverment's latest COVID-related tweet, change **"CanadianPM"** on `line #11` of [retweet.js](retweet.js) to your government/government leader's Twitter username.

Lots of love from Canada. :heart: