import { createContext, useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); 
  // const [tasks,setTasks] = useState(null);
  // const [myTasks,setMyTasks] = useState(null);
  const [profile,setProfile] = useState('');

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

  const getProfile = async(profileId) => {
    try{
      const response = await axios.post(`${URI}/user/getProfile`,{profileId},{headers:{token}});
      const data = response.data;
      console.log(data);
      
      if(data.success){
        setProfile(data.user);
      }
    }
    catch(err){
      console.log("Error in getting progile of user : ",err.message);
    }
  }

  useEffect(() => {
    getProfile('');
    console.log(profile);
    
  },[token])

  // const addTask = async(title,description,bounty,coordinates) => {
  //   try{
  //     const location = {
  //       type: "Point",
  //       coordinates
  //     }
  //     console.log(`title : ${title} description: ${description} bounty : ${bounty} location: ${location}`);
  //     const response = await axios.post(`${URI}/user/addTask`,{title,description,bounty,location},{headers:{token}});
  //     const data = response.data;
  //     console.log(data);
      
  //     if(data.success){
  //       getAllTask();
  //       navigate('/my-tasks');
  //     }else{
  //       console.log(data.message);
  //     }
  //   }
  //   catch (err) {
  //     console.error("Error in adding task:", err);
  //   }
  // }

  // const getAllTask = async() => {
  //   try{
  //     const response = await axios.get(`${URI}/user/allTask`,{headers:{token}});
  //     const data = response.data;
        
  //     if(data.success){
  //       setTasks(data.allTask);
  //     }
  //     else{
  //       console.log(data.message);
  //     }
  //   }
  //   catch (err) {
  //     console.error("Error in getting all task:", err);
  //   }
  // }

  // const getMyTasks = async() => {
  //   try{
  //     const response = await axios.get(`${URI}/user/myTask`,{headers:{token}});
  //     const data = response.data;

  //     if(data.success){
  //       setMyTasks(data.myTasks);
  //     }
  //     else{
  //       console.log(data.message);
  //     }
  //   }
  //   catch (err) {
  //     console.error("Error in getting all task:", err);
  //   }
  // }

  // const updateTask = async({title,description,status,bounty,location,_id}) => {
  //   console.log(title,description,bounty,location,status,_id);
    
  //   try{
  //     const response = await axios.put(`${URI}/user/updateTask`,{title,description,bounty,location,status,_id},{headers:{token}});
  //     const data = response.data;
      
  //     console.log(data.message);
  //     if(data.success){
  //       getMyTasks();
  //     } 
  //   }
  //   catch (err) {
  //     console.error("Error in updating task:", err);
  //   }
  // }

  // const deleteTask = async(taskId) => {
  //   try{
  //     const response = await axios.delete(`${URI}/user/deleteTask/${taskId}`,{headers:{token}});
  //     const data = response.data;

  //     console.log(data.message);
  //   }
  //   catch(err){
  //     console.log("Error in deleting the task : ",err);
      
  //   }
  // }

  // const sendRequest = async(taskId) => {
  //   try{
  //     const response = await axios.get(`${URI}/user/requestTask/${taskId}`,{headers:{token}});
  //     const data = response.data;

  //     console.log(data.message);
  //   }
  //   catch(err){
  //     console.log("Error in sending request : ",err.message);
  //   }
  // }

  // useEffect(() => {
  //   if(token){
  //     getAllTask();
  //     getMyTasks();
  //   }
  // },[]);

  const value = {
    token,
    setToken,
    signup,
    signin,
    // addTask,getAllTask,
    // tasks,setTasks,
    // myTasks,setMyTasks,
    // updateTask,
    // deleteTask,
    // sendRequest,
    getProfile,
    profile,setProfile
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};

export default userContext;
