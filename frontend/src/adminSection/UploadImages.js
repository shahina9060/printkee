import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadImages.css'; 
import { backendEndApi } from '../endUserApi/api';

const UploadImages = () => {
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setBanner(file);
      setPreview(URL.createObjectURL(file));  // Preview image before upload
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!banner) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('banner', banner);
    setIsUploading(true);

    try {
      const response = await axios.post(`${backendEndApi}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("Upload response:", response.data);
      alert('Banner image uploaded successfully');
      // setBanner(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert('Error uploading banner image');
    }

    setIsUploading(false);
  };

  return (
    <div className="upload-container">
      <h2>Upload Banner Image</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          {/* <label htmlFor="banner" className="file-label">Choose Banner Image</label> */}
          <input
            type="file"
            id="banner"
            name="banner"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
            // Set value to an empty string or the state to reset the input after upload
            key={banner ? banner.name : ''}
          />
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit" className="upload-btn" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadImages;
