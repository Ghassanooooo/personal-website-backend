const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");

exports.signUp = async (req, res, next) => {
  console.log(req.body);
  const { email, password, confirmPassword, userName } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      if (password === confirmPassword) {
        const hashPass = await bcrypt.hash(password, 10);
        console.log(hashPass);
        new User({
          email,
          userName,
          password: hashPass,
        }).save((err, userData) => {
          if (err) console.log(err);
          const token = jwt.sign(
            {
              email,
              userName,
              id: userData._id,
            },
            config.jwtKey,
            { expiresIn: 2592000000 }
          );

          res.json({ token, userId: userData._id });
          console.log("User data  ==> ", userData);
          console.log("User token  ==> ", token);
        });
      } else {
        console.log("Please confirm the password");
        res.json({ error: "Please confirm the password" });
      }
    } else {
      console.log(email + " already registered!");
      res.json({ error: email + " already registered!" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.signIn = async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const compare = bcrypt.compare(password, user.password);
      if (compare) {
        const token = jwt.sign(
          {
            email: user.email,
            userName: user.userName,
            id: user._id,
          },
          config.jwtKey,
          { expiresIn: 2592000000 }
        );

        res.json({ token, userId: user._id });
      } else {
        res.json({ error: " The password is not correct" });
      }
    } else {
      res.json({ error: email + " does not registered! please sign up" });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.getUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");
  res.send(user);
  console.log(user);
};

exports.getAllUsers = async (req, res, next) => {
  if (req.user.isAdmin) {
    const users = await User.find().select("-password");
    res.send(users);
  }
};

exports.edit = async (req, res, next) => {
  const { userName, avatar } = req.body;
  console.log("req.user", req.user);
  const user = await User.findById(req.user._id);
  user.userName = userName;
  user.avatar = avatar;
  user.save();
  res.send(true);
};
