const express = require("express");
const cors = require("cors");

const app = express();
const port = 4444;

const mediumAPIService = require("./services/impl/mediumAPIService");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log("We are live on port 4444");
});

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Medium API");
});

app.get(`/medium/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId));
});
