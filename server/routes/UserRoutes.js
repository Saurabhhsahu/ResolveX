import express from "express";
import {UserSignup,UserSignin,UpdateProfile,AddTask,AllTask,MyTasks,UpdateTask,DeleteTask,GetRequest} from '../controllers/UserController.js'
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";

const router = express.Router();

router.post('/signup',UserSignup);
router.post('/signin',UserSignin);
router.post('/updateProfile',upload.single('image'),authUser,UpdateProfile)
router.post('/addTask',authUser,AddTask);
router.get('/allTask',authUser,AllTask);
router.get('/myTask',authUser,MyTasks);
router.put('/updateTask',authUser,UpdateTask);
router.delete('/deleteTask/:taskId',DeleteTask);
router.get('/requestTask/:taskId',authUser,GetRequest);

export default  router;