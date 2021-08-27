const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

//create user route end points
router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);

//user CRUD operations
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser)

router.route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
