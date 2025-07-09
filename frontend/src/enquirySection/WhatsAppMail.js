import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../styles/whatsappmail.css";

const WhatsAppMail = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+918750708222";
    const message = "Hello! I'd like to connect.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // const handleEmailClick = () => {
  //   const email = "shahina3726@email.com";
  //   const subject = "Inquiry";
  //   const body = "Hello, I would like to inquire about...";
  //   window.location.href = `mailto:${email}?subject=${encodeURIComponent(
  //     subject
  //   )}&body=${encodeURIComponent(body)}`;
  // };

  return (
    <div className="whatsapp-mail-container">
      {/* WhatsApp Icon */}
      <div className="whatsApp-icon" onClick={handleWhatsAppClick}>
        <FaWhatsapp size={40} />
      </div>

      {/* Email Icon */}
      {/* <div className="email-icon" onClick={handleEmailClick}>
        <FaEnvelope size={40} />
      </div> */}
    </div>
  );
};

export default WhatsAppMail;
