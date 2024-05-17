  //CRUD opertions///

const express = require("express");
const router = express.Router();
const { getemployees ,
    postemployee,
  
    deleteemployee,postimg,updateemployee,searchEmployees,getemployee} = require("../controller/employeesController");
   const upload = require("../config/multer")

//get
router.route("/"). get(getemployees)

//post
router.route("/"). post(postemployee)

//IMAGE
router.post("/:id/image",upload.single('image'),postimg)

//put
router.route("/:id").put(updateemployee)

//search
router.route("/search").get(searchEmployees);

//get using id 
router.route("/:id"). get(getemployee)

//delete
router.route("/:id"). delete(deleteemployee)

module.exports = router;