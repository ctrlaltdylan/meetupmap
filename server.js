const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const request = require('request');
const cors = require('cors');
const qs = require('querystring');
const path = require('path');
app.use(cors());

// to serve production assets statically
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
});

app.get('/meetups', (req, res) => {
  console.log('query string:', qs.stringify(req.query));
  const url = 'https://api.meetup.com/find/upcoming_events?photo-host=public&page=100&order=time&topic_category=292' + qs.stringify(req.query) + '&key=2f7d4b367b683d2a582515082a463d&sign=true';
  var options = {
    url,
    headers: {
      'Origin': 'http://localhost:8080'
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

app.listen(port, () => { console.log('App started on ', port)})
