const { newUser, newMess } = require("../controllers/admin");
const { checkAuth, isAdmin } = require("../middleware/checkAuth");

const router=require("express").Router();





router.post("/newuser",checkAuth,isAdmin,newUser);
router.post("/newmess",checkAuth,isAdmin,newMess);


    




module.exports=router;