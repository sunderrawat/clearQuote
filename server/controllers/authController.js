const User = require("./../model/userModel");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "User signUp successfully",
      data: newUser,
    });
  } catch (err) {
      console.log(err)
    res.status(500).json({
      status: "fail",
      statusCode: 500,
      message: `something went wrong ${err.message}`,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.find({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) {
      return res
        .status(404)
        .json({
          status: "fail",
          statusCode: 404,
          message: "Incorrect email or password",
        });
    }
    res
      .status(200)
      .json({
        status: "success",
        statusCode: 200,
        message: "user successfully login",
        data: user,
      });
  } catch (err) {
      console.log(err)
    res
      .status(500)
      .json({
        status: "fail",
        statusCode: 500,
        message: "something went wrong",
      });
  }
};
