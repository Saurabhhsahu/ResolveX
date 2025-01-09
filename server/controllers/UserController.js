import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Task from '../models/Task.js'
import Notification from '../models/Notification.js'
import TaskModel from '../models/Task.js';

import cloudinary from 'cloudinary'

import {ObjectId} from 'mongodb'

const UserSignup = async (req, res) => {
    try {

        const { name, email, password,location } = req.body;
        
        
        // Validate input
        if (!email || !password || !name || !location) {
            return res.status(400).json({ success: false, message: 'Missing data' });
        }
        

        if (!validator.isEmail(email)) {
            console.log("hello");
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password should have at least 8 characters',
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

    
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            location
        });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            success: true,
            token,
            message: 'User created successfully',
        });
    } catch (err) {
        console.error('Error in user signup: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in user signup',
        });
    }
};

const UserSignin = async (req, res) => {
    try {
        console.log("Handling user signin...");

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Missing data' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password should have at least 8 characters',
            });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist",
            });
        }
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password',
            });
        }
        

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            token,
            message: 'User signed in successfully',
        });
    } catch (err) {
        console.error('Error in user signin: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in user signin',
        });
    }
};

const UpdateProfile = async (req, res) => {
    try {
        console.log("Handling profile update...");

        const { userId, name, location, mobile, address } = req.body;
        const imageFile = req.file;

        console.log(userId, name, location, mobile, address);

        // Ensure `location` and `address` are objects, not strings
        const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
        const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;

        // Check if the required fields are present
        if (!name || !mobile || !parsedLocation || !parsedAddress) {
            console.log("Missing data");
            return res.status(400).json({ success: false, message: 'Missing data' });
        }

        if (!userId) {
            console.log("ID required");
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Update user profile data with properly parsed objects
        await User.findByIdAndUpdate(userId, { 
            name, 
            mobile, 
            location: parsedLocation, 
            address: parsedAddress 
        });

        // Handle image file if provided
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageURL = imageUpload.secure_url;

            await User.findByIdAndUpdate(userId, { image: imageURL });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (err) {
        console.error('Error in updating profile: ', err.message);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const AddTask = async(req,res) => {
    try{
        const {title,description,bounty,userId,location} = req.body;
        
        if (!userId || !title || !description || !bounty || !location) {
            return res.status(400).json({ success: false, message: 'Missing Data' });
        }

        const existingUser = await User.findOne({ _id:userId });
        
        const newTask = new Task({
            title,
            description,
            bounty,
            user:existingUser,
            userId,
            location
        });
        await newTask.save();


        // ******* on hold ********** //
    
        // const users = await User.find({user:{$ne:userId}});

        // const notifications = users.map((user) => {
        //     return new Notification({
        //       user: user._id,
        //       message: `New task created: ${newTask.title}`,
        //     });
        //   });
      
        //   // Save notifications to the database
        //   await Notification.insertMany(notifications);
      
        //   // Emit notification to all connected users using Socket.IO
        //   req.app.get('io').emit('new_task_notification', {
        //     message: `New task created: ${newTask.title}`,
        //   });

        // req.app.get("io").emit("taskUploaded", { title, description, existingUser });

        res.status(201).json({
            success: true,
            message: 'Task added successfully',
        });
    } 
    catch (err) {
        console.error('Error in  adding task: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in adding task',
        });
    }
}

const AllTask = async (req, res) => {
    try {
        const { userId } = req.body;
        
        // Fetch all tasks with status "Pending" except those with the provided userId
        const allTask = await Task.find({ status: "Pending", userId: { $ne: userId } });
        
        return res.status(201).json({
            success: true,
            allTask,
            message: 'All tasks returned successfully',
        });
    } catch (err) {
        console.error('Error in getting all tasks: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in getting all tasks',
        });
    }
};

const MyTasks = async(req,res) => {
    try{
        const {userId} = req.body;

        const myTasks = await Task.find({userId });
        
        return res.status(201).json({
            success: true,
            myTasks,
            message: 'my tasks returned successfully',
        });
    }
    catch (err) {
        console.error('Error in getting my tasks: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in getting my tasks',
        });
    }
}

const UpdateTask = async(req,res) => {
    try{
        const {userId,_id,title,description,status,bounty,location} = req.body;
        // console.log(userId,_id,title,description,status,bounty,location);
    
        const task = await Task.findOne({_id,user:userId});
        if(!task){
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        task.title = title;
        task.description = description;
        task.status = status;
        task.bounty = bounty;
        task.location = location;

        await task.save();
        
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            updatedTask: task,
        });
    }
    catch (err) {
        console.error('Error in editing task: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in editing task',
        });
    }
}

const DeleteTask = async(req,res) => {
    try{
        const {taskId} = req.params;
        console.log(taskId);
        if(!taskId){
            return res.status(400).json({
                success: false,
                message: 'task not found',
            });
        }

        await Task.deleteOne({ _id:new ObjectId(taskId) });

        return res.status(200).json({
            success:true,
            message:"Deleted task successfully"
        })
    }
    catch (err) {
        console.error('Error in deleting task: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in deleting task',
        });
    }
}

const GetRequest = async(req,res) => {
    
    try{
        const {userId} = req.body;
        const {taskId} = req.params
        
        const task = await Task.findOne({_id: taskId});

        if(!task){
            return res.status(400).json({
                success: false,
                message: "Task not found"
            })
        }

        if(task.assignedTo){
            return res.status(400).json({
                success: false,
                message: "Task is already assigned"
            })
        }

        const user = await User.findOne({_id:userId});

        task.requestedUsers.push(user);
        await task.save();

        return res.status(200).json({
            success: true,
            message: "Request sent successfully"
        })
    }
    catch(err){
        console.log("Error in requesting task : ",err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getProfile = async(req,res) => {
    try{
        console.log("handling getprofile");
        
        const {userId,profileId} = req.body
        
        const data = profileId ? profileId : userId;
        const user = await User.findOne({_id:data})
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export { UserSignup, UserSignin, UpdateProfile,AddTask,AllTask,MyTasks,UpdateTask,DeleteTask,GetRequest,getProfile };
