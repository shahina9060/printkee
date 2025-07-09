import React, { useEffect, useState } from "react";
import "../styles/canvascomponent.css";
import { useParams } from "react-router-dom";
// import { useRef } from "react";
import { Rnd } from "react-rnd";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import AddText from "./AddText";
import PopupForm from "../components/PopupForm";

const TshirtCanvas = () => {
  const { productId } = useParams();
  console.log("product id of tshirtcanvas", productId);
  //   const decodedImageUrl = decodeURIComponent(imageUrl);
  const [text, setText] = useState([]);
  const [textSize, setTextSize] = useState({ width: 200, height: 50 });
  const [selectedImage, setSelectedImage] = useState([]);
  const [logo, setLogo] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(false);
  const [selectedText, setSelectedText] = useState(false);
  const [fileName, setFileName] = useState();
  const [showPopup, setShowPopup] = useState(false)
  const [showText, setShowText] = useState(false);

  const saveText = (newText) => {
    setText((prev) => [...prev, newText]);
  };
  console.log("text", text);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${backendEndApi}/products/side-images/${productId}`
        );
        setSelectedImage(res.data.imageUrl);
        console.log("res", res);
      } catch (error) {}
    };
    fetchImages();
  }, []);

  const [input, setInput] = useState({
    crown: "",
    sandwich: "",
    peak: "",
    topbutton: "",
    crownColor: "",
    sandwichColor: "",
    peakColor: "",
    topbuttonColor: "",
    fabricType: "",
    printType: "",
  });

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
  useEffect(() => {
    const total = Object.values(quantities).reduce(
      (acc, val) => acc + Number(val),
      0
    );
    setTotalQuantity(total);
  }, [quantities]);

  const [selectedPart, setSelectedPart] = useState("Base Colour");
  const [selectedColors, setSelectedColors] = useState({
    crown: "",
    peak: "",
    sandwich: "",
    topButton: "",
  });

  const [size, setSize] = useState({ width: 150, height: 150 });

  const handleSelectedPart = (part) => {
    setSelectedPart(part);
  };

  const handleColorSelect = (color) => {
    switch (selectedPart) {
      case "Crown":
        setSelectedColors((prev) => ({ ...prev, crown: colorsCrown[color] }));
        break;
      case "Peak":
        setSelectedColors((prev) => ({ ...prev, peak: colorsPeak[color] }));
        break;
      case "Sandwich":
        setSelectedColors((prev) => ({
          ...prev,
          sandwich: colorsSandwich[color],
        }));
        break;
      case "Top Button":
        setSelectedColors((prev) => ({
          ...prev,
          topButton: colorsTopButton[color],
        }));
        break;
      default:
        break;
    }
  };

  console.log("selectedPart", selectedPart);

  const parts = [
    { id: 1, name: "Base Colour", color: "" },
    { id: 22, name: "Crown", color: "#f06810" },
    { id: 23, name: "Peak", color: "#FFFFE0" },
    { id: 24, name: "Sandwich", color: "#ffc300" },
    { id: 25, name: "Top Button", color: "#654321" },
  ];

  const handleSelectedLogo = () => {
    setSelectedLogo(!selectedLogo);
  };

  const handleSelectedText = () => {
    setSelectedText(!selectedText);
  };
  const handleDeselectLogo = (e) => {
    setSelectedLogo(false);
    setSelectedText(false)
  };

  // const nodeRef = useRef(null);
  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
      setFileName(file.name);
    }
  };
  const colors = [
    "#00FFFF",
    "#F4C2C2",
    "#000000",
    "#654321",
    "#800020",
    "#D2042D",
    "#FFA700",
    "#228B22",
    "#FF475A",
    "#009A44",
    "#FFFFE0",
    "#000080",
    "#556B2F",
    "#808000",
    "#FFA500",
    "#2E8B57",
    "#800080",
    "#FF0000",
    "#4169E1",
    "#87CEEB",
    "#F28500",
    "#008080",
    "#FFFFFF",
  ];
  const colorsCrown = {
    "#00FFFF": "/assets/capimagecolor/crown/aqua blue.png",
    "#F4C2C2": "/assets/capimagecolor/crown/baby pink.png",
    "#000000": "/assets/capimagecolor/crown/black.png",
    "#654321": "/assets/capimagecolor/crown/brown.png",
    "#800020": "/assets/capimagecolor/crown/burgundy.png",
    "#D2042D": "/assets/capimagecolor/crown/cherry red.png",
    "#FFA700": "/assets/capimagecolor/crown/chrome yellow.png",
    "#228B22": "/assets/capimagecolor/crown/forest.png",
    "#FF475A": "/assets/capimagecolor/crown/heliconia.png",
    "#009A44": "/assets/capimagecolor/crown/irish.png",
    "#FFFFE0": "/assets/capimagecolor/crown/light yellow.png",
    "#000080": "/assets/capimagecolor/crown/navy blue.png",
    "#556B2F": "/assets/capimagecolor/crown/olive green.png",
    "#808000": "/assets/capimagecolor/crown/olive.png",
    "#FFA500": "/assets/capimagecolor/crown/orange.png",
    "#2E8B57": "/assets/capimagecolor/crown/parrot green.png",
    "#800080": "/assets/capimagecolor/crown/purple.png",
    "#FF0000": "/assets/capimagecolor/crown/red.png",
    "#4169E1": "/assets/capimagecolor/crown/royal blue.png",
    "#87CEEB": "/assets/capimagecolor/crown/sky blue.png",
    "#F28500": "/assets/capimagecolor/crown/tangerine.png",
    "#008080": "/assets/capimagecolor/crown/teal green.png",
    "#FFFFFF": "/assets/capimagecolor/crown/white.png",
  };

  const colorsPeak = {
    "#00FFFF": "/assets/capimagecolor/peak/aqua blue.png",
    "#F4C2C2": "/assets/capimagecolor/peak/baby pink.png",
    "#000000": "/assets/capimagecolor/peak/black.png",
    "#654321": "/assets/capimagecolor/peak/brown.png",
    "#800020": "/assets/capimagecolor/peak/burgundy.png",
    "#D2042D": "/assets/capimagecolor/peak/cherry red.png",
    "#FFA700": "/assets/capimagecolor/peak/chrome yellow.png",
    "#228B22": "/assets/capimagecolor/peak/forest.png",
    "#FF475A": "/assets/capimagecolor/peak/heliconia.png",
    "#009A44": "/assets/capimagecolor/peak/irish.png",
    "#FFFFE0": "/assets/capimagecolor/peak/light yellow.png",
    "#000080": "/assets/capimagecolor/peak/navy blue.png",
    "#556B2F": "/assets/capimagecolor/peak/olive green.png",
    "#808000": "/capimagecolor/peak/olive.png",
    "#FFA500": "/assets/capimagecolor/peak/orange.png",
    "#2E8B57": "/assets/capimagecolor/peak/parrot green.png",
    "#800080": "/assets/capimagecolor/peak/purple.png",
    "#FF0000": "/assets/capimagecolor/peak/red.png",
    "#4169E1": "/assets/capimagecolor/peak/royal blue.png",
    "#87CEEB": "/assets/capimagecolor/peak/sky blue.png",
    "#F28500": "/assets/capimagecolor/peak/tangerine.png",
    "#008080": "/assets/capimagecolor/peak/teal green.png",
    "#FFFFFF": "/assets/capimagecolor/peak/white.png",
  };

  const colorsSandwich = {
    "#00FFFF": "/assets/capimagecolor/sandwich/aqua blue.png",
    "#F4C2C2": "/assets/capimagecolor/sandwich/baby pink.png",
    "#000000": "/assets/capimagecolor/sandwich/black.png",
    "#654321": "/assets/capimagecolor/sandwich/brown.png",
    "#800020": "/assets/capimagecolor/sandwich/burgundy.png",
    "#D2042D": "/assets/capimagecolor/sandwich/cherry red.png",
    "#FFA700": "/assets/capimagecolor/sandwich/chrome yellow.png",
    "#228B22": "/assets/capimagecolor/sandwich/forest.png",
    "#FF475A": "/assets/capimagecolor/sandwich/heliconia.png",
    "#009A44": "/assets/capimagecolor/sandwich/irish.png",
    "#FFFFE0": "/assets/capimagecolor/sandwich/light yellow.png",
    "#000080": "/assets/capimagecolor/sandwich/navy blue.png",
    "#556B2F": "/assets/capimagecolor/sandwich/olive green.png",
    "#808000": "/assets/capimagecolor/sandwich/olive.png",
    "#FFA500": "/assets/capimagecolor/sandwich/orange.png",
    "#2E8B57": "/assets/capimagecolor/sandwich/parrot green.png",
    "#800080": "/assets/capimagecolor/sandwich/purple.png",
    "#FF0000": "/assets/capimagecolor/sandwich/red.png",
    "#4169E1": "/assets/capimagecolor/sandwich/royal blue.png",
    "#87CEEB": "/assets/capimagecolor/sandwich/sky blue.png",
    "#F28500": "/assets/capimagecolor/sandwich/tangerine.png",
    "#008080": "/assets/capimagecolor/sandwich/teal green.png",
    "#FFFFFF": "/assets/capimagecolor/sandwich/white.png",
  };
  const colorsTopButton = {
    "#00FFFF": "/assets/capimagecolor/topbutton/aqua blue.png",
    "#F4C2C2": "/assets/capimagecolor/topbutton/baby pink.png",
    "#000000": "/assets/capimagecolor/topbutton/black.png",
    "#654321": "/assets/capimagecolor/topbutton/brown.png",
    "#800020": "/assets/capimagecolor/topbutton/burgundy.png",
    "#D2042D": "/assets/capimagecolor/topbutton/cherry red.png",
    "#FFA700": "/assets/capimagecolor/topbutton/chrome yellow.png",
    "#228B22": "/assets/capimagecolor/topbutton/forest.png",
    "#FF475A": "/assets/capimagecolor/topbutton/heliconia.png",
    "#009A44": "/assets/capimagecolor/topbutton/irish.png",
    "#FFFFE0": "/assets/capimagecolor/topbutton/light yellow.png",
    "#000080": "/assets/capimagecolor/topbutton/navy blue.png",
    "#556B2F": "/assets/capimagecolor/topbutton/olive green.png",
    "#808000": "/assets/capimagecolor/topbutton/olive.png",
    "#FFA500": "/assets/capimagecolor/topbutton/orange.png",
    "#2E8B57": "/assets/capimagecolor/topbutton/parrot green.png",
    "#800080": "/assets/capimagecolor/topbutton/purple.png",
    "#FF0000": "/assets/capimagecolor/topbutton/red.png",
    "#4169E1": "/assets/capimagecolor/topbutton/royal blue.png",
    "#87CEEB": "/assets/capimagecolor/topbutton/sky blue.png",
    "#F28500": "/assets/capimagecolor/topbutton/tangerine.png",
    "#008080": "/assets/capimagecolor/topbutton/teal green.png",
    "#FFFFFF": "/assets/capimagecolor/topbutton/white.png",
  };

  const handleQuantityChange = (size, value) => {
    if (/^\d*$/.test(value)) {
      setQuantities({
        ...quantities,
        [size]: value === "" ? 0 : Number(value),
      });
    }
  };

  const handleSubmit = async() => {
      // input.quantity < 50 && alert("minimum quantity should be 50");
  
      // const proData = {...input, logo}
      //  try {
      //       const response = await fetch(`${backendEndApi}/send-productemail`, {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify(proData),
      //       });
            
      //       const data = await response.json();
      //       console.log("email data:",data)
      //       if (data.success) alert("Data submitted & send on email successfully");
      //       else alert("fail to submit or send mail");
      
      //     } catch (error) {
      //       console.error("Error:", error);
      //       alert("Something went wrong...");
      //     }
  
      // console.log("input data", input);
  
      // setInput({
      //   crown: "",
      //   sandwich: "",
      //   peak: "",
      //   topbutton: "",
      //   crownColor: "",
      //   sandwichColor: "",
      //   peakColor: "",
      //   topbuttonColor: "",
      //   fabricType: "",
      //   printType: "",
      //   quantity: 0,
      //   logo: "",
      // });
  };
   

  const handleWhatsAppClick = () => {
    const phoneNumber = "+918750708222";
    const message = "Hello! I'd like to connect.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleCompanySubmit = (companydata)=>{
    // const finalData = {
    //   ...productData,
    //   ...companyData,
    // };

    // try {
    //   const res = await axios.post('/api/custom-products', finalData);
    //   console.log('Saved:', res.data);
    //   alert('Product submitted successfully!');
    // } catch (err) {
    //   console.error('Submit error:', err);
    //   alert('Failed to submit.');
    // }
    alert("hello companyyyyyyyyyyyy")
  }
  return (
    <>
      <div className="section">
        {/* <div className="image-section">
        <div className="links">
          {imagelist.map((itemlist, index) => (
            <a key={index}>
              <img src={itemlist} />
            </a>
          ))}
        </div>
       </div> */}
        <div className="canvas-container" onClick={handleDeselectLogo}>
          <div className="canvasDIV" id="canvas_front" name="canvas_front">
            <img
              id="imgBg"
              className="js-product-parts base-image"
              // src="https://src1.ilogo.in/new_upload/2025/1303/174184819817269178688554/1741848270//front/bg.png?1741848272105"
              // src={imageUrl}
              src={`${backendEndApiBannerUpload}${selectedImage[0]}`}
              alt="Base"
            />
            {selectedColors.crown && (
              <img
                id="imgCrown"
                className="js-product-parts"
                src={selectedColors.crown}
                alt="Crown"
              />
            )}
            {selectedColors.peak && (
              <img
                id="imgPeak"
                className="js-product-parts"
                // src="/capimagecolor/peak/auqa blue.png"
                src={selectedColors.peak}
                alt="Peak"
              />
            )}
            {selectedColors.sandwich && (
              <img
                id="imgSandwich"
                className="js-product-parts"
                // src="/capimagecolor/sandwich/aqua blue.png"
                src={selectedColors.sandwich}
                alt="Sandwich"
              />
            )}
            {selectedColors.topButton && (
              <img
                id="imgTopbutton"
                className="js-product-parts"
                // src="/capimagecolor/topbutton/aqua blue.png"
                src={selectedColors.topButton}
                alt="Top Button"
              />
            )}
          </div>
        </div>
        <div className="customization-section">
          <h2>Customization</h2>

          <div className="part-container">
            <div>
              <span>Select parts to change color</span>
              <span style={{ color: "red", float: "right" }}>
                [Min Quantity: 50]
              </span>
            </div>{" "}
            <hr />
            <div className="parts-list">
              {parts.map((part) => (
                <button
                  onClick={() => handleSelectedPart(part.name)}
                  key={part.id}
                  className={selectedPart === part.name ? "selected" : ""}
                >
                  <span>{part.name}</span>
                  <span style={{ backgroundColor: part.color }}></span>
                </button>
              ))}
            </div>
          </div>
          {selectedPart === "Base Colour" ? (
            <div className="color-container">
              <h4>Select a color</h4> <hr />
              <div className="colors-list">
                {colors.map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {selectedPart === "Crown" ? (
            <div className="color-container">
              <h4>Select a color</h4> <hr />
              <div className="colors-list">
                {Object.keys(colorsCrown).map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      handleColorSelect(color);
                      setInput((prev) => ({
                        ...prev,
                        [selectedPart.toLowerCase().replace(" ", "")]:
                          selectedPart,
                        [`${selectedPart.toLowerCase().replace(" ", "")}Color`]:
                          color,
                      }));
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {selectedPart === "Peak" ? (
            <div className="color-container">
              <h4>Select a color</h4> <hr />
              <div className="colors-list">
                {Object.keys(colorsPeak).map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      handleColorSelect(color);
                      setInput((prev) => ({
                        ...prev,
                        [selectedPart.toLowerCase().replace(" ", "")]:
                          selectedPart,
                        [`${selectedPart.toLowerCase().replace(" ", "")}Color`]:
                          color,
                      }));
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {selectedPart === "Sandwich" ? (
            <div className="color-container">
              <h4>Select a color</h4> <hr />
              <div className="colors-list">
                {Object.keys(colorsSandwich).map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      handleColorSelect(color);
                      setInput((prev) => ({
                        ...prev,
                        [selectedPart.toLowerCase().replace(" ", "")]:
                          selectedPart,
                        [`${selectedPart.toLowerCase().replace(" ", "")}Color`]:
                          color,
                      }));
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {selectedPart === "Top Button" ? (
            <div className="color-container">
              <h4>Select a color</h4> <hr />
              <div className="colors-list">
                {Object.keys(colorsTopButton).map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      handleColorSelect(color);
                      setInput((prev) => ({
                        ...prev,
                        [selectedPart.toLowerCase().replace(" ", "")]:
                          selectedPart,
                        [`${selectedPart.toLowerCase().replace(" ", "")}Color`]:
                          color,
                      }));
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          {/* ------------------------ */}
          <div className="logo-size-container">
            <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleLogoUpload}
                style={{ display: "none" }} // Hide default input
                value={input.logo}
              />
              <label htmlFor="fileInput" className="custom-file-label">
                {logo ? fileName : "Choose Logo"}
              </label>
              {/* ADD TEXT BUTTON */}
              <button
                style={{
                  width: "80px",
                  height: "40px",
                  marginTop: "25px",
                  borderRadius: "4px",
                }}
                onClick={() => setShowText(true)}
              >
                Add Text
              </button>
            </div>

            {/* Size Selection */}
            <div className="size-container">
              <div className="size-lists">
                {Object.keys(quantities).map((size) => (
                  <div className="size-items" key={size}>
                    <label>{size}</label>
                    <input
                      type="text"
                      min="0"
                      value={quantities[size]}
                      onChange={(e) =>
                        handleQuantityChange(size, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ---------------- */}

          <div className="custom-info-div">
            <span>
              <label>Total Quantites</label>
              <input
                type="text"
                placeholder="please enter quantity"
                name="quantity"
                className="textTotal"
                value={totalQuantity}
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, quantity: e.target.value }));
                }}
                readOnly
              />
            </span>
            <span>
              <label name="fabricType">Fabric Type</label>
              <select
                value={input.fabricType}
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, fabricType: e.target.value }));
                }}
                className="selectCustome"
              >
                <option value=""></option>
                <option value="cotton">cotton</option>
                <option value="polyster">polyster</option>
                <option value="mixed">mixed</option>
              </select>
            </span>
            <span>
              <label name="printType">Print Type</label>
              <select
                value={input.printType}
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, printType: e.target.value }));
                }}
                className="selectCustome"
              >
                <option to=""></option>
                <option to="screen print">screen print</option>
                <option to="degital print">degital print</option>
                <option to="embedded print">embedded print</option>
              </select>
            </span>
          </div>

          {/* -------------------- */}
          <div className="submit-whatsapp-div">
            <div>
              <button
                type="button"
                className="submit-cust-btn"
                onClick={handleOpenPopup}
              >
                Submit
              </button>
            </div>
            <div className="whatsapp-div" onClick={handleWhatsAppClick}>
              <span>
                <FaWhatsapp size={25} />
              </span>
              <span>
                Share design on whatsApp
                <p>Get design support to place your order</p>
              </span>
            </div>
          </div>
        </div>

        {logo && (
          <Rnd
            size={{ width: size.width, height: size.height }}
            onResizeStop={(e, direction, ref) => {
              setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
            }}
            bounds="parent"
            enableResizing={{
              right: true,
              bottom: true,
              bottomRight: true,
            }}
            style={{
              border: selectedLogo ? "2px dashed gray" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
            }}
            onClick={handleSelectedLogo}
          >
            {/* Logo */}
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Rnd>
        )}
        {/* Render Text if "Add Text" was clicked */}
        {/* Button next to logo */}

        {text && (
          <Rnd
          size={{ width: textSize.width, height: textSize.height }}
            onResizeStop={(e, direction, ref) => {
              setTextSize({ width: ref.offsetWidth, height: ref.offsetHeight });
            }}
            bounds="parent"
            enableResizing={{
              right: true,
              bottom: true,
              bottomRight: true,
            }}
            style={{
              border: selectedText ? "2px dashed gray" : "none", // ✅ use selectedText here
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
            }}
            onClick={handleSelectedText}
          >
            {text.map((t, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  // width: "100%", height: "100%",
                  objectFit: "contain",
                  color: t.color,
                  fontFamily: t.font,
                  fontSize: t.size || 20,
                }}
              >
                {t.content} {/* ✅ Just the string, not the whole object */}
              </div>
            ))}
          </Rnd>
        )}
        {showText && (
          <AddText onClose={() => setShowText(false)} saveText={saveText} />
        )}
      </div>{" "}
      <hr className="hr" />

      {showPopup && <PopupForm onClose={()=>setShowPopup(false)} onSubmit={handleCompanySubmit}/>}
      <table>
        <thead>
          <tr>
            <th>Fabric Type</th>
            <th>Logo</th>
            <th>Face</th>
            <th>Print Type</th>
            <th>Selected Color</th>
            <th>Text</th>
            <th>Font</th>
            <th>Text Color</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Merge Fabric Type column across 4 rows */}
            <td rowSpan={4}>{input.fabricType}</td>

            {/* Merge Logo column across 4 rows */}
            {logo ? (
              <td rowSpan={4}>
                <img
                  src={logo}
                  style={{ width: "100px", height: "100px", border: "none" }}
                />
              </td>
            ) : (
              <td rowSpan={4}></td>
            )}

            <td>{input.crown}</td>
            <td>{input.printType}</td>
            <td>
              <button
                style={{
                  backgroundColor: input.crownColor,
                  width: "30px",
                  height: "30px",
                  border: "none",
                  borderRadius: "50%",
                }}
              ></button>
            </td>
            {/* <td>{text[0]}</td> */}
            {
              text.map((t,index)=>(
                <>
                <td rowSpan={4}>{t.content}</td>
                <td rowSpan={4}>{t.font}</td>
                <td rowSpan={4}>{t.color}</td>
                </>
              ))
            }
          </tr>
          <tr>
            <td>{input.sandwich}</td>
            <td>{input.printType}</td>
            <td>
              <button
                style={{
                  backgroundColor: input.sandwichColor,
                  width: "30px",
                  height: "30px",
                  border: "none",
                  borderRadius: "50%",
                }}
              ></button>
            </td>
          </tr>
          <tr>
            <td>{input.topbutton}</td>
            <td>{input.printType}</td>
            <td>
              <button
                style={{
                  backgroundColor: input.topbuttonColor,
                  width: "30px",
                  height: "30px",
                  border: "none",
                  borderRadius: "50%",
                }}
              ></button>
            </td>
          </tr>
          <tr>
            <td>{input.peak}</td>
            <td>{input.printType}</td>
            <td>
              <button
                style={{
                  backgroundColor: input.peakColor,
                  width: "30px",
                  height: "30px",
                  border: "none",
                  borderRadius: "50%",
                }}
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TshirtCanvas;
