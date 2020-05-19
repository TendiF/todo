const UserModel = require('../models/userModel')
const validator = require('validator');
const userModel = new UserModel()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class UserController{
    constructor(){
        this.register = this.register.bind(this)
        this.get = this.get.bind(this)
    }

    async register(req, res){
        let {
            email,
            password
        } = req.body

        let userErr = {}
        let users = await userModel.get({email})

        if(!email) userErr.email = 'required' 
        if(!password) userErr.password = 'required'
        if(!validator.isEmail(email)) userErr.email = 'email not valid' 
        if(users.length >= 1) userErr.email = 'email is used'

        if(Object.keys(userErr).length != 0 && userErr.constructor === Object){
            return res.status(400).send({
                message : 'error',
                data : userErr
            })
        }

        password = await bcrypt.hash(password, 8)

        let result = await userModel.add({
            email,
            password
        })

        res.send({
            message : 'success',
            data : result
        })

    }

    async get(req, res){
        let result = await userModel.get()
        res.send({
            message : 'success',
            data : result
        })
    }

    async login(req, res){
        let {
            email,
            password
        } = req.body

        let userErr = {}

        if(!email) userErr.email = 'required' 
        if(!password) userErr.password = 'required'
        if(!validator.isEmail(email)) userErr.email = 'email not valid' 

        if(Object.keys(userErr).length != 0 && userErr.constructor === Object){
            return res.status(400).send({
                message : 'error',
                data : userErr
            })
        }

        let results = await userModel.get({email})

        let user = results.length ? results[0] : null 

        let isMatch = user ? await bcrypt.compare(password, user.password) : false

        if(isMatch){
            const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
            user.token = token
            res.send({
                message : 'success',
                data : user
            })
        }else{
            return res.status(400).send({
                message : 'error',
                data : 'Unauthorized'
            })
        }
    }
}

module.exports = UserController