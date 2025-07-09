import { useState } from "react";
import "../styles/AdminAuth.css"; // Import the CSS file
import axios from "axios"
import { backendEndApi } from "../endUserApi/api";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/adminSlice";


const AdminLogin = () => {

  const [formData, setFormData] = useState({username:'', password:''})
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendEndApi}/login`, formData,{
        withCredentials:true
      });
  
      if (res.data.success) {
        dispatch(loginSuccess()); // ✅ Set Redux login state
        toast.success(res.data.message);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
      console.error("Login error", error);
    } finally{
      setFormData({ username: "", password: "" });
    }
  };
  

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              className="admin-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="admin@printkee.com"
              required
            />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input
              type="password"
              className="admin-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}

              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
