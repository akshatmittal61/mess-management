const { register,verifyEmail, autoLogin, login} = require("../controllers/auth");
const { checkAuth } = require("../middleware/checkAuth");

const router=require("express").Router();



router.patch("/register",register);
router.get('/verifyemail/:email/:token', verifyEmail);
router.get('/autoLogin',checkAuth,autoLogin);
router.post('/login',login);
router.get('/getMessDetails',checkAuth);







module.exports=router;