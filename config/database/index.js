const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://hainguyen:1234@cluster0.wk9jd.mongodb.net/DongGuitarDatabase',{
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        console.log("➤  Database connect successfully !")
    } catch(error) {
        console.log("connect failer", error)
    }
}

module.exports = {connect};