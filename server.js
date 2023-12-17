const http = require("http");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const server = http.createServer((req, res) => {
 
  //lodash
  // const num= _.random(0,15);
  // console.log(num);

// const greet = _.once( ()=>{
//   console.log('hello')
// });
// greet();
// greet();


  res.setHeader("content", "text/html");

  let pathFile = path.join(__dirname, "Client", "index.html" );
  const aboutPath = path.join(__dirname, "Client", "About", "index.html");
  const blogPath = path.join(__dirname, "Client", "Blog", "index.html");
  const contactPath = path.join(__dirname, "Client", "Contact", "index.html");

  switch (req.url) {
    case "/":
      pathFile=pathFile;
      res.statusCode = 200;
      console.log(pathFile);
      break;
    case "/About":
      pathFile = aboutPath;
      if (!fs.existsSync(aboutPath) || !fs.statSync(aboutPath).isFile()) {
        res.statusCode = 404;
        break; }
      console.log(aboutPath);
      res.statusCode = 200;
      break;
    case "/Blog":
      pathFile = blogPath;
      res.statusCode = 200;
      break;
    case "/Contact":
      pathFile = contactPath;
      res.statusCode = 200;
      break;
    default:
      res.statusCode = 404;
      break;
  }

  fs.readFile(pathFile, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });

});
server.listen(3000, "localhost", () => {
  console.log("We on port 3000");
});
