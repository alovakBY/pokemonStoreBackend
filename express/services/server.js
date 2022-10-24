const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.use("/", routes);
app.use("/.netlify/functions/server", routes); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

// app.listen(port, () => {
//   console.log(`server listening on port ${port}`);
// });

module.exports = app;
module.exports.handler = serverless(app);
