import React, { useRef, useState } from "react";
import axios from "axios";
import { backendEndApi } from "../endUserApi/api";
import "../styles/UploadImages.css";

const UploadCSVFile = () => {
  const [file, setFile] = useState(null);
  const fileRef = useRef()

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${backendEndApi}/products/upload-csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.message);
      fileRef.current.value = ''
    } catch (err) {
        console.error(err);
        const msg =
          err.response?.data?.message || "Upload failed. Please try again.";
        alert(msg);
      }
      
  };

  return (
    <div className="upload-container">
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <input
            type="file"
            accept=".csv"
            className="file-input"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </div>
        <button type="submit" className="upload-btn">
          Upload CSV
        </button>
      </form>
    </div>
  );
};

export default UploadCSVFile;
