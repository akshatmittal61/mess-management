const Auth = require("../models/auth");
const Mess = require("../models/messDetails");

exports.newUser = async (req, res) => {
  try {
    console.log(req.body);
    const check = await Auth.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(401)
        .json({ errors: [{ message: "User already Exits" }] });
    }
    const userData={
      email:req.body.email,
      name:req.body.name,
      emailVerification:false,
      role:"user",

    }
    const newUser =new Auth(userData);
    const results = await newUser.save();
    console.log(results);
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
    if (checkMess) {
      return res
        .status(401)
        .json({ errors: [{ message: "User Mess details already Exits" }] });
    } else {
      const newMessDetails = new Mess(req.body);
      const results = await newMessDetails.save();
      if (results) {
        return res
          .status(200)
          .json({ errors: [{ message: "Details saved succesfully " }] });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.editMess = async (req, res) => {
  try {
    const { email,name, ...others } = req.body;
    console.log(others);
    const newName=await Auth.updateOne({email:req.body.email},{name:name});
    const result = await Mess.updateOne(
      { email: req.body.email },
      { $set: others }
    );
    console.log(result,newName);
    if (result) {
      return res
        .status(200)
        .json({ errors: [{ message: "Details edit succesfully " }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.getMessDetails = async (req, res) => {
  try {
    const result=await Mess.find({});
    return res.status(200).json({errors: [{ message: "Details edit succesfully " , details:result}]})

  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.singleMessDetails=async(req,res)=>{
  try {
    const result=await Auth.findOne({_id:req.user});
    const messResult=await Mess.findOne({email:result.email});
  
    return res.status(200).json({errors: [{ details:messResult}]});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
}

exports.profile=async(req,res)=>{
  try {
    const result = await Auth.findOne({email:req.body.email});
    const { password, ...others } = result._doc;
    return res.status(200).json({errors: [{ details:others}]});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
}

exports.multipleUser=async(req,res)=>{
  try {
    for(let x in req.body.users){
      const newUser=await Auth(x);
      const result=newUser.save();
      const {name,...others}=result._doc;
      const messDetails=await Mess(others);
      const messResult=messDetails.save();
      return res.status(200).json({errors: [{ message:"Details saved succesfully"}]});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
}