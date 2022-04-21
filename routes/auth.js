const { register,verifyEmail, autoLogin} = require("../controllers/auth");
const { checkAuth } = require("../middleware/checkAuth");

const router=require("express").Router();



router.patch("/register",register);
router.get('/verifyemail/:email/:token', verifyEmail);
router.get('/autoLogin',checkAuth,autoLogin);







module.exports=router;