"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const router = express.Router();
const AuthService = require("./services/users.service");

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

router.post("/auth/signIn", async (req, res) => {
  const user = await AuthService.getUser(req.body);
  if (!user) {
    res.status(403).send({
      code: 403,
      message: "User couldn't be found",
    });
  } else {
    const token = jwt.sign(
      { email: user.email, password: user.password, id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.send({
      accessToken: token,
      ...user,
    });
  }

  res.end();
});

app.use((req) => {
  if (req.method === "OPTIONS") {
    return {
      status: 200,
    };
  }
});

app.use("/.netlify/functions/server", router);
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports.handler = serverless(app);
