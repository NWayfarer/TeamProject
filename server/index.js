const express = require("express");
const expressApp = require("express")();
expressApp.use(express.static(__dirname + "/public"));
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(require("cors")());
expressApp.use(require("./routes/group"));
expressApp.use(require("./routes/discipline"));
expressApp.use(require("./routes/schedule"));
expressApp.use("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

Start(8000);

async function Start(port) {
  await require("./database").Connect();
  expressApp.listen(port);
}
