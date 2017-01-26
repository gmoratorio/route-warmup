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
    getUserByEmail: function getUserByEmail(email) {
        return knex("user")
            .select()
            .where('email', email)
            .first()
    },
    getAllEquipment: function getAllEquipment() {
        return knex('equipment')
            .select()
    },
    getEquipmentByID: function getEquipmentByID(id) {
        return knex('equipment')
            .select()
            .where('id', id)
            .first()
    },
    postNewEquipment: function postNewEquipment(equipmentObject) {
        return knex('equipment')
            .insert(equipmentObject, '*')
    },
    updateEquipment: function updateEquipment(id, updateEquipmentObject) {
        return knex('equipment')
            .update(updateEquipmentObject, '*')
            .where('id', id)
    },
    deleteEquipment: function deleteEquipment(id) {
        return knex('equipment')
            .delete()
            .where('id', id)
            .then(() => {
                return id;
            })
    }

}
