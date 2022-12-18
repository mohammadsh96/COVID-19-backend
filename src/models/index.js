"use strict";
require('dotenv').config();
const Collection = require("./collection");

const Users = require("./user.model");
const Records =require('./records')

const POSTGRES_URI ='postgresql://postgres:5arkpZPfDoL03S0k9KTZ@containers-us-west-121.railway.app:7708/railway';
const {
    Sequelize,
    DataTypes
} = require("sequelize");


let sequelizeOptions =process.env.NODE_ENV === "production" ?
    {
        dialect: 'postgres',
        protocol: 'postgres',
       
    } : {};

let sequelize = new Sequelize(POSTGRES_URI,sequelizeOptions);
const users = Users(sequelize, DataTypes);
const records = Records(sequelize, DataTypes);

// User hasMany( Records)
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