import { createContext, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); 
  const URI = import.meta.env.VITE_API_URI; 

  const signup = async (name, email, password) => {
    if (!name || !email || !password) {
      return;
    }
  
    try {
      const response = await axios.post(`${URI}/user/signup`, { name, email, password });
      const data = response.data;
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        Navigate('/')
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
        Navigate('/');
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error in signing in user:", err);
    }
  };

  const addTask = async(title,description,bounty) => {
    try{
      console.log(`title : ${title} description: ${description} bounty : ${bounty}`);
      const response = await axios.post(`${URI}/user/addTask`,{title,description,bounty},{headers:{token}});
      const data = response.data;
      console.log(data);
      

      if(data.success){
        Navigate('/tasks');
      }else{
        console.log(data.message);
      }
    }
    catch (err) {
      console.error("Error in adding task:", err);
    }
  }

  const value = {
    token,
    setToken,
    signup,
    signin,
    addTask
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export const useUser = () => {
  return useContext(userContext);
};

export default userContext;
