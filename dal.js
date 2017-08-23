const fs = require('fs');
const chalk = require('chalk');
const dict = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');
const alphabet = require('./alpha');

let objArr = [];


function getRandomWord(){
  let number = Math.floor(Math.random() * dict.length)
  let word = dict[number];
  console.log(chalk.keyword('aqua')(number) + ' / ' + chalk.keyword('red')(dict.length));
  console.log(word);
  return randWordToArr(word);
}

function randWordToArr(word){
  let strArr = word.split('');
  strArr.forEach(function(item){
    let obj = {};
    obj.id = item.toUpperCase();
    obj.display = '_';
    objArr.push(obj);
  })
  return objArr;
}

function checkAlphabet(letter){
  let character = alphabet.find(function(item){
    return item.id === letter
  })
  if(character.used === false){
    character.used = true;
    return true
  } else {
    return false;
  }
}

function checkLetter(letter){
  if (checkAlphabet(letter)){
    objArr.forEach(function(item){
      if(item.id === letter.toUpperCase()){
        item.display = item.id
        console.log(chalk.yellow('_ >>> ' + item.display));
        return item
      } else {
        return item
      }
    })
    return objArr
  } else {
    return objArr
  }
}


module.exports = {
  getRandomWord: getRandomWord, randWordToArr: randWordToArr, checkLetter: checkLetter, checkAlphabet: checkAlphabet, objArr: objArr, alphabet: alphabet
}
