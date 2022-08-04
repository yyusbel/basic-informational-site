const http = require("http");
const fs = require("fs");

const allFiles = fs.readdirSync("./", { withFileTypes: true });

const htmlFiles = allFiles
  .filter((entry) => {
    return /^.+\.(html|css)$/.test(entry.name);
  })
  .map((entry) => {
    if (entry.name.endsWith(".html")) {
      if (entry.name === "index.html") {
        return "";
      } else {
        return entry.name.slice(0, -5);
      }
    } else {
      return entry.name;
    }
  });

const server = http.createServer((req, res) => {
  const requestedURL = req.url.slice(1);
  if (htmlFiles.includes(requestedURL)) {
    if (requestedURL.endsWith(".css")) {
      const cssFile = fs.readFileSync("./" + requestedURL, "utf8");
      res.setHeader("Content-Type", "text/css");
      res.end(cssFile);
    } else {
      if (requestedURL === "") {
        const file = fs.readFileSync("./index.html", "utf8");
        res.end(file);
      } else {
        const file = fs.readFileSync("./" + requestedURL + ".html");
        res.end(file);
      }
    }
  } else {
    const file = fs.readFileSync("./404.html", "utf8");
    res.end(file);
  }
});

server.listen(3000, () => {
  console.log("Connected!");
});