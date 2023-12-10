// let counter = 0;
// const numbers= setInterval(() => {
//   counter++;
//   console.log(counter);
// }, 1000); // 1 second

// setTimeout(()=>{
//   clearInterval(numbers);
// }, 2000);

const fs = require('fs');
fs.readFile('./docs/blogTest.txt', (error,data)=>{
if(error) {
  console.log('Theres been an error');
}
console.log(data, toString());
});