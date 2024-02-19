const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    //    username: { type: String, required: true, unique: true }, not used with passport
    //    password: { type: String, required: true },
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    admin: { type: Boolean, default: false }
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)
