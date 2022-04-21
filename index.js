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
  res.send("Hello, Welcome to the Advanced Medium API");
});

app.get(`/advanced/customized/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId, "ac"));
});

app.get(`/customized/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId, "c"));
});

app.get(`/medium/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId, "n"));
});

app.get(`/advanced/user/:userId`, async (req, res) => {
  res.send(await mediumAPIService(req.params.userId, "an"));
});
