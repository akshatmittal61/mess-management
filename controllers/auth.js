const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/email");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const checkUser = await Auth.findOne({ email: req.body.email });
    console.log(checkUser);
    if (checkUser) {
      if (checkUser.emailVerification) {
        console.log(checkUser);
        return res.status(409).json({
          errors: [{ message: "User already registred" }],
        });
      } else {
        if(checkUser.password){
          return res.status(409).json({
            errors: [{ message: "User already registred" }],
          });
        }else{
          const salt = await bcrypt.genSalt(10);
          const hasedPass = await bcrypt.hash(req.body.password, salt);
          req.body.password = hasedPass;
          const updateUser = await Auth.findOneAndUpdate(
            { email: req.body.email },
            { password: hasedPass }
          );
          console.log(updateUser);
          const link = `${process.env.URL}api/auth/verifyemail/${
            updateUser.email
          }/${updateUser._id.toHexString()}`;
          console.log(link);
          sendEmail(
            updateUser.email,
            "verify email",
            `<h1>verify your email <a href=${link} > click to verify</a></h1>`
          );
  
          return res
            .status(200)
            .json({ errors: [{ message: "Please verify your email" }] });
        }
       
      }
    } else {
      return res.status(404).json({
        errors: [{ message: "No record found please contact mess admin" }],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, token } = req.params;
  try {
    const data = await Auth.findOne({ email: email });
    if (data.verification) {
      return res
        .status(401)
        .json({ errors: [{ message: "You are already verified" }] });
    } else {
      if (data._id.toHexString() === token) {
        const user = await Auth.updateOne(
          { email: email },
          { emailVerification: true }
        );
        if (!user) {
          return res
            .status(401)
            .json({ errors: [{ message: "could not verify " }] });
        }
        return res
          .status(401)
          .json({ errors: [{ message: "You are verified" }] });
      } else {
        return res.status(401).json({ errors: [{ message: "Invalid link" }] });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.autoLogin = async (req, res) => {
  if (req.user) {
    const sendData = await Auth.findOne({ _id: req.user });
    if (sendData) {
      const { password, ...others } = sendData._doc;
      return res.status(200).json({ useData: others });
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid Credentials" }] });
    }
  } else {
    return res
      .status(401)
      .json({ errors: [{ message: "Invalid Credentials" }] });
  }
};

exports.login = async (req, res) => {
  try {

    const result = await Auth.findOne({ email: req.body.email });
    console.log(result);
    if (result) {
      const validate = await bcrypt.compare(req.body.password, result.password);
      if (validate) {
        if(result.emailVerification){
          const { password, ...others } = result._doc;
          const token = jwt.sign(
            { uid: result._id.toHexString() },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
          );
          return res.status(200).json({ useData: others, token: token });
        }else{
          return res
          .status(401)
          .json({ errors: [{ message: "Verify email" }] });
        }
        
      } else {
        return res
          .status(401)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};
