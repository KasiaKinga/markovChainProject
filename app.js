// Project Markov Chain - poem generator

const outputText = document.querySelector('p2');
const outputContainer = document.querySelector('.container')
const button = document.querySelector('button');


// 1. Func which accepts the word corpus and returns text without numbers and punctation
function strArrWithoutNumsAndPunctation(str) {
  str = str.toLowerCase().replace(/(~|`|!|;|:|\"|'|,|\.|\?|-)/g,"")
  str = str.replace(/(\r\n|\n|\r)/gm, "");
  return str.split(' ').filter(word => isNaN(word));
}

// 2. Func which accepts the word corpus and returns Markov Chain Object with keys of all the unique 
// words in corpus, and an array of all the words that follow it.
function markovChain(wordCorpus) {
  let strArr = strArrWithoutNumsAndPunctation(wordCorpus); 
  let markovChainObj = {};

  for(let i = 0; i < strArr.length-1; i++) {
    let word = strArr[i];
    
    // if it's undefined, create [] 
    if(!markovChainObj[word]) { 
      markovChainObj[word] = [];
    } 
    // as long as the key exists, push next word to the array
    if(markovChainObj[word]) { 
      markovChainObj[word].push(strArr[i + 1])
    }
  }
  return markovChainObj;
}

// 3. func writeLine takes markovChainObj and lenght of words (returns 1 line of newPoem)
function writeLine(markovChainObject, lengthOfWords) { 
  let markovChainWords = Object.keys(markovChainObject);

  // random choice of first key which gives access to the array
  let startWord = markovChainWords[Math.floor(Math.random() * markovChainWords.length)]; 

  let lineOfPoetry = [];
  // random key word is first word in new poem
  lineOfPoetry.push(startWord);

  while(lineOfPoetry.length < lengthOfWords) {
    startWord = writeLineHelper(markovChainObject, startWord);
    lineOfPoetry.push(startWord);
  }

  return lineOfPoetry.join(' ');
}

// 4. writeLineHelper is checkig if word exists as key in obj
// if exisits, it will return random word from arr
// if not, it will pick another random key-word to have entry to the arr and pick random word until it meets the word count
function writeLineHelper(obj, word) { 
  let wordFromMarkovChainArr;

  if(word in obj) {
    let arr = obj[word];
    // assign random word from array as wordFromMarkovChainArr
    wordFromMarkovChainArr = arr[Math.floor(Math.random() * arr.length)]
    
    // if word doesn't exist as key in Markov Chain Object..
  } else {
    let markovChainArr = Object.keys(obj); 
    // the new word is randomly chosen from the keys
    let currentWord = markovChainArr[Math.floor(Math.random() * markovChainArr.length)];
    let newArr = obj[currentWord];
    // random word is assigned from array as wordFromMarkovChainArr
    wordFromMarkovChainArr = newArr[Math.floor(Math.random() * newArr.length)]
  }
 
  return wordFromMarkovChainArr;
}


// 5. FINAL FUNC
// function accepts two parameters: word corpus and a number of lines. 
function generatePoem(wordCorpus, numberOfLines, numberOfWords) { 
  if(!numberOfWords) {
    numberOfWords = Math.ceil(Math.random() * 10);
  }

  if(!numberOfLines) {
    numberOfLines = Math.ceil(Math.random() * 10);
  }

  let markovChainObj = markovChain(wordCorpus);
  let newPoem = '';

  for(let i = 0; i < numberOfLines; i++) {
    let line = writeLine(markovChainObj, numberOfWords); 

    // if it's the last iteration, we don't add space as the last char in the string
    if(i === numberOfLines - 1) {
      newPoem += line;
    } else {
      newPoem += line + '\n';
    }
  }
  console.log(newPoem)
  return newPoem
}

let newPoem = () => {
  // access to the input text
  const inputText = document.querySelector('#extra').value; 
  // access to the number of lines 
  let numberOfLines = document.getElementsByName('numOfLines')[0].value;
  // access to the number of words
  let numberOfWords = document.getElementsByName('numOfWords')[0].value;

  // call the function with input values
  let poem = generatePoem(inputText, numberOfLines, numberOfWords);
  // change inner text to new poem
  outputText.innerText = poem;
}

button.onclick = newPoem






