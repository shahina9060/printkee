import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaChartBar, FaCogs, FaUpload } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for toggling sidebar visibility

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '←' : '→'} {/* Button to open/close the sidebar */}
      </button>
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-list">
        <li><Link to="dashboard" className="sidebar-link"><FaHome /> Dashboard</Link></li>
        <li><Link to="uploadimages" className="sidebar-link"><FaUpload /> Upload Banner</Link></li>
        <li><Link to="upload" className="sidebar-link"><FaUpload /> Upload Product Images</Link></li>
        <li><Link to="uploadcsvfile" className="sidebar-link"><FaUpload /> Upload CSV File</Link></li>
        <li><Link to="users" className="sidebar-link"><FaUsers /> Users</Link></li>
        <li><Link to="reports" className="sidebar-link"><FaChartBar /> Reports</Link></li>
        <li><Link to="settings" className="sidebar-link"><FaCogs /> Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
