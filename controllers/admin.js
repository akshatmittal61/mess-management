const Auth = require("../models/auth");
const Mess = require("../models/messDetails");

exports.newUser = async (req, res) => {
  try {
    const check = await Auth.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(401)
        .json({ errors: [{ message: "User already Exits" }] });
    }
    const newUser = Auth(req.body);
    const results = newUser.save();
    if (results) {
      return res.status(200).json({ errors: [{ message: "User created " }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.newMess = async (req, res) => {
  try {
    const checkMess = await Mess.findOne({ email: req.body.email });
    if(checkMess){
        return res
        .status(401)
        .json({ errors: [{ message: "User Mess details already Exits" }] });
    }else{
        const newMessDetails=new Mess(req.body);
        const results=newMessDetails.save();
        if(results){
            return res.status(200).json({ errors: [{ message: "Details saved succesfully " }] });
        }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};


