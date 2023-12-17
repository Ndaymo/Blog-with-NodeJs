const path= require('path');
const os= require('os');
const fs= require('fs');



const filePathClient = path.join(__dirname, 'Client');

// try {
//   fs.mkdirSync(filePath)
// } catch (error) {
//   console.log("Error:" + error)
// }

try {
  const filePathIndex=path.join(filePathClient,'index.html');
  fs.writeFileSync(filePathIndex,'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title><link rel="stylesheet" href="style.css"></head>');
  fs.writeFileSync(filePathIndex,'<h1>Index.html</h1>');
  const filePathStyle=path.join(filePathClient,'style.css')
  fs.writeFileSync(filePathStyle, 'style.css')
  fs.writeFileSync(filePathStyle,'body{background-color:red}')
} catch (err) {
  console.log("Error:" + error)
}

try {
  const filepathContact=path.join(filePathClient,'Contact');
  const filepathContactIndex=path.join(filepathContact,"index.html");
  fs.writeFileSync(filepathContactIndex,'<h1>Index.html</h1>')
} catch (error) {
  console.log("Error:" + error)
}
