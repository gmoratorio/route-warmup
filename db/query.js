const knex = require("./connection");


module.exports = {
    getUserByID: function getUserByID(id) {
        return knex("user")
            .select()
            .where('id', id)
            .first()
    },
    postNewUser: function postNewUser(userObject) {
        return knex("user")
            .insert(userObject, "*")
    },
    getAllUsers: function getAllUsers() {
        return knex("user")
            .select()
    },
    getUserByEmail: function getUserByEmail(email){
      return knex("user")
      .select()
      .where('email', 'like', `%${email}%`)
      .first()
    }

}
