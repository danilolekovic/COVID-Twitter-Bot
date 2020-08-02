<div align="center">
<p>
    <img src="https://pbs.twimg.com/profile_images/1243710055439929344/e8m1mjVH_400x400.jpg" width=100, height=100>
</p>
  <h1>COVID <img src="http://i.imgur.com/tXSoThF.png"></img> Bot</h1>
</div>

### Information

This repository contains a Twitter bot that tweets the latest information about the COVID-19 pandemic in Canada. It uses [twit](https://github.com/ttezel/twit#readme) and [disease.sh](https://github.com/disease-sh/api). The part of the bot that tweets new information is in [this file](bot.js), and the part of the bot that retweet Prime Minister Trudeau's latest COVID-related tweet is in [this file](retweet.js).

The bot's twitter account is [@CanadaCovid19B1](https://twitter.com/CanadaCovid19B1).

### Your Country

Want to make the same thing for your country? There's a [Python script located here](https://github.com/danilolekovic/COVID-Twitter-Template.git), just clone it, and follow the instructions. You will still need to setup access to the [Twitter API](https://developer.twitter.com/en) and a [Heroku](https://www.heroku.com) application. This whole process should take maximum 15 minutes if you're familiar with the Twitter API and Heroku.

Or.. Fork the repository. Go to [bot.js](bot.js) and, on `line #19`, change **"Canada"** to the name of your country. Beforehand, you will need to setup access to the [Twitter API](https://developer.twitter.com/en) and a [Heroku](https://www.heroku.com) application. Additionally, if you want your bot to retweet your goverment's latest COVID-related tweet, change **"CanadianPM"** on `line #11` of [retweet.js](retweet.js) to your government/government leader's Twitter username.

:heart: Stay safe, & lots of love from Canada. :heart:
