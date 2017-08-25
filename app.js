const express = require('express');
const app = express();
const dal = require('./dal.js');
const alphabet = require('./alpha.js')
const chalk = require('chalk');
const session = require('express-session');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const negative = require('./no.js')

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
  seshObj: {
    word: [],
    guessCount: 8
  }
}))


////////routes////

app.get('/', function(req, res) {
  if(req.session.word){
    res.redirect('/game')
  } else {
    res.render('home');
  }
})

app.post('/', function(req, res){ //EASY
  let word = dal.getRandomWord();
  req.session.seshObj= {
    word: [],
    guessCount: 8,
    alert: ''
  }
  req.session.seshObj.word = word;
  res.redirect('/game');
})

app.get('/game', function(req, res){
  let word = req.session.seshObj.word
  res.render('game', { word: word, guesses: req.session.seshObj.guessCount, alert: req.session.seshObj.alert });
})

app.post('/game', function(req, res){
  let guess = req.body.guess;
  if(dal.checkAlphabet(guess)==true){
    if(dal.checkMystWord( req.session.seshObj.word, guess)==false){
      req.session.seshObj.guessCount--;
      let number = Math.floor(Math.random() * negative.length)
      req.session.seshObj.alert = negative[number];
    } else {
      req.session.seshObj.alert = ''
    }
  }
  if(req.session.seshObj.guessCount == 0){
    req.session.seshObj.alert = 'Lose.';
    res.render('lose', { word: req.session.seshObj.word, letters: dal.alphabet, guesses: req.session.seshObj.guessCount, alert: req.session.seshObj.alert })
  } else if (dal.finished(req.session.seshObj.word) == true){
    req.session.seshObj.alert = 'Win.';
    res.render('win', { word: req.session.seshObj.word, letters: dal.alphabet, guesses: req.session.seshObj.guessCount, alert: req.session.seshObj.alert });
  } else {
    res.render('game', { word: req.session.seshObj.word, letters: dal.alphabet, guesses: req.session.seshObj.guessCount, alert: req.session.seshObj.alert });
  }
})  //omg ^

app.listen(3000, function(req,res){
  console.log('Word Game started on 3000.');
})
