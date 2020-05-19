require('dotenv').config()
require('express-group-routes')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const usersRoute = require('./routes/users')
const todosRoute = require('./routes/todos')
const UserModel = require('./models/userModel')
const userModel = new UserModel()
const jwt = require('jsonwebtoken')




const port = process.env.PORT || 8080;

const auth = async(req, res, next) => {
  const token = req.header('Authorization')
  try {
      const data = jwt.verify(token, process.env.JWT_KEY)
      const user = await userModel.get({ id: data.id })
      if (!user) {
          throw new Error()
      }
      req.auth = user[0]
      next()
  } catch (error) {
      res.status(401).send({ error: 'Not authorized to access this resource' })
  }

}

app.use(bodyParser.urlencoded({extended: true}))

// parse application/json
app.use(bodyParser.json())


app.group('/user', router => {
  usersRoute(router)
})

app.group('/todo', router => {
  router.use(auth)
  todosRoute(router)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

module.exports =  app