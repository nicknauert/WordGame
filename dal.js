const fs = require('fs');
const chalk = require('chalk');

const alphabet = require('./alpha');
const session = require('express-session');
const express = require('express');
const dict = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');




function getRandomWord(){
  let number = Math.floor(Math.random() * dict.length)
  let word = dict[number];
  console.log(chalk.green(word) + " ~ " + word.length);
  resetAlphabet();
  return randWordToArr(word);
}


function randWordToArr(word){
  let objArr = [];
  let strArr = word.split('');
  strArr.forEach(function(item){
    let obj = {};
    obj.id = item.toUpperCase();
    obj.display = '_';
    obj.check = function(){
      if(this.id === this.display){
        return true;
      } else {
        return false;
      }
    }
    objArr.push(obj);
  })
  console.log(objArr);
  return objArr;
}

function checkAlphabet(letter){
  let character = alphabet.find(function(item){
    return item.id === letter
  })
  if(character.used === false){
    character.used = true;
    return true;
  } else {
    return false;
  }
}

function resetAlphabet(){
  alphabet.forEach(function(item){
    item.used = false;
  })
}

function checkMystWord( arr, letter){
  let falseState = false;
  arr.forEach(function(item){
    if(item.id === letter.toUpperCase()){
      item.display = item.id;
      console.log(chalk.yellow('_ >>> ' + item.display));
      falseState = true;
      return item
  } else {
      return item
    }
  })
  return falseState;
}

function finished(arr){
  let winState = true;
  arr.forEach(function(item){
    if(item.display == '_'){
      winState = false
    }
  })
  return winState
}


module.exports = {
  getRandomWord: getRandomWord, randWordToArr: randWordToArr, checkAlphabet: checkAlphabet, alphabet: alphabet, checkMystWord: checkMystWord, finished: finished
}
