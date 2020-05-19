const TodoController = require('../controllers/todoController')
const todoController = new TodoController()
module.exports = (app) => {
    app.route('/')
        .get(todoController.get)
        .post(todoController.add);
}