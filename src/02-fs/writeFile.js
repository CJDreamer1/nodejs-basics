import * as fs from 'node:fs/promises';
import path from 'node:path';

fs.writeFile(path.resolve('write.txt'), 'Hello from Node.js')
  .then((data) => console.log(data)) // в консоль логу ПОВИННО бути undefined, але значення запишеться у файл write.txt, Якщо ж хочетьяс щось вивести в консоль замість undefined - можна не вписувати в лівій даті нічого - пусто, а в правій написати в дужках щось, що виведетсья в консоль при супіху
  //   .then(() => console.log(Done)) наприклад так
  .catch((error) => console.error(error));
// при записуванні чогось у write.txt за допомогою fs.writeFile - він перезаписує весь вміст файла. Тобто все буде видалено і запишетсья лиш те, що є у функції в лапках 'Hello from Node.js'
