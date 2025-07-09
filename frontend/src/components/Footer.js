import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/technology-accessories">Technology & Accessories</Link></li>
            <li><Link to="/eating-drinking">Drink Ware</Link></li>
            <li><Link to="/bags-travel">Bags & Travel</Link></li>
            <li><Link to="/apparel-accessories">Apparel & Accessories</Link></li>
            <li><Link to="/office-stationary">Office & Stationary</Link></li>
            <li><Link to="/eco-products">Eco Products</Link></li>
            <li><Link to="/trophy-momento">Trophy & Momento</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/print-wear">Print & Wear</Link></li>
            <li><Link to="/premiums-tools">Premiums & Tools</Link></li>
            <li><Link to="/usb-memory-sticks">USB Memory Sticks</Link></li>
            <li><Link to="/gift-and-promotions-dubai">Gift and Promotions</Link></li>
            <li><Link to="/give-away-items-in-dubai">Give Away Items</Link></li>
            <li><Link to="/luxury-gifts-supplier-dubai">Luxury Gifts Supplier</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/AboutSection">About</Link></li>
            <li><Link to="/ServicesSection">Services</Link></li>
            <li><Link to="/">Brands</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>Copyright © Corporate Gifts n Promotion. All Rights Reserved</p>
        <div className="social-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/facebook.jpg" alt="Facebook" />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/twitter.jpg" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/instagram.jpg" alt="Instagram" />
          </a>
          <a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/google.jpg" alt="Google" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;