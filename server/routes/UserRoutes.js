import express from "express";
import {UserSignup,UserSignin,UpdateProfile} from '../controllers/UserController.js'
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";
import { AddTask } from "../controllers/UserController.js";

const router = express.Router();

router.post('/signup',UserSignup);
router.post('/signin',UserSignin);
router.post('/updateProfile',upload.single('image'),authUser,UpdateProfile)
router.post('/addTask',authUser,AddTask);

export default  router;