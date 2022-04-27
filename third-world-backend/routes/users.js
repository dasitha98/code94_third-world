import express from "express";
import { getDashboardInfo, updatePassword, updateUser, deleteUser, getuser } from "../controllers/users.js";
import { multipleUpload } from "../middleware/multer.js";
import { getAllUsers, signup, signin } from "../controllers/users.js";
import auth from '../middleware/auth.js'


const router = express.Router();

// router.get("/getMyAds/:userId", multipleUpload, getMyAds);
// router.patch("/addFavourites/:userId/:postId", multipleUpload, getMyAds);
// router.get("/getDashInfo", getDashboardInfo)
router.patch("/updateuser/:id", multipleUpload, updateUser)
router.patch("/userpassword/:id", multipleUpload, updatePassword)
router.post("/signup", multipleUpload, signup);
router.post("/signin", multipleUpload, signin);
router.get("/getallusers", getAllUsers);
router.get("/getuser/:id", getuser);
router.delete("/deleteuser/:id",  deleteUser)



export default router;