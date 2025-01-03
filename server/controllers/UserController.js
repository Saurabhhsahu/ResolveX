import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import Task from '../models/Task.js'

const UserSignup = async (req, res) => {
    try {
        console.log("Handling user signup...");

        const { name, email, password } = req.body;

        // Validate input
        if (!email || !password || !name) {
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

        const { id, name, email } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
            message: 'Profile updated successfully',
        });
    } catch (err) {
        console.error('Error in updating profile: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in updating profile',
        });
    }
};

const AddTask = async(req,res) => {
    try{
        const {title,description,bounty,userId,location} = req.body;
        console.log(`title : ${title} description: ${description} bounty : ${bounty} id : ${userId} location : ${location}`);
        
        if (!userId || !title || !description || !bounty || !location) {
            return res.status(400).json({ success: false, message: 'Missing Data' });
        }

        const existingUser = await User.findOne({ _id:userId });
        console.log(existingUser);
        
        const newTask = new Task({
            title,
            description,
            bounty,
            user:existingUser,
            location
        });
        await newTask.save();

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

const AllTask = async(req,res) => {
    try{
        const {userId} = req.body;

        const allTask = await Task.find({user:userId,status:"Pending"});
        
        res.status(201).json({
            success: true,
            allTask,
            message: 'All task returned successfully',
        });
    }
    catch (err) {
        console.error('Error in  getting all task: ', err);
        res.status(500).json({
            success: false,
            message: 'Error in getting all task',
        });
    }
}

export { UserSignup, UserSignin, UpdateProfile,AddTask,AllTask };
