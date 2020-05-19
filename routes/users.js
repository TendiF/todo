const UserController = require('../controllers/userController')
const userController = new UserController()
module.exports = (app) => {
    app.route('/')
        .get(userController.get)
        .post(userController.register);

    app.route('/login')
        .post(userController.login);

}