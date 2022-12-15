"use strict";

const Records = (sequelize, DataTypes) =>
    sequelize.define("Country-records", {
     
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },

        Total_Confirmed_Cases: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        Total_Deaths_Cases: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        Total_Recovered_Cases: {
            type: DataTypes.STRING,
            allowNull: false,
           
        }, Date: {
            type: DataTypes.DATE,
            allowNull: false,
           
        },
        
    });

module.exports = Records;