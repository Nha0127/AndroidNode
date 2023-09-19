const  mongoose  = require("mongoose")

const UserSchema = new mongoose.Schema({
    Username:String,
    Password:String,
})
const User = mongoose.model('User',UserSchema)

module.exports = User