import express from "express";
import {UserSignup,UserSignin,UpdateProfile,AddTask,AllTask} from '../controllers/UserController.js'
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post('/signup',UserSignup);
router.post('/signin',UserSignin);
router.post('/updateProfile',upload.single('image'),authUser,UpdateProfile)
router.post('/addTask',authUser,AddTask);
router.get('/allTask',authUser,AllTask);

export default  router;