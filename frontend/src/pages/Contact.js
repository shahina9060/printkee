// src/components/ContactSection.jsx
import React from 'react';
import '../styles/contact.css'; // We will create this CSS file later
import Header from '../components/Header';

const ContactSection = () => {
return (
    <section id="contact" className="contact-section">
        <Header name="Contact Us" />
        <p>Get in touch to discuss your promotional needs.</p>
        <p>F90/1, BESIDE ESIC HOSPITAL, OKHLA INDUSTRIAL AREA PHASE 1, New Delhi - 110020, India</p>
    </section>
);
}

export default ContactSection;
