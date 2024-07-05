import * as fs from 'node:fs/promises';
import path from 'path';

function read() {
  const filePath = path.resolve('movies', 'movies.txt');
  return fs.readFile(filePath, { encoding: 'utf8' });
}

export default { read };