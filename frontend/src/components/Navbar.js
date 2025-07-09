import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Import CSS

function Navbar() {
  // const [openDropdown, setOpenDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [hover, setHover] = useState(false);

  // Toggle main dropdowns on click
  // const toggleDropdown = (menu) => {
  //   setOpenDropdown(openDropdown === menu ? null : menu);
  // };
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMenuOnClick = () => {
    setMenuOpen((prevState) => !prevState); // toggle the state safely
  };

  return (
    <header className="header">
      {/* <div className="logo-and-tagline">
                <div className="logo"><img src="/assets/logo.png" alt="Logo" /></div>
                <span>"MF Global Services"
                    <br />
                    <span className='tagline'>We only deal in corporate</span>
                </span>
            </div> */}

      <button className="hamburger" onClick={toggleMenu}>
        {menuOpen ? "✖" : "☰"}
      </button>

      <nav className={`nav-container ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/AboutSection" onClick={toggleMenu}>Who we are</Link>
          </li>

          {/* Products Dropdown */}
          <li className="dropdown">
            {/* <Link to="" onMouseEnter={() => toggleDropdown("products")}> */}
            <Link to="" onMouseEnter={toggleDropdown}>
              Products +
            </Link>
            {/* {openDropdown === "products" && ( */}
            {openDropdown && (
              <ul className="dropdown-menu">
                <li className="sub-dropdown">
                  <Link to="/categories/Apparel%20and%20Accessories">
                    Apparel and Accessories &gt;
                  </Link>
                  <ul className="sub-dropdown-menu" onClick={toggleMenuOnClick}>
                    <li>
                      <Link to="/categories/Apparel%20and%20Accessories/T-Shirts">
                        T-Shirts
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Apparel%20and%20Accessories/Caps%20and%20Hats">
                        Caps
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Apparel%20and%20Accessories/Corporate%20Shirts">
                        Corporate Shirt
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Apparel%20and%20Accessories/Ties">
                        Ties
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Apparel%20and%20Accessories/Aprons">
                        Apron
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Apparel%20and%20Accessories/Winter%20Wear">
                        Winter Wear
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sub-dropdown">
                  <Link to="/categories/Eco-Products" className="sub-dropbtn">
                    Eco-Products &gt;
                  </Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Eco-Products/Bamboo%20Products">
                        Bamboo Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Eco-Products/Customized%20Gifting">
                        Customized Gifting
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sub-dropdown">
                  <Link to="/categories/Bags%20and%20Travel">
                    Bags and Travel &gt;
                  </Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Bags%20and%20Travel/Backpacks">
                        Backpack
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Bags%20and%20Travel/Foldable%20Bags">
                        Foldable Bags
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Bags%20and%20Travel/Duffle%20Bags">
                        Duffle Bags
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Bags%20and%20Travel/Tote%20Bags">
                        Tote Bags
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Bags%20and%20Travel/Accessories">
                        Accessories
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="sub-dropdown">
                  <Link to="/categories/Office%20and%20Writing">
                    Office & Writing &gt;
                  </Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Office%20and%20Writing/File%20and%20Folderr">
                        File and Folder
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Office%20and%20Writing/Notebook%20&%20Diary">
                        Notebook & Diary
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Office%20and%20Writing/Pen%20&%20Writing%20Set">
                        Pen & Writing Set
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Office%20and%20Writing/Lanyard%20&%20ID%20Card">
                        Lanyard & ID Card
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Office%20and%20Writing/Miscellaneous">
                        Miscellaneous
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sub-dropdown">
                  <Link to="/categories/Collection">Collection &gt;</Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Collection/Welcome%20Kits">
                        Welcome Kits
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Collection/Promotional%20Clocks">
                        Promotional Clock
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Collection/Desktop%20and%20Executive%20Gifts">
                        Desktop and Executive Gifts
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Collection/Keychains">
                        Keychain
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Collection/Miscellaneous">
                        Miscellaneous
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sub-dropdown">
                  <Link to="/categories/Technology%20Accessories">
                    Technology Accessories &gt;
                  </Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Technology%20Accessories/Wireless%20Charging">
                        Wireless Charging
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Technology%20Accessories/Computer%20Accessories">
                        Computer Accessories
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Technology%20Accessories/Power%20Bank">
                        Power Bank
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Technology%20Accessories/Speaker">
                        Speaker
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Technology%20Accessories/Desktop%20&%20Mousepad">
                        Desktop and mouse pad
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sub-dropdown">
                  <Link to="/categories/Drink%20Ware">Drink Ware &gt;</Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Drink%20Ware/Sipper">Sipper</Link>
                    </li>
                    <li>
                      <Link to="/categories/Drink%20Ware/Bamboo%20Bottle">
                        Bamboo Bottle
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Drink%20Ware/Coffee%20Mug">
                        Coffee Mug
                      </Link>
                    </li>
                    <li>
                      <Link to="/categories/Drink%20Ware/Ceramic%20Mug">
                        Ceramic Mug
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sub-dropdown">
                  <Link to="/categories/Trophy%20and%20Momento">
                    Trophy and Momento &gt;
                  </Link>
                  <ul className="sub-dropdown-menu">
                    <li>
                      <Link to="/categories/Trophy%20and%20Momento/Trophy%20and%20Momento">
                        Trophy and Momento
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/ServicesSection" onClick={toggleMenu}>Services</Link>
          </li>
          <li>
            <Link to="" onClick={toggleMenu}>Brands</Link>
          </li>
          {/* <li>
            <Link to="/categories">Categories</Link>
          </li> */}
          <li>
            <Link to="/categories/Office%20and%20Writing" onClick={toggleMenu}>
              Office Stationery
            </Link>
          </li>
          {/* <li>
            <Link to="/Contact">Contact Us</Link>
          </li> */}
          {/* <li>
            <Link
              to="/"
              style={{
                background: hover ? "#654cf3" : "gray",
                color: hover ? "#eca60e" : "white",
                borderRadius: "4px",
                padding: "10px 15px",
                textDecoration: "none",
                display: "inline-block",
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Login/SignUp
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
