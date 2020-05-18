require('dotenv').config()
const express = require('express')
const app = express()
// const router = express.Router()
// const db = require('./db')
// const users = require('./routes/users')
const jwt = require('jsonwebtoken')
// const userModel = require('./models/usersModel')
const db = require('./db')
const migration = require('./db-migration')


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


app.get('/', (req, res) => {
    res.send('hai')
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

module.exports =  app