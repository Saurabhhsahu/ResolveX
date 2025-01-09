import { createContext, useState, useContext,useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "./UserContext";
import { useUser } from "./UserContext";

const taskContext = createContext();

export const TaskProvider = ({children}) => {
    const {token} = useUser();
    const [tasks,setTasks] = useState(null);
    const [myTasks,setMyTasks] = useState(null);

    const URI = import.meta.env.VITE_API_URI; 
    const navigate = useNavigate();

    const addTask = async(title,description,bounty,coordinates) => {
        try{
          const location = {
            type: "Point",
            coordinates
          }
          const response = await axios.post(`${URI}/user/addTask`,{title,description,bounty,location},{headers:{token}});
          const data = response.data;
          
          if(data.success){
            getAllTask();
            navigate('/my-tasks');
          }else{
            console.log(data.message);
          }
        }
        catch (err) {
          console.error("Error in adding task:", err.message);
        }
    }

    const getAllTask = async() => {
        try{
          const response = await axios.get(`${URI}/user/allTask`,{headers:{token}});
          const data = response.data;
            
          if(data.success){
            setTasks(data.allTask);
          }
          else{
            console.log(data.message);
          }
        }
        catch (err) {
          console.error("Error in getting all task:", err.message);
        }
    }

    const getMyTasks = async() => {
        try{
          const response = await axios.get(`${URI}/user/myTask`,{headers:{token}});
          const data = response.data;
    
          if(data.success){
            setMyTasks(data.myTasks);
          }
          else{
            console.log(data.message);
          }
        }
        catch (err) {
          console.error("Error in getting all task:", err);
        }
    }

    const updateTask = async({title,description,status,bounty,location,_id}) => {
        console.log(title,description,bounty,location,status,_id);
        
        try{
          const response = await axios.put(`${URI}/user/updateTask`,{title,description,bounty,location,status,_id},{headers:{token}});
          const data = response.data;
          
          console.log(data.message);
          if(data.success){
            getMyTasks();
          } 
        }
        catch (err) {
          console.error("Error in updating task:", err);
        }
    }

    const deleteTask = async(taskId) => {
        try{
          const response = await axios.delete(`${URI}/user/deleteTask/${taskId}`,{headers:{token}});
          const data = response.data;
    
          console.log(data.message);
        }
        catch(err){
          console.log("Error in deleting the task : ",err);
          
        }
    }

    const sendRequest = async(taskId) => {
        try{
          console.log("helo");
          
          const response = await axios.get(`${URI}/user/requestTask/${taskId}`,{headers:{token}});
          const data = response.data;
          
          console.log(data.message);
        }
        catch(err){
          console.log("Error in sending request : ",err.message);
        }
      }

    useEffect(() => {
      if(token){
        getAllTask();
        getMyTasks();
      }
    },[]);

    const value = {
        tasks,setTasks,
        addTask,
        myTasks,setMyTasks,
        getAllTask,
        getMyTasks,
        updateTask,
        deleteTask,
        sendRequest
    }

    useEffect(() => {
        if(token){
          getAllTask();
          getMyTasks();
        }
    },[]);

    return <taskContext.Provider value={value}>
        {children}
    </taskContext.Provider>
}

export const useTask = () => {
    return useContext(taskContext);
}

export default taskContext