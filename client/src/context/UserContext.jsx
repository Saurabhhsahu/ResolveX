import { createContext, useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); 
  const [tasks,setTasks] = useState(null);
  const URI = import.meta.env.VITE_API_URI; 

  const navigate = useNavigate();

  const signup = async (name, email, password,coordinates) => {
    const location = {
      type: "Point",
      coordinates
    }
    console.log(location);
    
    if (!name || !email || !password || !location) {
      return;
    }
  
    try {
      const response = await axios.post(`${URI}/user/signup`, { name, email, password,location });
      const data = response.data;
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate('/')
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error in signing up user:", err);
    }
  };

  const signin = async (email, password) => {
    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    try {
      const response = await axios.post(`${URI}/user/signin`, { email, password });
      const data = response.data;
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate('/');
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error in signing in user:", err);
    }
  };

  const addTask = async(title,description,bounty,location) => {
    try{
      console.log(`title : ${title} description: ${description} bounty : ${bounty} location: ${location}`);
      const response = await axios.post(`${URI}/user/addTask`,{title,description,bounty,location},{headers:{token}});
      const data = response.data;
      console.log(data);
      
      if(data.success){
        getAllTask()
        navigate('/allTask');
      }else{
        console.log(data.message);
      }
    }
    catch (err) {
      console.error("Error in adding task:", err);
    }
  }

  const getAllTask = async() => {
    try{
      const response = await axios.get(`${URI}/user/allTask`,{headers:{token}});
      const data = response.data;

      if(data.success){
        console.log(data.allTask);
        
        setTasks(data.allTask);
      }
      else{
        console.log(data.message);
      }
    }
    catch (err) {
      console.error("Error in getting all task:", err);
    }
  }

  useEffect(() => {
    getAllTask();
  },[]);

  const value = {
    token,
    setToken,
    signup,
    signin,
    addTask,getAllTask,
    tasks,setTasks
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};

export default userContext;
