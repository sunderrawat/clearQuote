const express = require("express");
const userRouter = require("./routes/userRoutes");

const app = express();
//parse req body data
app.use(express.json());

//home url dummy response
app.get("/", (req, res) => {
  res.status(200).send("App is started...");
});

//RESTfull api routes
app.use("/api/v1/users", userRouter);

//404 not found error
app.use('/api/v1/*', (req, res)=>{
    res.status(404).json({status: 'fail', statusCode: 404, message: 'this api route is not find or not defined by developer'})
})

module.exports = app;
