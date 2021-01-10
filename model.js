const Sequelize = require("sequelize");


function model(db,type){
    return db.define(type,{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          Price: {
            type: Sequelize.STRING,
           
          },
          Direccion: {
            type: Sequelize.STRING,
           
          },
          Areas: {
            type: Sequelize.STRING,
           
          },
          Ambientes: {
            type: Sequelize.STRING,
           
          },
          Banos: {
            type: Sequelize.STRING,
           
          },
          Dormitorios: {
            type: Sequelize.STRING,
           
          },
          Link: {
            type: Sequelize.STRING,               
          },
    })


}

module.exports = model