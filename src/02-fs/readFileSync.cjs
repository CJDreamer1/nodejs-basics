const fs = require('node:fs');
// ця штука замість імпортів в react так писали колись

const path = require('node:path');
console.log('before');
const data = fs.readFileSync(path.resolve('read.txt'), { encoding: 'utf8' });
// читання файла синхронно (поки не прочитається код далоі не іде)
console.log(data);
console.log('after');
