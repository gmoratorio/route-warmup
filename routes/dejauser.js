var express = require('express');
var router = express.Router();
const query = require("../db/query");
const functions = require("../functions/userChecks");


router.get('/', function(req, res, next) {
    query.getAllEquipment()
        .then((allEquipment) => {
            res.json(allEquipment);
        })
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    if (idIsValid(id)) {
        query.getDejauserByID(id)
            .then((returnedDejauser) => {
                if (returnedDejauser) {
                    res.json(returnedDejauser);
                } else {
                    res.json({
                        message: "User not found"
                    })

                }
            })
    } else {
        res.json({
            message: "Please enter a valid ID"
        })
    }

})

router.post("/", (req, res, next) => {
    const postObject = createInsertableObject(req.body);
    query.postNewEquipment(postObject)
        .then((result) => {
            res.json(result);
        })
})

router.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const updatedObject = createInsertableObject(req.body);
    if (idIsValid(id)) {
        query.updateEquipment(id, updatedObject)
            .then((result) => {
                if (result.length > 0) {
                    res.json(result);
                } else {
                    res.json({
                        message: "Error: Equipment could not be updated. Please check your Equipment ID"
                    })
                }
            })
    } else {
        res.json({
            message: "Please enter a valid ID"
        })
    }

})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    if (idIsValid(id)) {
        query.getEquipmentByID(id)
            .then((returnedEquipment) => {
                if (returnedEquipment) {
                    query.deleteEquipment(id)
                        .then((confirmedID) => {
                            res.json({
                                message: `successfully deleted equipment with ID ${confirmedID}`
                            })
                        })
                } else {
                    res.json({
                        message: "Equipment not found, could not be deleted"
                    })
                }
            })
    } else {
        res.json({
            message: "Please enter a valid ID"
        })
    }
})

function idIsValid(proposedID) {
    var isnum = (/^\d+$/).test(proposedID);
    console.log(isnum);
    return isnum;
}

function createInsertableObject(requestBody) {
    const insertableObject = {
        user_id: requestBody.user_id,
        name: requestBody.name,
        description: requestBody.description
    }

    return insertableObject;
}



module.exports = router;
