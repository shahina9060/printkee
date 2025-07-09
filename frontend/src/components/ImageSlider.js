import React, { useState, useEffect } from "react";
import "../styles/ImageSlider.css"; // Import CSS for styling
import axios from "axios";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";

// import { homeSliderImages } from "../Data/data";

const ImageSlider = () => {
  const [homeSliderImages, setHomeSliderImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

 // Fetch the images from the backend when the component loads
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${backendEndApi}/banner`);
        const homeSliderImages = response.data.homeSliderImages;
        setHomeSliderImages(homeSliderImages); // Save the image paths

        console.log("response of imageSlider", response);
        console.log("Fetched Images:", homeSliderImages);
        console.log("response of homeSliderImages", homeSliderImages);
        
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(); 
  }, []);

  // Automatically change images every 5 seconds
  useEffect(() => {
    if (homeSliderImages.length === 0) return; // Don't start interval if no images

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % homeSliderImages.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []); // Run this effect whenever homeSliderImages changes

  return (
    <div className="slider">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {homeSliderImages.map((image, index) => (
        
          <img
            key={index}
            // src={`http://localhost:5050${image.imageUrl}`} // Ensure to construct full path
            src ={`${backendEndApiBannerUpload}${image.imageUrl}`}
            // src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
   
        className=" button-arrow prev"
        onClick={() =>
          setCurrentIndex(
            (currentIndex - 1 + homeSliderImages.length) % homeSliderImages.length
          )
        }
      >
        ❮
      </button>
      <button
        className="button-arrow next"
        onClick={() =>
          setCurrentIndex((currentIndex + 1) % homeSliderImages.length)
        }
      >
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
