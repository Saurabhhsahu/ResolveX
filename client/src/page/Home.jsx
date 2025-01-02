import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import DashboardBanner from '../component/DashboardBanner';
import AddTaskBanner from '../component/AddTaskBanner';

function Home() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      
      <div className='\'>
        {location.pathname === '/' && (
          <>
            <DashboardBanner/>
            <hr className="w-full height-[20px] bg-gray-400" />
            <AddTaskBanner/>
          </>
        )}
        
        <Outlet />
      </div>

      <hr className="w-full height-[20px] bg-gray-400" />

      <Footer />
    </div>
  );
}

export default Home;
