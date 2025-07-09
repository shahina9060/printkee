import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { backendEndApi } from "../endUserApi/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${backendEndApi}/logout`, {
        withCredentials: true,
      });
      dispatch(logoutAdmin());
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <h2 className="dashboard-title">Welcome to the Admin Dashboard</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card card-users">
          <h3>Users</h3>
          <p>300</p>
        </div>
        <div className="dashboard-card card-orders">
          <h3>Orders</h3>
          <p>50</p>
        </div>
        <div className="dashboard-card card-sales">
          <h3>Sales</h3>
          <p>$5,000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
