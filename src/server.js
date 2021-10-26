// imports
const express = require("express");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");
const { config } = require("./config");
// routes
const { userRouter } = require("./routes");

// app creation
const app = express();
console.log(config.url.client);
// app usage of imports
app.use(morgan("dev"));
app.use(json());
app.use(
  cors({
    origin: config.url.client,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// app used routes
app.use("/users", userRouter);

// test request to see server works properly
app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world-meme-hub",
  });
});

module.exports = app;
