const { apiError } = require("../utils/apiError");
const User = require("../models/user.js");
const { ApiResponse } = require("../utils/apiRes");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});
const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (file.mimetype !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.mimetype !== "application/vnd.ms-excel") {
      return cb(new apiError(400, "Only Exl"), false);
    }
    cb(null, true);
  }
});

const userRegister = async (req, res) => {
  try {
  
    const file = req.file;

    
    if (!file) {
      throw new apiError(400, "Excel file is rired");
    }

   
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      throw new apiError(400, "All filds are rquired");
    }

  
    const newUser = await User.create({
      username,
      email,
      password
    });

    const accessToken = newUser.generateAccessToken();

   
    res.status(201).json(new ApiResponse(201, newUser, "User rgred sussfully"));
  } catch (error) {
    
    console.log(error);
    res.status(error.statusCode || 500).json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

module.exports = { userRegister, upload };
