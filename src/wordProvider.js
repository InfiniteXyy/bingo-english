import fs from 'fs';
import path from 'path';
import { pickOne, pickRandomN } from './utils';

const dataPath = path.join(__dirname, '..', 'data', 'words.csv');
const fileContents = fs.readFileSync(dataPath);

const lines = fileContents.toString().split('\n');
const words = lines
  .filter(i => i.trim() !== '')
  .map(i => {
    let knowRate;
    let content = i.split(',');
    if (Number(content[3]) === 0) knowRate = 0;
    else knowRate = Number(content[2]) / Number(content[3]);
    return {
      word: content[1],
      description: content[0],
      knowAmount: Number(content[2]),
      allAmount: Number(content[3]),
      knowRate
    };
  });

export function provideWord() {
  words.sort((a, b) => a.knowRate - b.knowRate);
  let word = words[0];
  let otherDescriptions = pickRandomN(
    words.filter(i => i !== word).map(i => i.description),
    3
  );
  otherDescriptions.splice(Math.floor(Math.random() * 3), 0, word.description);
  return {
    ...word,
    otherDescriptions
  };
}

export function updateWordStatus(wordText, know = false) {
  const data = lines
    .map(i => {
      let content = i.split(',');
      if (content[1] === wordText) {
        content[3]++;
        if (know) content[2]++;
      }
      return content.join(',');
    })
    .join('\n');
  fs.writeFileSync(dataPath, data);
}
