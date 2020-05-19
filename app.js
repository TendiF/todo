require('dotenv').config()
require('express-group-routes')
const connection = require('./db')
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
var CronJob = require('cron').CronJob;
var job = new CronJob('*/59 * * * * *', () => {
    console.log('from cron')
    //handle daily
    connection.query(`SELECT id_user FROM todos WHERE recurring = 'daily' AND HOUR(activity_date) = ${new Date().getHours()}`, function (error, results, fields) {
      if (error) throw error;
      for (const id_user of results) {
        console.log('send daily to', id_user)
      }
    });
    // Monthly
    connection.query(`SELECT id_user FROM todos WHERE recurring = 'monthly' AND DAY(activity_date) = ${new Date().getDate()}`, function (error, results, fields) {
      if (error) throw error;
      for (const id_user of results) {
        console.log('send monthly to', id_user)
      }
    });

    // Annual
    connection.query(`SELECT id_user FROM todos WHERE recurring = 'yearly' AND MONTH(activity_date) = ${new Date().getMonth() +1}`, function (error, results, fields) {
      if (error) throw error;
      for (const id_user of results) {
        console.log('send monthly to', id_user)
      }
    });
  }, () =>  {
    console.error('cron stop')
  },
);

job.start()

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