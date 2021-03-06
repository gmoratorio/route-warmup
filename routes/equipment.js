var express = require('express');
var router = express.Router();
const query = require("../db/query");
const functions = require("../functions/userChecks");

/**
@api {get} /equipment GET all Equipment route
@apiSuccessExample {json} Success-Response:
  HTTP/1.1 200 OK
  [{
      "id": 1,
      "user_id": 1,
      "name": "Burton Snowboard",
      "description": "Guillermo's old board... got quite a few scratches!"
  }, {
      "id": 3,
      "user_id": 1,
      "name": "Burton Boots",
      "description": "Guillermo's old boots. Time for a new pair for sure."
  }]

@apiErrorExample {json} Error-Response:
1) ID is not an integer
  {
  "message": "Please enter a valid ID"
  }
2) ID is valid, but there is not entry with that ID
  {
  "message": "Equipment not found"
  }
*/

router.get('/', function(req, res, next) {
    query.getAllEquipment()
        .then((allEquipment) => {
            res.json(allEquipment);
        })
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    if (idIsValid(id)) {
        query.getEquipmentByID(id)
            .then((returnedEquipment) => {
                if (returnedEquipment) {
                    res.json(returnedEquipment);
                } else {
                    res.json({
                        message: "Equipment not found"
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
