import express from "express";
import mongoose from "mongoose";
import { userModel } from "./model/userSchema.js";
import chalk from "chalk";

const app = express();
app.use(express.json());

const MONGODB_URI = "mongodb+srv://class3:class3@cluster0.kjpghau.mongodb.net/";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("mongodb connected!"))
  .catch((err) => console.log(err));

app.post("/api/createusers", async (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.json({
      message: "Required Fields are missing!",
      status: false,
    });
  }

  try {
    const userObj = { name, age, email };
    const createData = await userModel.create(userObj);

    return res.json({
      message: "User created successfully!",
      data: createData,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Database error",
      error: err.message,
    });
  }
});

//user's api
app.get("/api/getusers", async (req, res) => {
  const getData = await userModel.find();
  res.json({
    message: "get user data successfully!",
    getData,
  });
});

// update users
app.put("/api/updateusers", async (req, res) => {
  const body = req.body;
  const updateData = await userModel.findByIdAndUpdate(
    "68d6e567f3806631cfcfed4e",
    body
  );
  res.json({
    message: "user updated successfully!",
    updateData,
  });
});

// delete users
app.delete("/api/deleteusers/:id", async (req, res) => {
  const params = req.params.id;
  const deleteData = await userModel.findByIdAndDelete(params);

  res.json({
    message: "user deleted sucessfully!",
  });
});

app.listen(3000, () => {
  console.log(chalk.red.bold("Server is running!"));
});
