const User = require("./../model/userModel");

//CRUD operations for user
//create user
exports.createUser = async (req, res) => {
  try {
    //create user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    //send response
    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    //if error then send from response
    console.log(err);
    res.status(500).json({
      status: "fail",
      statusCode: 500,
      message: `something went wrong ${err.message}`,
    });
  }
};

//get all user or read all user
exports.getAllUser = async (req, res) => {
  try {
    //find user from id
    const user = await User.find();
    
    //send success user found message
    res.status(200).json({
      status: "success",
      statusCode: 200,
      results: user.length,
      message: "Users is successfully loaded",
      data: user,
    });
  } catch (err) {
    //if any error during this send the error message
    res.status(500).json({
      status: "fail",
      statusCode: 500,
      message: `Something went wrong ${err}`,
    });
  }
};

//get a single user or read user
exports.getUser = async (req, res) => {
  try {
    //find user from id
    const user = await User.findById(req.params.id);
    //if no user find then send fail response
    if (!user) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "User not found with this id",
      });
    }
    //send success user found message
    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "User is successfully found",
      data: user,
    });
  } catch (err) {
    //if any error during this send the error message
    res.status(500).json({
      status: "fail",
      statusCode: 500,
      message: `Something went wrong ${err}`,
    });
  }
};

// update user
exports.updateUser = async (req, res) => {
  try {
    //find user from id and update
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body);
    //if no user find then send fail response
    if (!updateUser) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "User not found with this id",
      });
    }

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "user data successfully updated",
    });
  } catch (err) {
    //send error message if any
    res.status(500).json({
      status: "fail",
      statusCode: 500,
      message: `something went wrong ${err}`,
    });
  }
};

//Delete user
exports.deleteUser = async (req, res) => {
  try {
    //find user and delete
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    //if no user find then send fail response
    if (!deleteUser) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "User not found with this id",
      });
    }

    res.status(204).json({
      status: "success",
      statusCode: 204,
      message: "user successfully delete",
    });
  } catch (err) {
    //send error message if any
    res.status(500).json({
      status: "fail",
      statusCode: 500,
      message: `something went wrong ${err}`,
    });
  }
};
