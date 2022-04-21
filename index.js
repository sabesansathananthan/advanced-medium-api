const express = require("express");
const cors = require("cors");

const app = express();
const port = 9002;

const mediumAPIService = require("./services/impl/mediumAPIService");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log(`We are live on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Medium API");
});

app.get(`/advanced/medium/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId, true));
});

app.get(`/medium/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId, false));
});
