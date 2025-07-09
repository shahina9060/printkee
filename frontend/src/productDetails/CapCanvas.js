import React, { useEffect, useState } from "react";
// import "../styles/canvascomponent.css";
import "../styles/capCanvas.css";
import { useParams } from "react-router-dom";
import { useRef } from "react";
// import Draggable from "react-draggable";
import { Rnd } from "react-rnd";
import { FaWhatsapp } from "react-icons/fa";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import axios from "axios";
import AddText from "./AddText";
import PopupForm from "../components/PopupForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CapCanvas = () => {
  const { productId } = useParams();
  console.log("product id of cap", productId);
  //   const decodedImageUrl = decodeURIComponent(imageUrl);
  const [text, setText] = useState([]);
  const [textSize, setTextSize] = useState({ width: 80, height: 50 });
  const [selectedImage, setSelectedImage] = useState([]);
  const [logo, setLogo] = useState(null); // for backend upload
  const [logoPreview, setLogoPreview] = useState(null); // for frontend display

  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(false);
  const [selectedText, setSelectedText] = useState(false);
  const [fileName, setFileName] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showText, setShowText] = useState(false);
  const [size, setSize] = useState({ width: 150, height: 90 });
  // const [customPdf, setCustomPdf] = useState(null)
  const [logoRotation, setLogoRotation] = useState(0);
  const [textRotation, setTextRotation] = useState(0); // If you want one rotation for all texts

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const saveText = (newText) => {
    setText((prev) => [...prev, newText]);
    setShowDownloadButton(false);
  };
  console.log("text", text);

  // watermark

  function addWatermark(pdf) {
    // Attempt to set transparency using GState (modern jsPDF)
    let hasGState = true;
    try {
      const gState = pdf.GState && new pdf.GState({ opacity: 0.1 });
      if (gState) {
        pdf.setGState(gState);
      } else {
        hasGState = false;
      }
    } catch (e) {
      hasGState = false;
    }

    // Set watermark style
    pdf.setFontSize(60);
    if (!hasGState) {
      // fallback for older versions: light grey color
      pdf.setTextColor(230);
    } else {
      pdf.setTextColor(0); // black text with reduced opacity
    }

    // Draw watermark text at a rotated angle
    pdf.text("Printkee.com", 80, 140, { angle: 45 });

    // Reset opacity to 1 (fully opaque) if GState was used
    if (hasGState) {
      try {
        pdf.setGState(new pdf.GState({ opacity: 1 }));
      } catch (e) {
        // fallback - ignore
      }
    }
  }

  const handleDownloadPDF = async () => {
    const element = canvasRef.current;

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2, // better quality
      useCORS: true, // load external images
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);

    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", 0, y, pageWidth, imgHeight);
    // ✅ Add watermark after image
    addWatermark(pdf);
    pdf.save("custom-cap.pdf");
  };

  const generatePDFBlob = async () => {
    const element = canvasRef.current;

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", 0, y, pageWidth, imgHeight);

    // ✅ Add watermark after image
    addWatermark(pdf);

    // Get PDF as Blob
    return pdf.output("blob");
  };

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
    base: "",
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
    quantity: "",
  });

  const [selectedPart, setSelectedPart] = useState("Base Colour");
  const [selectedColors, setSelectedColors] = useState({
    base: "",
    crown: "",
    peak: "",
    sandwich: "",
    topbutton: "",
  });

  const handleSelectedPart = (part) => {
    setSelectedPart(part);
  };

  const handleColorSelect = (color) => {
    // const formattedPart = selectedPart.toLowerCase().replace(" ", "");
    // let selectedImagePath;

    const partKeyMap = {
      "Base Colour": "base",
      Crown: "crown",
      Peak: "peak",
      Sandwich: "sandwich",
      "Top Button": "topbutton",
    };

    const formattedPart = partKeyMap[selectedPart];
    let selectedImagePath;

    switch (selectedPart) {
      case "Base Colour":
        selectedImagePath = colors[color];
        break;
      case "Crown":
        selectedImagePath = colorsCrown[color];
        break;
      case "Peak":
        selectedImagePath = colorsPeak[color];
        break;
      case "Sandwich":
        selectedImagePath = colorsSandwich[color];
        break;
      case "Top Button":
        selectedImagePath = colorsTopButton[color];
        break;
      default:
        return;
    }

    setSelectedColors((prev) => ({
      ...prev,
      [formattedPart]: selectedImagePath,
    }));

    setInput((prev) => ({
      ...prev,
      [`${formattedPart}Color`]: color,
    }));
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
    setSelectedText(false);
  };

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
      setFileName(file.name);

      setLogo(file); // store real file
      setLogoPreview(URL.createObjectURL(file)); // store preview URL
      setFileName(file.name); // (if you want file name too)
    }
    setShowDownloadButton(false);
  };

  const colors = {
    "#00FFFF": "/assets/capimagecolor/Base/aqua blue.png",
    "#F4C2C2": "/assets/capimagecolor/Base/baby pink.png",
    "#000000": "/assets/capimagecolor/Base/black.png",
    "#654321": "/assets/capimagecolor/Base/brown.png",
    "#800020": "/assets/capimagecolor/Base/burgundy.png",
    "#D2042D": "/assets/capimagecolor/Base/cherry red.png",
    "#FFA700": "/assets/capimagecolor/Base/chrome yellow.png",
    "#228B22": "/assets/capimagecolor/Base/forest.png",
    "#FF475A": "/assets/capimagecolor/Base/heliconia.png",
    "#009A44": "/assets/capimagecolor/Base/iris.png",
    "#FFFFE0": "/assets/capimagecolor/Base/light yellow.png",
    "#000080": "/assets/capimagecolor/Base/navy blue.png",
    "#556B2F": "/assets/capimagecolor/Base/olive green.png",
    "#808000": "/assets/capimagecolor/Base/olive.png",
    "#FFA500": "/assets/capimagecolor/Base/orange.png",
    "#2E8B57": "/assets/capimagecolor/Base/parrot green.png",
    "#800080": "/assets/capimagecolor/Base/purple.png",
    "#FF0000": "/assets/capimagecolor/Base/red.png",
    "#4169E1": "/assets/capimagecolor/Base/royal blue.png",
    "#87CEEB": "/assets/capimagecolor/Base/sky blue.png",
    "#F28500": "/assets/capimagecolor/Base/tangerine.png",
    "#008080": "/assets/capimagecolor/Base/teal green.png",
    "#FFFFFF": "/assets/capimagecolor/Base/white.png",
  };
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
    "#009A44": "/assets/capimagecolor/peak/iris.png",
    "#FFFFE0": "/assets/capimagecolor/peak/light yellow.png",
    "#000080": "/assets/capimagecolor/peak/navy blue.png",
    "#556B2F": "/assets/capimagecolor/peak/olive green.png",
    "#808000": "/assets/capimagecolor/peak/olive.png",
    "#FFA500": "/assets/capimagecolor/peak/orange.png",
    "#2E8B57": "/assets/capimagecolor/peak/parrot green.png",
    "#800080": "/assets/capimagecolor/peak/purple.png",
    "#FF0000": "/assets/capimagecolor/peak/red.png",
    "#4169E1": "/assets/capimagecolor/peak/royal blue.png",
    "#87CEEB": "/assets/capimagecolor/peak/sky blue.png",
    "#F28500": "/assets/capimagecolor/peak/tangarine.png",
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

  const handleCompanySubmit = async (companydata) => {
    if (input.quantity < 50) {
      alert("minimum quantity should be 50");
      return;
    }
    // Check if file size is within the limit (e.g., 50MB)
    if (logo && logo.size > 50 * 1024 * 1024) {
      alert("File size exceeds 50 MB. Please upload a smaller file.");
      return;
    }

    const finalData = {
      ...input,
      text: JSON.stringify(text),
      ...selectedColors,
      ...companydata,
    };

    const formData = new FormData();

    for (const key in finalData) {
      formData.append(key, finalData[key]);
    }

    if (logo) {
      formData.append("logo", logo);
    }

    if(!logo){
     return alert("logo is required")
    }
    // ✅ Generate PDF and attach it
    const pdfBlob = await generatePDFBlob();
    // formData.append("customPdf", pdfBlob, "custom-cap.pdf");
    // Convert Blob to File for customPdf
    const customPdfFile = new File([pdfBlob], "custom.pdf", {
      type: "application/pdf",
    });
    formData.append("customPdf", customPdfFile);

    try {
      const res = await axios.post(
        `${backendEndApi}/custom-product`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Saved and emailed:", res.data);

      if (res.data.success) {
        alert(
          "Product submitted and email sent successfully!, Now you can download PDF"
        );
        setShowDownloadButton(true);
      } else {
        alert("Failed to submit or send email.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit.");
    } finally {
      setInput({
        base:"",
        // crown: "",
        // sandwich: "",
        // peak: "",
        // topbutton: "",
        // crownColor: "",
        // sandwichColor: "",
        // peakColor: "",
        // topbuttonColor: "",
        fabricType: "",
        printType: "",
        quantity: "",
      });
      // setLogoPreview("");
      // setText([]);
      // fileInputRef.current.value = ""; // ✅ clear the file input visually
      // setSelectedPart("Base Colour");
      // setSelectedColors({
      //   base:"",
      //   crown: "",
      //   peak: "",
      //   sandwich: "",
      //   topbutton: "",
      // });
    }

    // setShowDownloadButton(true)
  };

  return (
    <>
      <div className="section">
        <div ref={canvasRef} id="cap-preview">
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
              {selectedColors.base && (
                <img
                  id="imgBaseColor"
                  className="js-product-parts"
                  src={selectedColors.base}
                  alt="base"
                />
              )}
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
                  src={selectedColors.peak}
                  alt="Peak"
                />
              )}
              {selectedColors.sandwich && (
                <img
                  id="imgSandwich"
                  className="js-product-parts"
                  src={selectedColors.sandwich}
                  alt="Sandwich"
                />
              )}
              {selectedColors.topbutton && (
                <img
                  id="imgTopbutton"
                  className="js-product-parts"
                  src={selectedColors.topbutton}
                  alt="Top Button"
                />
              )}
            </div>
          </div>
          {showText && (
            <AddText onClose={() => setShowText(false)} saveText={saveText} />
          )}
          {logoPreview && (
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
                         transform: `rotate(${logoRotation}deg)`,
                         padding: 0,
                         margin: 0,
                       }}
                       onClick={handleSelectedLogo}
                     >
                       <div
                         style={{ position: "relative", width: "100%", height: "100%" }}
                       >
                         {/* Delete Button Styled Like Your Image */}
                         {selectedLogo && (
                           <>
                             <button
                               onClick={(e) => {
                                 e.stopPropagation(); // Prevent Rnd interaction
                                 setLogo(null);
                                 setLogoPreview(null);
                                 setLogoRotation(0);
                                 setSelectedLogo(false);
                               }}
                               style={{
                                 position: "absolute",
                                 top: "-12px",
                                 left: "-12px",
                                 backgroundColor: "#ff4d4d",
                                 color: "#fff",
                                 border: "2px solid white",
                                 borderRadius: "50%",
                                 width: "24px",
                                 height: "24px",
                                 fontWeight: "bold",
                                 fontSize: "16px",
                                 cursor: "pointer",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 zIndex: 10,
                                 boxShadow: "0 0 3px rgba(0,0,0,0.4)",
                               }}
                               title="Delete Logo"
                             >
                               ×
                             </button>
         
                             <button
                               onClick={(e) => {
                                 e.stopPropagation(); // Prevent Rnd interaction
                                 setLogoRotation((prev) => (prev + 15) % 360); // rotate 15 degrees each click
                               }}
                               style={{
                                 position: "absolute",
                                 top: "-12px",
                                 right: "-12px",
                                 backgroundColor: "#4caf50",
                                 color: "#fff",
                                 border: "2px solid white",
                                 borderRadius: "50%",
                                 width: "24px",
                                 height: "24px",
                                 fontWeight: "bold",
                                 fontSize: "16px",
                                 cursor: "pointer",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 zIndex: 10,
                                 boxShadow: "0 0 3px rgba(0,0,0,0.4)",
                               }}
                               title="Rotate Logo"
                             >
                               ⟳
                             </button>
                           </>
                         )}
         
                         {/* Logo Image */}
                         <img
                           src={logoPreview}
                           alt="Logo"
                           style={{
                             width: "100%",
                             height: "100%",
                             objectFit: "contain",
                             transform: `rotate(${logoRotation}deg)`,
                           }}
                         />
                       </div>
                     </Rnd>
                   )}
         
                   {text && (
                     <Rnd
                       size={{ width: textSize.width, height: textSize.height }}
                       onResizeStop={(e, direction, ref) => {
                         setTextSize({
                           width: ref.offsetWidth,
                           height: ref.offsetHeight,
                         });
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
                         padding: 0,
                         marginTop: 0,
                         alignItems: "center",
                         justifyContent: "center",
                         background: "none",
                         transform: `rotate(${textRotation}deg)`, // or use individual rotation per text
                       }}
                       onClick={handleSelectedText}
                     >
                       <div
                         style={{ position: "relative", width: "100%", height: "100%" }}
                       >
                         {/* Delete Button Styled Like Your Image */}
                         {selectedText && (
                           <>
                             <button
                               onClick={(e) => {
                                 e.stopPropagation(); // Prevent Rnd interaction
                                 setText([]);
                                 setTextRotation(0);
                                 setSelectedText(false);
                               }}
                               style={{
                                 position: "absolute",
                                 top: "-12px",
                                 left: "-12px",
                                 backgroundColor: "#ff4d4d",
                                 color: "#fff",
                                 border: "2px solid white",
                                 borderRadius: "50%",
                                 width: "24px",
                                 height: "24px",
                                 fontWeight: "bold",
                                 fontSize: "16px",
                                 cursor: "pointer",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 zIndex: 10,
                                 boxShadow: "0 0 3px rgba(0,0,0,0.4)",
                               }}
                               title="Delete Logo"
                             >
                               ×
                             </button>
         
                             <button
                               onClick={(e) => {
                                 e.stopPropagation(); // Prevent Rnd interaction
                                 setTextRotation((prev) => (prev + 15) % 360); // rotate 15 degrees each click
                               }}
                               style={{
                                 position: "absolute",
                                 top: "-12px",
                                 right: "-12px",
                                 backgroundColor: "#4caf50",
                                 color: "#fff",
                                 border: "2px solid white",
                                 borderRadius: "50%",
                                 width: "24px",
                                 height: "24px",
                                 fontWeight: "bold",
                                 fontSize: "16px",
                                 cursor: "pointer",
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 zIndex: 10,
                                 boxShadow: "0 0 3px rgba(0,0,0,0.4)",
                               }}
                               title="Rotate Logo"
                             >
                               ⟳
                             </button>
                           </>
                         )}
         
                         {text.map((t, idx) => (
                           <div
                             key={idx}
                             style={{
                               transform: `rotate(${textRotation}deg)`,
                               color: t.color,
                               fontFamily: t.font,
                               fontSize: t.size || 20,
                               textAlign: "center",
                               whiteSpace: "pre-wrap",
                             }}
                           >
                             {t.content}
                           </div>
                         ))}
                       </div>
                     </Rnd>
                   )}
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
                {Object.keys(colors).map((color, index) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      handleColorSelect(color);
                      setInput((prev) => ({
                        ...prev,
                        [`${selectedPart.toLowerCase().replace(" ", "")}Color`]:
                          color,
                      }));
                      setShowDownloadButton(false);
                    }}
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
                      setShowDownloadButton(false);
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
                      setShowDownloadButton(false);
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
                      setShowDownloadButton(false);
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
                      setShowDownloadButton(false);
                    }}
                  ></button>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="file-upload">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleLogoUpload}
              style={{ display: "none" }} // Hide default input
              value={input.logo}
              ref={fileInputRef} // <-- attach ref here
            />
            <label htmlFor="fileInput" className="custom-file-label">
              {logoPreview ? fileName : "Choose Logo"}
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

          <div className="custom-info-div">
            <span>
              <label>Total Quantites</label>
              <input
                className="textTotal"
                type="text"
                placeholder="0"
                name="quantity"
                value={input.quantity}
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, quantity: e.target.value }));
                }}
              />
            </span>
            <span>
              <label name="fabricType">Fabric Type</label>
              <select
                value={input.fabricType}
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, fabricType: e.target.value }));
                }}
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
              >
                <option to=""></option>
                <option to="screen print">screen print</option>
                <option to="degital print">degital print</option>
                <option to="embroidery print">embroidery print</option>
              </select>
            </span>
          </div>

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
            {/* <WhatsAppMail/> */}
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
      </div>{" "}
      {showDownloadButton && (
        <button style={{ margin: 0, padding: 0 }} onClick={handleDownloadPDF}>
          Download as PDF
        </button>
      )}
      <hr className="hr" />
      {showPopup && (
        <PopupForm
          onClose={() => setShowPopup(false)}
          onSubmit={handleCompanySubmit}
        />
      )}
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
            {logoPreview ? (
              <td rowSpan={4}>
                <img
                  src={logoPreview}
                  style={{ width: "100px", height: "100px", border: "none" }}
                />
              </td>
            ) : (
              <td rowSpan={4}></td>
            )}

            <td>{input.crown}</td>
            <td rowSpan={4}>{input.printType}</td>
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
            {text.map((text, index) => (
              <>
                <td rowSpan={4}>{text.content}</td>
                <td rowSpan={4}>{text.font}</td>
                <td rowSpan={4}>{text.color}</td>
              </>
            ))}
          </tr>
          <tr>
            <td>{input.sandwich}</td>
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

export default CapCanvas;
