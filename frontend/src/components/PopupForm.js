import React, { useState } from 'react';
import '../styles/PopupForm.css';
import { isValidPhoneNumber } from 'libphonenumber-js/max'; // ✅ Updated import

const PopupForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ phone: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = () => {
    const phone = formData.phone.trim(); // ✅ Trim whitespace
    const isValid = isValidPhoneNumber(phone);

    if (!isValid) {
      setError('Please enter a valid phone number including country code (e.g., +1 for US).');
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Enter Phone no.</h2>
        <input
          type="text"
          name="phone"
          placeholder="Phone (e.g., +91 1234567890)"
          value={formData.phone}
          onChange={handleChange}
          className="popup-input"
        />
        {error && <div className="error-message">{error}</div>}
        <div className="popup-actions">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={handleSubmit} className="btn-submit">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
