import React, { useState } from "react";
import axios from "axios";
import "../styles/EnquiryForm.css";
import { backendEndApi } from "../endUserApi/api";
import { crm_api_key } from "../endUserApi/api";  
import { crm_api_url } from "../endUserApi/api";

const EnquiryForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send lead to CRM
      await axios.post(
        `${crm_api_url}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${crm_api_key}`,
          },
        }
      );

      // Send email
      const response = await fetch(`${backendEndApi}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Email sent successfully!");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          requirements: "",
        });
        setShowForm(false);
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button className="enquiry-button" onClick={toggleForm}>
        <img src="/assets/form.jpeg" alt="Enquiry" width="30" height="30" />
      </button>

      {/* Enquiry Form Modal */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <button className="close-button" onClick={toggleForm}>✖</button>
            <h2 id="enquiry-id-h2">ENQUIRY FORM</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Phone (+91)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                />
              </div>

              <div>
                <label>Tell us about your requirement...</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Request a Call Back
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquiryForm;
