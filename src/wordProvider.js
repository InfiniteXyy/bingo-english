import fs from 'fs';
import path from 'path';
import { pickOne, pickRandomN } from './utils';

const fileContents = fs.readFileSync(path.join(__dirname, "..", "data", "words.csv"));
const lines = fileContents.toString().split('\n');
const words = lines
  .filter(i => i.trim() !== '')
  .map(i => {
    let content = i.split(',');
    return { word: content[1], description: content[0] };
  });

export const provideWord = function() {
  let word = pickOne(words);
  let otherDescriptions = pickRandomN(
    words.filter(i => i !== word).map(i => i.description),
    3
  );
  otherDescriptions.splice(Math.floor(Math.random() * 3), 0, word.description);
  return {
    ...word,
    otherDescriptions
  };
};
