import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Server } from "socket.io";
import http from "http";

import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import UserRoutes from './routes/UserRoutes.js'

connectDB();
connectCloudinary();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("io", io);

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

app.use(cors());
app.use(express.json());

app.use('/api/user',UserRoutes);

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });

    socket.on('new_task', (task) => {
        // Emit the notification to all connected users
        io.emit('new_task_notification', {
          message: `New task created: ${task.name}`,
        });
    });
});

server.listen(PORT, () => {
    console.log(`Socket running on port ${SOCKET_PORT}`);
});

// app.listen(PORT, () =>{
//     console.log(`Server running on port ${PORT}`);
// })