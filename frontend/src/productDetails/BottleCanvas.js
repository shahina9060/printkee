import React, { useEffect, useState } from "react";
import "../styles/canvascomponent.css";
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

import { crm_api_key } from "../endUserApi/api";
import { crm_api_url } from "../endUserApi/api";

const BottleCanvas = () => {
  const { productId } = useParams();
  console.log("product id of bottle", productId);
  //   const decodedImageUrl = decodeURIComponent(imageUrl);
  const [text, setText] = useState([]);
  const [textSize, setTextSize] = useState({ width: 80, height: 50 });
  const [selectedImage, setSelectedImage] = useState([]);
  const [logo, setLogo] = useState(null); // for backend upload
  const [logoPreview, setLogoPreview] = useState(null); // for frontend display
  const [sideImagesList, setSideImagesList] = useState([]);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState(false);
  const [selectedText, setSelectedText] = useState(false);
  const [fileName, setFileName] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showText, setShowText] = useState(false);
  const [size, setSize] = useState({ width: 150, height: 90 });
  const [productCode, setProductCode] = useState("");
  // const [customPdf, setCustomPdf] = useState(null)

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const [logoRotation, setLogoRotation] = useState(0);
  const [textRotation, setTextRotation] = useState(0); // If you want one rotation for all texts

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
      //  format: [200, 150], // A shorter height (change 150 to what suits your design)
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);

    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, "PNG", 0, y, pageWidth, imgHeight);
    // pdf.save("custom-cap.pdf");
    // ✅ Add watermark after image
    addWatermark(pdf);
    pdf.save(`custom-${productId}-${Date.now()}.pdf`);
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
        setSelectedImage(res.data.imageUrl[0]);
        setSideImagesList(res.data.imageUrl);
        console.log("res", "res", res.data.subcategory.name);
        setProductCode(res.data.productCode);
        console.log("res", res.data.productCode);
      } catch (error) {}
    };
    fetchImages();
  }, []);

  const [input, setInput] = useState({
    fabricType: "",
    printType: "",
    quantity: "",
  });

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
      ...companydata,
    };

    const formData = new FormData();

    for (const key in finalData) {
      formData.append(key, finalData[key]);
    }

    if (logo) {
      formData.append("logo", logo);
    }

    if (!logo) {
      return alert("logo is required");
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
      // Send lead to CRM
      await axios.post(
        `${crm_api_url}`,
        {
          productCode: productCode,
          phone: companydata.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${crm_api_key}`,
          },
        }
      );

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
        fabricType: "",
        printType: "",
        quantity: "",
      });
    }
  };

  return (
    <>
      <div className="section">
        <div ref={canvasRef} id="botle-preview">
          <div className="bottle-canvas-container" onClick={handleDeselectLogo}>
            <div
              className="bottleCanvasDIV"
              id="canvas_front"
              name="canvas_front"
            >
              <img
                id="imgBg"
                className="js-product-parts-bottle"
                // src="https://src1.ilogo.in/new_upload/2025/1303/174184819817269178688554/1741848270//front/bg.png?1741848272105"
                // src={imageUrl}
                src={`${backendEndApiBannerUpload}${selectedImage}`}
                alt="Base"
              />
            </div>
          </div>
          <div className="image-section">
            {/* <div className="links">
            {sideImagesList.map((itemlist, index) => (
              <a key={index}>
                <img src={`${backendEndApiBannerUpload}${itemlist}`} onClick={(e)=>{setSelectedImage(itemlist)}}/>
              </a>
            ))}
          </div> */}
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
                padding:0,
                margin:0
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
                        setLogoRotation(0)
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
                padding:0,
                marginTop:0,
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
                        setTextRotation(0)
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
              <label name="materialTYpe">Material Type</label>
              <select
                value={input.materialTYpe}
                onChange={(e) => {
                  setInput((prev) => ({
                    ...prev,
                    materialTYpe: e.target.value,
                  }));
                }}
              >
                <option value=""></option>
                <option value="Plastic">Plastic</option>
                <option value="Wood">Wood</option>
                <option value="Mattel">Mattel</option>
                {/* <option value="Chini Mitti">Chini Mitti</option> */}
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
                <option to="Laser Print">Laser Print</option>
                <option to="UB Sticker">UB Sticker</option>
                <option to="Screen">Screen</option>
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
            <th>Material Type</th>
            <th>Logo</th>
            <th>Print Type</th>
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

            <td rowSpan={4}>{input.printType}</td>

            {text.map((text, index) => (
              <>
                <td rowSpan={4}>{text.content}</td>
                <td rowSpan={4}>{text.font}</td>
                <td rowSpan={4}>{text.color}</td>
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default BottleCanvas;
