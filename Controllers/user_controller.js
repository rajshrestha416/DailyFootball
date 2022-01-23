const User = require("../Models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const fs = require("fs");


exports.show_user = (req, res) => {
  const data = User.find({})
    .then((data) => {
      res.status(200).json({
        success: true,
        users: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        error: err,
      });
    });
};

exports.insert_user = async (req, res) => {
  console.log("Herererer")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  };

  const passowrd = req.body.password;
  bcryptjs.hash(passowrd, 10, (err, hash) => {
    const data = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      country: req.body.country,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      club: req.body.club,
      role: req.body.role,
    });
    data
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err,
        });
      });
  });
};



exports.update_user = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const id = req.params.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;

  console.log(id);
  const data = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username
  };
  console.log(data);
  await User.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((data) => {
      res.status(200).json(
        {
          success: true,
          data: data
        }
      );
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: "Update Failed",
      });
    });
};



exports.uploadImage = async (req, res) => {
  const id = req.params.id;
  // console.log(req.file)
  // return

  if (!req.file) {
    return res.status(200).json(
      {
        success: false,
        message: "update failed",
      }
    );
  }

  var file = req.file.path;

  data = {
    profilePicture: file
  };

  await User.findOne({ _id: id }).then(async data => {

    if (data.profilePicture !== "pictures\\uploads\\user.png") {
      // delete code
      if (data.profilePicture && fs.existsSync(data.profilePicture)) {

        console.log(data);
        fs.unlinkSync(data.profilePicture);
      }
    }

    data.profilePicture = file;
    await data.save();
    // .then((data) => {
    //   console.log(data)
    console.log(data);
    return res.status(200).json(
      {
        success: true,
        data: data
      }
    );
  })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "update failed",
      });
    });

  // await User.updateOne({ _id: id }, data)

};

exports.delete_user = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json(
        send({
          success: true,
          message: "User deleted",
        })
      );
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: err,
      });
    });
};

exports.authenticate_user = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  User.findOne({
    username: username,
  })
    .then((user) => {
      console.log(user);
      if (user === null) {
        console.log("User not found");
        return res.status(201).json({
          success: false,
          message: "Invalid Credentials !!",
        });
      }

      bcryptjs.compare(password, user.password, (err, result) => {
        if (result === false) {
          console.log("password wrong");
          return res.status(201).json({
            success: false,
            message: "Invalid Credentials !!",
          });
        }

        const token = jwt.sign({ userId: user._id }, "dailyfootballuser");
        console.log(token);
        return res.status(200).json({
          success: true,
          token: token,
          data: user
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
};
