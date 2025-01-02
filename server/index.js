import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import UserRoutes from './routes/UserRoutes.js'

connectDB();
connectCloudinary();

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/user',UserRoutes);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})