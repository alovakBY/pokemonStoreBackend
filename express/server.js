"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const routes = require("./routes");
const cors = require("cors");

// const corsOptions = {
//    origin: ["http://localhost:3000"],
// 	headers: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Access-Control-Request-Methods"],
//    methods: ["POST, GET, PUT, OPTIONS, DELETE, HEAD"],
//    credentials: true,
// };

// [
//    "https://singular-ganache-ea177f.netlify.app",
//    "http://localhost:3002",
//  ]

app.use((req, res, next) => {
  //    console.log(req.headers);
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://singular-ganache-ea177f.netlify.app"
  );
  //    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Methods"
  );
  //    res.setHeader(
  //       "Access-Control-Allow-Methods",
  //       "POST, GET, PUT, OPTIONS, DELETE, HEAD"
  //    );
  //    res.setHeader("Access-Control-Allow-Credentials", "true");
  //    res.setHeader("content-type", "application/json");
  //    res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }

  next();
});

// app.options("*", cors());

// app.use(
//   cors({
//     origin: "https://singular-ganache-ea177f.netlify.app",
//   })
// );

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

app.use("/", (req, res, next) => {
  //   console.log(path(__dirname));
  next();
});

app.use("/.netlify/functions/server", routes);

const handler = serverless(app);
module.exports = app;
module.exports.handler = async (event, context) => {
  //   console.log("EVENT", event);
  //   console.log("Context", context);
  const result = await handler(event, context);

  console.log(result);
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
      body: "This was a preflight call!",
    };
  }

  return result;
};

// const handler = serverless(app);
// module.exports.handler = async (event, context, callback) => {
//   // you can do other things here
//   const result = await handler(event, context);
//   // and here
//   return result;
// };

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
