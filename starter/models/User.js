
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true,'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email :{
        type:String,
        required:[true,'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
          unique: true,
    },
    password :{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
     
    },

})
//middleware
UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)

})

//instance method for jwt token
UserSchema.methods.createJWT = function (){
    return jwt.sign({ userID: this._id, name: this.name}, 'JwtSecret',{ expiresIn: '30d'})
}

module.exports = mongoose.model('User',UserSchema)