const express = require("express");
const apiSolutions = require("./apiSolutions");
const port = 4200;
const app = express();
const apicache = require("apicache");

let cache = apicache.middleware;

app.use(cache("10 minutes"));
app.use("/api/posts", apiSolutions);

app.get("/api/ping", (_, res) => {
  res.status(200).send({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});