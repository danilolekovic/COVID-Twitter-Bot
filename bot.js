let Twit = require("twit");
const https = require("https");
const ChartJs = require("node-chartjs");
const opn = require("opn");
const util = require("util");

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
/*
https.get("https://corona.lmao.ninja/v2/countries/Canada", (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let data = JSON.parse(body);

            Bot.tweet("Currently, there are a total of " + data.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " confirmed cases and " + data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " deaths in #Canada. #COVID19");
            Bot.tweet("At the moment, there have been " + data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " recoveries in #Canada. " + thankingPhrases[Math.floor(Math.random() * thankingPhrases.length)] + " 🙏 #COVID19");
            Bot.tweet("Today, there have been " + data.todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " new confirmed cases and " + data.todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " deaths in #Canada. #COVID19");
            Bot.tweet("At the moment, there have been " + data.tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " tests for #COVID19 in #Canada");
        
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});
*/
https.get("https://disease.sh/v2/historical/Canada?lastdays=60", (res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let data = JSON.parse(body);

            var today = new Date(new Date);
            var todayStr = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(2);

            var away1 = new Date(new Date - 12096e5);
            var away1Str = (away1.getMonth() + 1) + '/' + away1.getDate() + '/' + away1.getFullYear().toString().slice(2);

            var away2 = new Date(away1 - 12096e5);
            var away2Str = (away2.getMonth() + 1) + '/' + away2.getDate() + '/' + away2.getFullYear().toString().slice(2);

            var away3 = new Date(away2 - 12096e5);
            var away3Str = (away3.getMonth() + 1) + '/' + away3.getDate() + '/' + away3.getFullYear().toString().slice(2);

            var away4 = new Date(away3 - 12096e5);
            var away4Str = (away4.getMonth() + 1) + '/' + away4.getDate() + '/' + away4.getFullYear().toString().slice(2);

            var away5 = new Date(away4 - 12096e5);
            var away5Str = (away5.getMonth() + 1) + '/' + away5.getDate() + '/' + away5.getFullYear().toString().slice(2);
            
            today = new Date(new Date - 1);

            today = new Date();
            today.setDate(today.getDate() - 1);
            todayStr = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear().toString().slice(2);

            var dates = [
                away4Str,
                away3Str,
                away2Str,
                away1Str,
                todayStr
            ];

            var cases = [
                data["timeline"]["cases"][away4Str],
                data["timeline"]["cases"][away3Str],
                data["timeline"]["cases"][away2Str],
                data["timeline"]["cases"][away1Str],
                data["timeline"]["cases"][todayStr]
            ];

            const cjs = new ChartJs(200, 40);

            const lineConfig = {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'COVID-19 Cases in Canada',
                        data: cases,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: [{
                        beforeUpdate: function (chartInstance) {
                          const ctx = chartInstance.chart.ctx;
                
                          const width = chartInstance.chart.width;
                          const height = chartInstance.chart.height;
                
                          const dataset = chartInstance.data.datasets[0];
                
                          const gradient = ctx.createLinearGradient(0, height, width, 0);
                          gradient.addColorStop(0, '#FF7978');
                          gradient.addColorStop(1, '#FFA278');
                          dataset.borderColor = gradient;
                        }
                    }],
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            };

            cjs.makeChart(lineConfig).then(res => {
                cjs.drawChart()

                T.post('media/upload', { media_data: cjs.toBuffer().toString('base64') }, function (err, data, response) {
                    if (error) {
                        console.log(error)
                    } else {
                        const status = {
                            status: "Today's chart of #Canada's progress with #COVID19.",
                            media_ids: media.media_id_string
                        }
                        
                        T.post("statuses/update", status, function(error, tweet, response) {
                            if (error) {
                            console.log(error)
                            } else {
                            console.log("Successfully tweeted an image!")
                            }
                        })
                    }
                });
            })
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});