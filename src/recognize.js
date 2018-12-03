import inquirer from 'inquirer';
import { provideWords, updateWordStatus } from './wordProvider';
import { shuffle } from './utils';

let rSize = 0;
let allWords = [];

export default function recognize(size = 5) {
  rSize = size;
  if (rSize <= 0 || rSize >= 100) {
    console.log('输入了不正确的考试题目数量');
    return;
  }
  let words = provideWords(size);
  words = words.map(i => Object.assign({}, i, { finish: false }));
  console.log(`记忆开始！共 ${size} 个单词`);
  console.log(``);
  let _words = words.slice();
  allWords = words.map(i => {
    i.fail = 0;
    return i;
  });
  shuffle(_words);
  makeTest(_words);
}

function makeTest(words) {
  if (words.length === 0) {
    console.log('记忆结束！');
    summary();
    return;
  }
  let word = words.shift();
  inquirer
    .prompt({
      type: 'confirm',
      name: 'remember',
      message: `(${rSize - words.length}/${rSize}) 你认识 "${word.word}" 吗`
    })
    .then(({ remember }) => {
      if (remember) {
        console.log('恭喜！你知道它是：' + word.description);
        updateWordStatus(word.word, true);
      } else {
        console.log('再接再厉！它的意思是：' + word.description);
        allWords.find(i => i.word === word.word).fail++;
        updateWordStatus(word.word, false);
        words.push(word);
      }
      makeTest(words);
    });
}

function summary() {
  console.log('再来回顾一遍吧！');
  allWords.sort((a, b) => b.fail - a.fail);
  for (let word of allWords) {
    let meta = '';
    if (word.fail !== 0) {
      meta = ` // 错误 ${word.fail} 次`;
    }
    console.log(`${word.word} : ${word.description} ${meta}`);
  }
}
