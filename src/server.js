//importação de pacotes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const ejs = require("ejs");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//Ambiente
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 5000;

//Arquivos estáticos
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

//Db Setup
const dbs = require("./config/database");
const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbURI, { useNewUrlParser: true });

//Setup EJS
app.set("view engine", "ejs");

//configurações do servidor
if (!isProduction) {
  app.use(morgan("dev"));
}
app.use(cors());
app.disable("x-powered-by");
app.use(compression());

//setup bodyparser
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }));

//Models
// require("./models");

//rotas
// app.use("/", require("./routes"));

//Rota 404 - Not Found
app.use((err, req, res, next) => {
  const error = new Error("Not Found");
  err.status = 404;
  next(error);
});

//Rota - 422, 500, 401
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err.status !== 404) {
    console.warn("Error: ", err.message, new Date());
    res.json(err);
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} 🚀`));
