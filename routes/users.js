var express = require('express');
var router = express.Router();
const query = require("../db/query");
const functions = require("../functions/userChecks");


/* GET users listing. */
router.get('/', function(req, res, next) {
    query.getAllUsers()
        .then((users) => {
            res.json(users);
        })
});

router.get("/:id", (req, res, next) => {
    let user = null;
    query.getUserByID(req.params.id)
        .then((returnedUser) => {
          if(returnedUser){
            res.json(returnedUser);
          }else{
            res.json({message: "User not found"});

          }
        })
})




module.exports = router;
