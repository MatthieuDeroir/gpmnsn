const mongoose = require("mongoose");
var today = new Date()


const PanelLogs = mongoose.model(
    "PanelLogs",
    new mongoose.Schema({
        index: {
            type: Number,
            require: true,
        },
        state:{
            type: Boolean,
            require: true,
        },
        name: {
            type: String,
            require: true
        },
        door_1: {
            type: Boolean,
            require: true,
        },
        door_2: {
            type: Boolean,
            require: true,
        },
        online: {
            type: Boolean,
            require: true,
        },
        temperature: {
            type: Number,
            require: true,
        },
        screen: {
            type: Boolean,
            require: true,
        },
        date: {
            type: String,
            default: today
        },
    })
);

module.exports = PanelLogs;
//dummy