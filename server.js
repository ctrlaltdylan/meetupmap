const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const request = require('request');
const cors = require('cors');
const qs = require('querystring');
const path = require('path');
app.use(cors());
if (!process.env.APP_ENV) {
  require('dotenv').config()
}

// to serve production assets statically
app.use(express.static('build'));

app.get('/', (req, res) => {
  const assets_path = (process.env.APP_ENV == 'production' ? path.join(__dirname, 'build/index.html') : path.join(__dirname, 'public/index.html'));
  res.sendFile(assets_path);
});

app.get('/meetups', (req, res) => {
  console.log('query string:', req.query);
  let url = `https://api.meetup.com/find/upcoming_events?photo-host=public&page=100&order=time&topic_category=292&key=${process.env.MEETUP_API_KEY}&sign=true`;
  if(req.query) {
    url = url + '&' + qs.stringify(req.query);
  }
  var options = {
    url,
    headers: {
      'Origin': 'https://meetupmap.herokuapp.com/'
    }
  };

  console.log('sending: ', url);
  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    res.json(JSON.parse(body))
  });
})

app.listen(port, () => { console.log(`App in ${process.env.APP_ENV} mode started on `, port)})
