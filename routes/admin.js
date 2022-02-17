const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Harryisagoodb$oy";

//ROUTE 1: crate a user using :POST "/api/auth".Doesnt require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //check whertehr the user with this same  email exists already
    try {
      let user = await Admin.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,  error: "Sorry a user with this email alreasdy exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await Admin.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      //  res.json(user);
      success =true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error occur");
    }
  }
);

// ROUTE 2 :Authenticate a  user using:"/api/auth/login".no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blanked").exists(),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors,return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Admin.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success =true;
      res.json({ success,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(" Internal server error");
    }
  }
);

//ROUTE 3: get loggedin user details using :POST "/api/auth".Doesnt require Auth
router.post(
  "/getuser",fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await Admin.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
