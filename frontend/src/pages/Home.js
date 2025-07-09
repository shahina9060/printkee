import { useEffect } from "react";
import AboutSection from "../components/AboutSection";
// import CategorySection from "../components/Categories";
import ImageSlider from "../components/ImageSlider";
// import Categories from "../components/Categories";
import Categories from "./Categories";
import ServicesSection from "../components/ServicesSection";
// import Contact from "./Contact";
import AOS from "aos";
import "aos/dist/aos.css";
// import { useParams } from "react-router-dom";
// import PopularProducts from "../components/PopularProducts";

function Home() {
  
  useEffect(() => { 
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Runs the animation once per page visit
      offset: 100, // Trigger animation 100px before section enters viewport
    });
  }, []);
  return (

    <>
    <ImageSlider />
    {/* <CategorySection/> */}
    <Categories/>
    {/* <PopularProducts/> */}
    <ServicesSection/>
    <AboutSection/>
    
    
    {/* <Contact/> */}
  
    </>
    
  );
 
}

export default Home;
