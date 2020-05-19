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
            activity_date,
            location,
            recurring
        } = req.body

        let todos = await todoModel.get({activity_date})

        let userErr = {}

        if(!name) userErr.name = 'required' 
        if(!activity_date) userErr.password = 'required'
        if(!location) userErr.location = 'required'
        if(!/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/g.test(activity_date)) userErr.activity_date = 'invalid format'
        if(todos.length >= 1) userErr.activity_date = 'canot set with same date'
        if(['daily', 'monthly', 'yearly'].indexOf(recurring) == -1) userErr.recurring = 'invalid value'


        if(Object.keys(userErr).length != 0 && userErr.constructor === Object){
            return res.status(400).send({
                message : 'error',
                data : userErr
            })
        }

        let todo = {
            name,
            activity_date,
            location,
            id_user : req.auth.id
        }

        if(recurring) todo.recurring = recurring

        let result = await todoModel.add(todo)

        res.send({
            message : 'success',
            data : result
        })

    }

    async get(req, res){
        let params = {id_user : req.auth.id}
        let {
            location,
            activity_date
        } = req.query

        if(location) params.location = location
        if(activity_date) params.activity_date = activity_date
        let result = await todoModel.get(params)
        
        res.send({
            message : 'success',
            data : result
        })
    }
}

module.exports = TodoController