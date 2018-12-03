import inquirer from 'inquirer';
import { provideWords, updateWordStatus } from './wordProvider';
import { shuffle } from './utils';

let quizSize = 0;
export default function quiz(size = 5) {
  quizSize = size;
  if (quizSize <= 0 || quizSize >= 100) {
    console.log('输入了不正确的考试题目数量');
    return;
  }
  let words = provideWords(size);
  words = words.map(i => Object.assign({}, i, { finish: false }));
  console.log(`考试开始！共 ${size} 题，如果不知道答案，可以输入see来查看`);
  let _words = words.slice();
  shuffle(_words);
  makeTest(_words);
}

function makeTest(words) {
  if (words.length === 0) {
    console.log('考试结束！');
    return;
  }
  let word = words.shift();
  inquirer
    .prompt({
      name: 'ans',
      message: `(${quizSize - words.length}/${quizSize}) 请写出 "${
        word.description
      }" 的翻译`
    })
    .then(({ ans }) => {
      if (ans === 'see') {
        console.log('答案是：' + word.word);
        words.push(word);
      } else if (word_equals(ans, word.word)) {
        console.log('恭喜答对了！');
        updateWordStatus(word.word, true);
        word.finish = true;
      } else {
        updateWordStatus(word.word, false);
        console.log('错误！他的意思是：' + word.word);
        words.push(word);
      }
      makeTest(words);
    });
}

function word_equals(a, b) {
  if (a.toLowerCase() === b.toLowerCase()) {
    return true;
  }
  return false;
}
