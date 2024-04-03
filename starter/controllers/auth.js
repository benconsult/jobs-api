
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const {BadRequestError} = require('../errors')

const register = async (req, res) =>{

     //controller null check
     const {name, email, passwword} = req.body
     if(!name || !email || !passwword){
        throw new BadRequestError('Please provide name, email, password')
     }
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({user})
    res.send('Register user')
    //res.json(req.body)
}

const login = async (req, res) =>{
    res.send('login user')
}

module.exports = {
    register,login
}