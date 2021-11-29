const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chatapp", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log(`connection successfull`);
}).catch(() => {
    console.log(`not connected`);
});
