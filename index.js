#!/usr/bin/env node
import bingo from './src/bingo';
import quiz from './src/quiz';
import { ArgumentParser } from 'argparse';

let parser = new ArgumentParser({
  version: '0.0.2',
  addHelp: true,
  description: 'Get start to learn new english words with Bingo English!'
});

parser.addArgument(['-q', '--quiz'], {
  help: 'create a quiz of size num, from chinese to english',
  dest: 'num'
});

parser.addArgument(['-l', '--learn'], {
  help: 'learn several words',
  dest: 'wordsNum'
});

let args = parser.parseArgs();
if (args['num'] !== null) {
  quiz(args['num']);
} else if (args['wordsNum'] !== null) {
  console.log('Learn Words');
} else {
  bingo();
}
