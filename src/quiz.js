import inquirer from 'inquirer';
import { provideWords, updateWordStatus } from './wordProvider';
import { pickOne } from './utils';

let currentIndex = 0;
export default function quiz(size = 5) {
  let words = provideWords(size);
  words = words.map(i => Object.assign({}, i, { finish: false }));
  console.log(`考试开始！共 ${size} 题，如果不知道答案，可以输入see来查看`);
  makeTest(words);
}

function makeTest(words) {
  let unfinishedWords = words.filter(i => !i.finish);
  if (unfinishedWords.length === 0) {
    console.log('考试结束！');
    return;
  }
  let word = pickOne(unfinishedWords);
  inquirer
    .prompt({
      name: 'ans',
      message: `(${words.length - unfinishedWords.length + 1}/${
        words.length
      }) 请写出 "${word.description}" 的英文翻译`
    })
    .then(({ ans }) => {
      if (ans === 'see') {
        console.log('答案是：' + word.word);
      } else if (word_equals(ans, word.word)) {
        console.log('恭喜答对了！');
        updateWordStatus(word.word, true);
        word.finish = true;
      } else {
        updateWordStatus(word.word, false);
        console.log('错误！');
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
