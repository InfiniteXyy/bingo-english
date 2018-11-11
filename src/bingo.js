import inquirer from 'inquirer';
import { provideWord } from './wordProvider';

let word = provideWord();

export default function bingo() {
  inquirer
    .prompt({
      type: 'confirm',
      name: 'remember',
      message: `你是否认识 "${word.word}"`
    })
    .then(answers => {
      let { remember } = answers;
      if (remember) {
        console.log('恭喜！它的意思是：' + word.description);
      } else {
        chooseAnswer();
      }
    });
}

function chooseAnswer() {
  inquirer
    .prompt({
      type: 'list',
      name: 'answer',
      message: '请选择它的意思',
      choices: word.otherDescriptions
    })
    .then(answers => {
      if (answers.answer === word.description) {
        console.log('回答正确！');
      } else {
        console.log('回答错误！再试一次！\n');
        chooseAnswer();
      }
    });
}
