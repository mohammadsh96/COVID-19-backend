"use strict";
require('dotenv').config();
const Collection = require("./collection");

const Users = require("./user.model");
const Records =require('./records')

// const POSTGRES_URI ="postgres://mohammadsh:0000@localhost:5432/covid";
// const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const {
    Sequelize,
    DataTypes
} = require("sequelize");


let sequelizeOptions ={};
    // process.env.NODE_ENV === "production" ?
    // {
    //     dialect: 'postgres',
    //     protocol: 'postgres',
    //     dialectOptions: {
    //         ssl: {
    //             require: true,
    //             rejectUnauthorized: false
    //         },
    //         native: true
    //     }
    // } : {};

let sequelize = new Sequelize("postgres://mohammadsh:0000@localhost:5432/covid", sequelizeOptions);
const users = Users(sequelize, DataTypes);
const records = Records(sequelize, DataTypes);

// Users.hasMany(Records)
users.hasMany(records, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

records.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

module.exports = {
    db: sequelize,
    records: new Collection(records),
    users:users,
};