//Dictionary array - pull random word
//Chosen Word gets split into Word array to reference against.
//alphabet array - each letter will be an object with "USED" property
//when guessing a letter, input into a form, submit, check USED?->check if in ChosenWord->changed USED to true
//if a correct letter is guessed, reveal that letter in the mystery word, add to used display.
//incorrect letter, add to used display, remove a guessed

const express = require('express');
const app = express();
const dal = require('./dal.js');
const alpabet = require('./alpha.js')
const chalk = require('chalk');
const session = require('express-session');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');


////////sets////

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


///////middleware////

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: null},
  sesh_word: []
}))


////////routes////

app.get('/', function(req, res) {
  if(req.session.sesh_word){
    res.redirect('/game')
  } else {
    res.render('home');
  }
  
})

app.post('/', function(req, res){
  let word = dal.getRandomWord();
  req.session.sesh_word = word;
  res.redirect('/game');
})

app.get('/game', function(req, res){
  let word = req.session.sesh_word
  res.render('game', {word: word});
})

app.post('/game', function(req, res){
  let guess = req.body.guess;
  objArr = dal.checkLetter(guess);
  console.log(objArr);
  res.render('game', { word: objArr, letters: dal.alphabet  });
})

app.listen(3000, function(req,res){
  console.log('Word Game started on 3000.');
})
