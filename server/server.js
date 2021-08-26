const mongoose = require("mongoose");
const app = require("./app");

//connect application with mongodb database
mongoose
  .connect("mongodb://127.0.0.1:27017/clearQuote")
  .then(() =>
    console.log("Application is successfully connect with database 👍")
  )
  .catch(() =>
    console.log("something went wrong during database connection 🔥 👎")
  );

//start server
app.listen("3000", () => {
  console.log("App is started on port 3000");
});
