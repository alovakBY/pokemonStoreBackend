"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3002/*",
  })
);

// const router = express.Router();
// router.get("/", (req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write("<h1>Hello from Express.js!</h1>");
//   res.end();
// });
// router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
// router.post("/", (req, res) => res.json({ postBody: req.body }));

// app.use(bodyParser.json());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/.netlify/functions/server", routes); // path must route to lambda

// app.use("/", (req, res, next) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);

// const express = require("express");
// const cors = require("cors");
// const serverless = require("serverless-http");
// const dotenv = require("dotenv");
// const routes = require("./routes");
// const router = express.Router();
// const path = require("path");

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 8080;

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

// app.use(cors());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// router.get("/", (req, res) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write("<h1>Hello from Express.js!</h1>");
//   res.end();
// });

// // app.use("/", routes);
// app.use("/.netlify/functions/server", routes); // path must route to lambda
// app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

// // app.listen(port, () => {
// //   console.log(`server listening on port ${port}`);
// // });

// module.exports = app;
// module.exports.handler = serverless(app);
