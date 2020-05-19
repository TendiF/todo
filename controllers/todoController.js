const TodoModel = require('../models/todoModel')
const todoModel = new TodoModel()


class TodoController{
    constructor(){
        this.add = this.add.bind(this)
        this.get = this.get.bind(this)
    }

    async add(req, res){
        let {
            name,
            when,
            location
        } = req.body

        let userErr = {}

        if(!name) userErr.name = 'required' 
        if(!when) userErr.password = 'required'
        if(!location) userErr.location = 'required'

        if(Object.keys(userErr).length != 0 && userErr.constructor === Object){
            return res.status(400).send({
                message : 'error',
                data : userErr
            })
        }


        let result = await todoModel.add({
            name,
            when,
            location,
            id_user : req.auth.id
        })

        res.send({
            message : 'success',
            data : result
        })

    }

    async get(req, res){
        console.log(req.auth)
        let result = await todoModel.get({id_user : req.auth.id})
        res.send({
            message : 'success',
            data : result
        })
    }
}

module.exports = TodoController