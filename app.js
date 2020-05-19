require('dotenv').config()
require('express-group-routes')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const usersRoute = require('./routes/users')


const port = process.env.PORT || 8080;

// const auth = async(req, res, next) => {
//   const token = req.header('Authorization')
//   try {
//       const data = jwt.verify(token, process.env.JWT_KEY)
//       const user = await userModel.findOne({ _id: data._id })
//       if (!user) {
//           throw new Error()
//       }
//       req.auth = user
//       next()
//   } catch (error) {
//       res.status(401).send({ error: 'Not authorized to access this resource' })
//   }

// }

app.use(bodyParser.urlencoded({extended: true}))

// parse application/json
app.use(bodyParser.json())


app.group('/user', router => {
  usersRoute(router)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

module.exports =  app