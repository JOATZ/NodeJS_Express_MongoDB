const mongoose = require('mongoose')
const passpotLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    //    username: { type: String, required: true, unique: true }, not used with passport
    //    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
})

userSchema.plugin(passpotLocalMongoose)

module.exports = mongoose.model('User', userSchema)
