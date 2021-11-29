const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    name:{
        type:String
    },
    message:{
        type:String
    }
});

const Message = new mongoose.model("Message", chatSchema);
module.exports = Message;
