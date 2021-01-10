const Sequelize = require("sequelize");

// Option 1: Passing parameters separately

const db = new Sequelize("zzznpulj_juaniboludeo", "zzznpulj_soporte_bd", "SMT4dmin", {
  host: "167.250.5.8",
  dialect: "mysql",
  database:"zzznpulj_juaniboludeo",
  dialect:"mysql"
});


module.exports = db;