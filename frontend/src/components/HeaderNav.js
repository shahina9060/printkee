import React, { useState } from 'react';
import { Route , Routes } from 'react-router-dom';
import '../styles/HeaderNav.css'; 
import { CiMail } from "react-icons/ci";
// import { FaSearch } from "react-icons/fa";
import SearchBox from './SearchBox';

const HeaderNav = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const toggleSearch = ()=>{
    setIsSearchVisible(prevSearch => !prevSearch)
  }
  return (
    <>
      <header id="masthead" className="site-header" role="banner">  
        <div className="home-link">
          <div className="logo">
            <a href="/">
              <img 
                src="/assets/printkeeLogo.png" 
                alt="MFG Corporate" 
              />
              {/* <span>Printkee</span> */}
             
            </a>
          </div>
          {/* <div className='search-icon' onClick={toggleSearch} style={{marginLeft:'10px',width:"100px",marginTop:"19px",marginRight:'5px'}}>
            <FaSearch size={24} style={{ float:"right"}}/>
          </div>
            <div className={`header-search ${isSearchVisible ?'active':''}`}>
              <form role="search" method="get" className="search-form">
                <input 
                  type="search" 
                  className="search-field" 
                  placeholder="Search …" 
                  name="s"
                />
                <input type="submit" className="search-submit" value="Search" />
              </form>
            </div> */}

         <SearchBox />

          <div className='search-icon' onClick={toggleSearch} style={{marginTop:'19px'}}>
            <a href="mailto:sales@mfglobalservices.com" style={{textDecoration:'non', color:"white", marginLeft:'0px', marginTop:0, padding:0}}>
              <CiMail size={30} style={{background:"transparent", border:"none",marginRight:'50px'}}/></a>
          </div>
          <div className="top-right-side">
            <aside id="custom_html-3" className="widget_text widget widget_custom_html">
              <div className="textwidget custom-html-widget">
                <div className="desk" >
                  <a href="mailto:sales@mfglobalservices.com" style={{display: "flex",flexDirection:"row", justifyContent:"space-between", gap:'10px'}}>
                    <CiMail size={30} style={{ color: "black", backgroundColor: "transparent", borderRadius: '6px', color:"black" }} />
                    <span style={{ marginRight: '40px', color:"black" ,size: '22px'}}> sales@mfglobalservices.com</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>
   
 </>

  );
}

export default HeaderNav;
