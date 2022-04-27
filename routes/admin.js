const { newUser, newMess, editMess, getMessDetails, singleMessDetails, profile } = require("../controllers/admin");
const { checkAuth, isAdmin, isUser } = require("../middleware/checkAuth");

const router=require("express").Router();





router.post("/newuser",checkAuth,isAdmin,newUser);
router.post("/newmess",checkAuth,isAdmin,newMess);
router.patch("/editmess",checkAuth,isAdmin,editMess);    
router.get('/getMessDetails',checkAuth,isAdmin,getMessDetails);
router.get('/singleMessDetails',checkAuth,isUser,singleMessDetails);
router.post('/profile',checkAuth,profile);
    




module.exports=router;