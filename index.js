const express = require('express');
const give_joke = require('give-me-a-joke');
const random_name = require('random-name');
const body_parser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(body_parser.json());

var first = random_name.first()
var last = random_name.last()

app.get('/api/random-name', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'name retrieved successfully',
    first: first,
    last: last
  })
});

app.post('/api/random-joke', (req, res) => {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  if (firstName == ''){
    firstName = first;
    lastName = last;
  }

  give_joke.getCustomJoke (firstName, lastName, function(joke) {
    res.status(200).send({
      joke: joke
    })
  });
});

const PORT = 3000;

app.listen(PORT, function() {
  console.log(`server running on port ${PORT}`)
});
