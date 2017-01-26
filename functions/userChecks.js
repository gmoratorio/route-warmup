const bcrypt = require('bcrypt');
const query = require("../db/query");



module.exports = {

    hashPassword: function hashPassword(password) {
        const hashedPW = bcrypt.hashSync(password, 10);
        return hashedPW;
    },

    emailIsUnique: function emailIsUnique(email) {
        return query.getAllUsers()
            .then((users) => {
                const userEmails = users.map((user) => {
                    return user.email;
                })
                return userEmails;
            })
            .then((userEmails) => {
                const isUnique = userEmails.every((dbEmail) => {
                    return (dbEmail !== email);
                })
                return isUnique
            })
    },
    comparePW: function comparePW(enteredPW, hashedPW) {
        const samePW = bcrypt.compareSync(enteredPW, hashedPW);
        return samePW;
    },



}
