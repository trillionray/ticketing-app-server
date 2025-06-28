//[SECTION] Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");


const { verify, verifyAdmin } = auth;


const router = express.Router();

//[SECTION] Activity: Routes for duplicate email
router.post("/checkEmail", userController.checkEmailExists);

//[SECTION] Route for user registration
router.post("/register", userController.registerUser);

//[SECTION] Route for user authentication
router.post("/login", userController.loginUser);

//[Section] Activity: Route for retrieving user details
router.get("/details", verify, userController.getProfile);


module.exports = router;