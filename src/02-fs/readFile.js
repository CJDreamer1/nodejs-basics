// ====================================== робота із асинхронними функціями в Node ===========================
// import * as fs from 'node:fs';
// import path from 'node:path';

// fs.readFile(path.resolve('read.txt'), { encoding: 'utf8' }, (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log(data);
// });
//ця штука - це робота зі звичними функціями, але часто ми парацюватимемо із промісами (promise)

//============================================ тепер в data буде проміс =======================================
import * as fs from 'node:fs/promises';
import path from 'node:path';

// fs.readFile(path.resolve('read.txt'), { encoding: 'utf8' })
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// ========================================== тепер працюємо із результатом асинхронної функції (промісом data)

async function readFile() {
  const data = await fs.readFile(path.resolve('file.txt'), {
    encoding: 'utf8',
  });
  const transformedData = data.toUpperCase();
  return transformedData;
}
readFile()
  .then((data) => console.log(data)) //ця штука виведе нам проміс в коноль Node-и методи .then().catch потрібні для обробки промісів, не забувай (адже дані із асинхронної функції можна вийняти лише через then)
  .catch((error) => console.error(error)); // це просто затичка при обробці проміса, щоб не матюкався претієр, але загалом треба обробляти адже це проміс
