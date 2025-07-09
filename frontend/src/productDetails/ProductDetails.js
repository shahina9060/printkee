import React, { useState, useEffect, useRef } from "react";
import "../styles/ProductDetails.css";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { imageUrl } = useParams();
  // console.log("imageUrl", imageUrl);
  const decodedImageUrl = decodeURIComponent(imageUrl);

  const baseName = decodedImageUrl.replace(".jpg", "");
  const imagelist = [
    `${baseName}.jpg`,
    `${baseName}-side.jpg`,
    `${baseName}-back-side.jpg`,
  ];

  const [selectedColor, setSelectedColor] = useState(null);
  const [colorApplied, setColorApplied] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imagelist[0]);

  const canvasRef = useRef(null);
  const thumbnailRefs = useRef([]);

  const [quantities, setQuantities] = useState({
    xs: 0,
    s: 0,
    m: 2,
    l: 1,
    xl: 2,
    xxl: 0,
    xxxl: 0,
  });

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [fabricType, setFabricType] = useState("");
  const [printType, setPrintType] = useState("");

  useEffect(() => {
    const total = Object.values(quantities).reduce(
      (acc, val) => acc + Number(val),
      0
    );
    setTotalQuantity(total);
  }, [quantities]);

  const handleQuantityChange = (size, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities({
        ...quantities,
        [size]: value === "" ? 0 : Number(value),
      });
    }
  };

  const handleSubmit = () => {
   const formdata = {
      selectedColor,
      selectedImage,
      fabricType,
      printType,
      quantities,
      totalQuantity,
   };
    console.log("formdata",formdata);
  };
  const colorMap = {
    "#1c203b": [28, 32, 59],
    "#721e38": [114, 30, 56],
    "#a6a7a2": [166, 167, 162],
    "#cc0607": [204, 6, 7],
    "#000000": [0, 0, 0],
  };

  const applyColorFilter = (imageSrc, canvas, width, height) => {
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (!colorApplied || !selectedColor) return;

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imageData.data;
      let targetColor = colorMap[selectedColor];

      let sumR = 0,
        sumG = 0,
        sumB = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i],
          g = data[i + 1],
          b = data[i + 2];

        if (r < 220 && g < 220 && b < 220 && !(r > 180 && g > 140 && b > 120)) {
          sumR += r;
          sumG += g;
          sumB += b;
          count++;
        }
      }

      let avgR = sumR / count,
        avgG = sumG / count,
        avgB = sumB / count;

      let tshirtColorRange = {
        rMin: avgR - 50,
        rMax: avgR + 50,
        gMin: avgG - 50,
        gMax: avgG + 50,
        bMin: avgB - 50,
        bMax: avgB + 50,
      };

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i],
          g = data[i + 1],
          b = data[i + 2];

        if (
          r >= tshirtColorRange.rMin &&
          r <= tshirtColorRange.rMax &&
          g >= tshirtColorRange.gMin &&
          g <= tshirtColorRange.gMax &&
          b >= tshirtColorRange.bMin &&
          b <= tshirtColorRange.bMax
        ) {
          let luminance = (r * 0.3 + g * 0.59 + b * 0.11) / 255;
          data[i] = targetColor[0] * (0.6 + luminance * 0.4);
          data[i + 1] = targetColor[1] * (0.6 + luminance * 0.4);
          data[i + 2] = targetColor[2] * (0.6 + luminance * 0.4);
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = selectedImage;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      canvas.width = 280;
      canvas.height = 280;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (colorApplied && selectedColor) {
        applyColorFilter(selectedImage, canvas, 280, 280);
      }
    };

    thumbnailRefs.current.forEach((thumbnailCanvas, index) => {
      if (!thumbnailCanvas) return;
      const thumbnailCtx = thumbnailCanvas.getContext("2d");
      const thumbImg = new Image();
      thumbImg.src = imagelist[index];
      thumbImg.crossOrigin = "Anonymous";

      thumbImg.onload = () => {
        thumbnailCanvas.width = 60;
        thumbnailCanvas.height = 60;
        thumbnailCtx.drawImage(
          thumbImg,
          0,
          0,
          thumbnailCanvas.width,
          thumbnailCanvas.height
        );

        if (colorApplied && selectedColor) {
          applyColorFilter(imagelist[index], thumbnailCanvas, 60, 60);
        }
      };
    });
  }, [selectedColor, selectedImage, colorApplied]);

  return (
    <section className="product-container">
      <div className="image-section">
        <div className="links">
          {imagelist.map((itemlist, index) => (
            <Link
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setSelectedImage(itemlist);
              }}
            >
              <canvas
                ref={(el) => (thumbnailRefs.current[index] = el)}
                className="thumbnail-image"
              />
            </Link>
          ))}
        </div>
        <div className="main-image">
          <canvas ref={canvasRef} className="main-canvas" />
        </div>
      </div>

      <div className="customization-section-color">
        <h2>T-Shirt Design</h2>
        <ul className="color-list">
          {Object.keys(colorMap).map((color) => (
            <li key={color}>
              <button
                type="button"
                className={`color-box ${
                  selectedColor === color ? "active" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(color);
                  setColorApplied(true);
                }}
              >
                {selectedColor === color && <i className="icon-ok"></i>}
              </button>
            </li>
          ))}
        </ul>

        {/* Size Selection */}
        <div className="size-container">
          <div className="size-list">
            {Object.keys(quantities).map((size) => (
              <div className="size-item" key={size}>
                <label>{size}</label>
                <input
                  type="text"
                  min="0"
                  value={quantities[size]}
                  onChange={(e) => handleQuantityChange(size, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <label>Total Quantity</label>
        <input type="text" value={totalQuantity} readOnly />

        <label>Fabric Type</label>
        <select
          value={fabricType}
          onChange={(e) => {
            setFabricType(e.target.value);
          }}
        >
          <option></option>
          <option value='polyster'>polyster</option>
          <option value='mixed'>mixed</option>
          <option value='cotton'>cotton</option>
        </select>

        <label>Print Type</label>
        <select
          value={printType}
          onChange={(e) => {
            setPrintType(e.target.value);
          }}
        >
          <option></option>
          <option value='pdf_formate'>pdf format</option>
          <option value='image'>image</option>
          
        </select>
        <div className="button-section">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button type="button" className="btn btn-secondary">
            Personalize
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
