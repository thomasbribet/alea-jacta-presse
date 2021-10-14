require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoose = require("mongoose");
const axios = require("axios");
const cron = require("node-cron");
const history = require("connect-history-api-fallback");
const articleRoutes = require(path.join(__dirname, "./router/article"));

const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  res.header("Access-Control-Allow-Origin", "https://alea-jacta-presse.herokuapp.com");
  next();
});
app.use(helmet());
app.use(express.json());
app.use(history());
app.use(express.static(__dirname + "/dist"));
app.use("/article", articleRoutes);

const { getContentFrom } = require(path.join(
  __dirname,
  "./controllers/getNews"
));
const { sources } = require(path.join(__dirname, "./sources"));

const getNews = async function (src) {
  await axios
    .delete("https://alea-jacta-presse.herokuapp.com/article")
    .then(async () => {
      await console.log("DB is empty");
      for (let i = 0; i < src.length; i++) {
        await getContentFrom(src[i]).catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
};

mongoose
  .connect(process.env.DBCONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB : OK");
    // Scrap news at 4 am everyday
    cron.schedule("0 4 * * *", () => getNews(sources));
  })
  .catch(() => console.log("Connection to MongoDB : FAIL"));

module.exports = app;
