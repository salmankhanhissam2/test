const express = require("express");
const { userRegister } = require("../controls/user");
const multer = require("multer");
const route = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});
const upload = multer({ storage: storage });


route.post("/register", upload.single("userFile"), userRegister);

module.exports = route;
