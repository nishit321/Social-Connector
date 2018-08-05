const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/user");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch(err => {
    console.log(err);
  });
app.get("/", (req, res) => res.send("Hello"));

//Use Routes
app.use("/api/users", users);
app.use("/api/post", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
