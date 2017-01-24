var express = require('express');
var router = express.Router();
const query = require("../db/query");
const functions = require("../functions/userChecks");


router.post("/signup", (req, res, next) => {
    const proposedUser = req.body;
    const email = proposedUser.email;
    const password = proposedUser.password;
    let unique = false;
    if (email && password) {
        functions.emailIsUnique(email)
            .then((isUnique) => {
                unique = isUnique;
            })
            .then(() => {
                if (unique) {
                    const hashedPW = functions.hashPassword(password)
                    proposedUser.password = hashedPW;
                    query.postNewUser(proposedUser)
                        .then((result) => {
                            res.json(result);
                        })
                } else {
                    res.status = 500;
                    res.json({
                        message: "Please enter a unique email!"

                    })
                }
            })
            .catch((err) => {
                res.json(err);
            })
    } else {
        res.status = 500;
        res.json({
            message: "Please enter a valid email and password"
        });
    }

})

router.post("/login", (req, res, next) => {
    const proposedUser = req.body;
    const email = proposedUser.email;
    const password = proposedUser.password;
    let unique = true;
    if (email && password) {
        functions.emailIsUnique(email)
            .then((isUnique) => {
                unique = isUnique;
            })
            .then(() => {
                if (unique === false) {
                    query.getUserByEmail(email)
                        .then((user) => {
                            const samePW = functions.comparePW(password, user.password)
                            if (samePW) {
                              delete user.password;
                                res.json(user)
                            } else {
                                res.status(500);
                                res.json({
                                    message: "Please enter a valid Password!"
                                })
                            }
                        })

                } else {
                    res.status = 500;
                    res.json({
                        message: "Please enter a valid email!"

                    })
                }
            })
            .catch((err) => {
                res.json(err);
            })
    } else {
        res.status = 500;
        res.json({
            message: "Please enter a valid email and password"
        });
    }

})

module.exports = router;
