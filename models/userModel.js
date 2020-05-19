const connection = require('../db')
class UserModel{
    constructor(){
        this.tabel = 'users'
        this.add = this.add.bind(this)
        this.get = this.get.bind(this)
    }

    async add(data){
        return new Promise(resolve => {
            connection.query(`INSERT INTO ${this.tabel} SET ?`, data, function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            });
        })
    }

    async get(where = {}){
        return new Promise(resolve => {
            let query = `SELECT * FROM ${this.tabel}`
            connection.query(query, where , function (error, results, fields) {
                if (error) throw error;
                resolve(results)
            });
        })
    }
}

module.exports = UserModel