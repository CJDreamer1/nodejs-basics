import * as fs from 'node:fs/promises';
import path from 'node:path';

fs.appendFile(path.resolve('append.txt'), 'Hello from Node.js') // якщо треба щоб кожен раз стрічка 'Hello from Node.js' додавалася з новго рядка - то треба написати 'Hello from Node.js\n'
  .then((data) => console.log(data)) // він так само, як і writeFile.js поверне в консоль undefined, але у файл append.txt допише внизу нашу стрічку
  .catch((error) => console.error(error)); // скільки разів функція буде викликани, стільки разів і допишеться фраза 'Hello from Node.js'
