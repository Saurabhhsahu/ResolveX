import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./page/Auth";
import Home from "./page/Home";
import { useUser } from "./context/UserContext";
import Profile from "./page/Profile";
import AboutUs from "./page/AboutUs";
import Tasks from "./page/Tasks";
import AddTask from "./page/AddTask";
import MyTasks from "./page/MyTasks";

function App() {
  const { token } = useUser();

  return (
    <Routes>
      <Route
        path="/"
        element={token || localStorage.getItem("token") ? <Home /> : <Navigate to="/auth" />}
      >
        <Route path="about-us" element={<AboutUs />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="my-tasks" element={<MyTasks />} />
      </Route>

      <Route path='/profile' element={<Profile/>} />
      

      <Route
        path="/auth"
        element={!token && !localStorage.getItem("token") ? <Auth /> : <Navigate to="/" />}
      />

      <Route path="*" element={<Navigate to={token ? "/" : "/auth"} />} />
    </Routes>
  );
}

export default App;
