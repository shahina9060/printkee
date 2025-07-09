import React, { useEffect, useRef, useState } from "react";
import "../styles/canvascomponent.css";
import { useParams } from "react-router-dom";
import { Rnd } from "react-rnd";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import AddText from "../productDetails/AddText";
import PopupForm from "../components/PopupForm";
import html2canvas from "html2canvas";
import { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";

const ToteBagCanvas = forwardRef(
  (
    {
      preview,
      combinedRef,
      currentView,
      onSave,
      sideImages,
      setPreview,
      setDownloadEnabled,
    },
    ref
  ) => {
    const { productId } = useParams();
    console.log("product id of tshirtcanvas", productId);
    const [text, setText] = useState([]);
    const [logo, setLogo] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(false);
    const [selectedText, setSelectedText] = useState(false);
    const [fileName, setFileName] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [showText, setShowText] = useState(false);
    // const [showPreview, setShowPreview] = useState(false);
    // const [logoRotation, setLogoRotation] = useState(0);
    // const [textRotation, setTextRotation] = useState(0); // If you want one rotation for all texts
    const [viewData, setViewData] = useState({
      front: {
        logo: [null], 
        logoPreview: null,
        logoPosition: { x: 50, y: 50 },
        logoSize: { width: 150, height: 90 },
        text: [],
        textPosition: { x: 50, y: 150 },
        textSize: { width: 200, height: 50 },
        logoRotation: 0,
        textRotation: 0,
      },
      back: {
        logo: null,
        logoPreview: null,
        logoPosition: { x: 50, y: 50 },
        logoSize: { width: 150, height: 90 },
        text: [],
        textPosition: { x: 50, y: 150 },
        textSize: { width: 200, height: 50 },
        logoRotation: 0,
        textRotation: 0,
      },
    });
    console.log("rotation value", viewData[currentView].logoRotation);
    const saveText = (newText) => {
      setViewData((prev) => ({
        ...prev,
        [currentView]: {
          ...prev[currentView],
          text: [newText],
        },
      }));
    };

    useEffect(() => {
      const current = viewData[currentView];
      if (current) {
        setText(current.text || []);
        setLogo(current.logo || null);
      }
    }, [currentView, viewData]);

    console.log("text", text);

    const tshirtBaseImages = {
      front: `${backendEndApiBannerUpload}${sideImages[0]}`,
      back: `${backendEndApiBannerUpload}${sideImages[1]}`,
    };

    useImperativeHandle(ref, () => ({
      saveCurrentView: async () => {
        await saveCurrentView();
        resetCanvas(); // Clear text and logo
      },
    }));

    const {
      logoPreview,
      text: currentText = [],
      logoPosition,
      logoSize,
      textPosition,
      textSize,
    } = viewData[currentView] || {};

    const saveCurrentView = async () => {
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.width = "300px";
      container.style.height = "400px";
      document.body.appendChild(container);

      const baseImg = document.createElement("img");
      baseImg.src = tshirtBaseImages[currentView];
      baseImg.style.width = "100%";
      baseImg.style.height = "100%";
      baseImg.style.position = "absolute";
      container.appendChild(baseImg);

      const { logoPreview, text: currentText = [] } =
        viewData[currentView] || {};

      if (logoPreview) {
        const logoImg = document.createElement("img");
        logoImg.src = logoPreview;
        logoImg.style.position = "absolute";
        logoImg.style.top = `${logoPosition?.y}px`;
        logoImg.style.left = `${logoPosition?.x}px`;
        logoImg.style.width = `${logoSize?.width}px`;
        logoImg.style.height = `${logoSize?.height}px`;
        container.appendChild(logoImg);
      }

      if (currentText.length > 0) {
        currentText.forEach((t) => {
          const textDiv = document.createElement("div");
          textDiv.innerText = t.content;
          textDiv.style.position = "absolute";
          textDiv.style.top = `${textPosition?.y}px`;
          textDiv.style.left = `${textPosition?.x}px`;
          textDiv.style.color = t.color;
          textDiv.style.fontFamily = t.font;
          textDiv.style.fontSize = `${t.size || 20}px`;
          textDiv.style.width = `${textSize?.width}px`;
          textDiv.style.height = `${textSize?.height}px`;
          container.appendChild(textDiv);
        });
      }

      const canvas = await html2canvas(container);
      const dataUrl = canvas.toDataURL("image/png");
      onSave(currentView, dataUrl);
      document.body.removeChild(container);
    };

    const resetCanvas = () => {
      setLogo(null);
      setText([]);
      setSelectedText(false);
      setSelectedLogo(false);
      setFileName(null);
    };

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
    // const combinedRef = useRef(null); // For rendering all 3 views together

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
    const handleDownload = async () => {
      const canvasElem = combinedRef.current;
      const canvasImage = await html2canvas(canvasElem);
      const dataUrl = canvasImage.toDataURL("image/png");
      onSave(currentView, dataUrl);
      setPreview((preview) => !preview);
      // setShowPreview((prev) => !prev);
    };

    const handleWhatsAppClick = () => {
      const phoneNumber = "+918750708222";
      const message = "Hello! I'd like to connect.";
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    };

    // Handle logo upload
    // const handleLogoUpload = (event) => {
    //   const file = event.target.files[0];

    //   if (file) {
    //     const imageUrl = URL.createObjectURL(file);
    //     // setLogoPreview(imageUrl);
    //     setFileName(file.name);

    //     setViewData((prev) => ({
    //       ...prev,
    //       [currentView]: {
    //         ...prev[currentView],
    //         logo: file, // store actual file
    //         logoPreview: imageUrl, // store preview for display
    //       },
    //     }));
    //   }
    // };
    const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setFileName(file.name);

    setViewData((prev) => ({
      ...prev,
      [currentView]: {
        ...prev[currentView],
        logo: file,
        logoPreview: imageUrl,
      },
    }));

    // ✅ Clear the input value so that same file can be uploaded again
    event.target.value = null;
  }
};



    const generatePDFBlob = async () => {
      if (!combinedRef.current) {
        console.warn("Combined ref not available");
        return;
      }
      const element = combinedRef.current;

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
    const handleOpenPopup = () => {
      setShowPopup(true);
    };

    const handleCompanySubmit = async (companydata) => {
      if (input.quantity < 50) {
        alert("Minimum quantity should be 50");
        return;
      }

      const formData = new FormData();

      // 1. Add input fields
      formData.append("fabricType", input.fabricType);
      formData.append("printType", input.printType);
      formData.append("quantity", input.quantity);
      formData.append("phone", companydata.phone);
      //   formData.append("quantities", JSON.stringify(quantities));

      // 3. Add viewData
      for (const view in viewData) {
        const viewItem = viewData[view];

        if (viewItem.logo) {
          formData.append(`${view}Logo`, viewItem.logo); // file
        }
        if (viewItem.text && viewItem.text.length > 0) {
          formData.append(`${view}Text`, JSON.stringify(viewItem.text));
        }
      }

      // 4. Add PDF Blob
      const pdfBlob = await generatePDFBlob();
      const pdfFile = new File([pdfBlob], "custom.pdf", {
        type: "application/pdf",
      });
      formData.append("customPdf", pdfFile);

      try {
        const res = await axios.post(
          `${backendEndApi}/custom-product-tshirt`,
          formData,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          alert(
            "Product submitted successfully and email sent, Now you can download the customized product!"
          );
        } else {
          alert("Submission failed.");
        }
        setDownloadEnabled(true);
      } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong while submitting.");
      }
    };

    console.log("viewData", viewData);
    return (
      <>
        <div className="section">
          <div ref={combinedRef}>
            <div
              style={{
                position: "relative",
                width: "300px",
                height: "400px",
                marginBottom: "20px",
              }}
              // key={view}
            >
              {/* currentView = view */}
              <img
                src={tshirtBaseImages[currentView]}
                alt={` view`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />

              {/* {logoPreview && ( */}
              {viewData[currentView].logoPreview && (
                <Rnd
                  size={viewData[currentView].logoSize}
                  position={viewData[currentView].logoPosition}
                  onDragStop={(e, d) => {
                    setViewData((prev) => ({
                      ...prev,
                      [currentView]: {
                        ...prev[currentView],
                        logoPosition: { x: d.x, y: d.y },
                      },
                    }));
                  }}
                  onResizeStop={(e, direction, ref) => {
                    setViewData((prev) => ({
                      ...prev,
                      [currentView]: {
                        ...prev[currentView],
                        logoSize: {
                          width: ref.offsetWidth,
                          height: ref.offsetHeight,
                        },
                      },
                    }));
                  }}
                  bounds="parent"
                  style={{ border: selectedLogo ? "2px dashed gray" : "none" }}
                  onClick={handleSelectedLogo}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* Delete Button Styled Like Your Image */}
                    {selectedLogo && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent Rnd interaction
                            setLogo(null);
                            setViewData((prev) => ({
                              ...prev,
                              [currentView]: {
                                ...prev[currentView],
                                logo: null,
                                logoPreview: null,
                              },
                            }));
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
                            setViewData((prev) => ({
                              ...prev,
                              [currentView]: {
                                ...prev[currentView],
                                logoRotation:
                                  (prev[currentView].logoRotation + 15) % 360, // ✅ Rotate 15° each time
                              },
                            }));
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
                      // src={logoPreview}
                      src={viewData[currentView].logoPreview}
                      alt="Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transform: `rotate(${viewData[currentView].logoRotation}deg)`,
                      }}
                    />
                  </div>
                </Rnd>
              )}

              {text && (
                <Rnd
                  size={viewData[currentView].textSize}
                  position={viewData[currentView].textPosition}
                  onDragStop={(e, d) => {
                    setViewData((prev) => ({
                      ...prev,
                      [currentView]: {
                        ...prev[currentView],
                        textPosition: { x: d.x, y: d.y },
                      },
                    }));
                  }}
                  onResizeStop={(e, direction, ref) => {
                    setViewData((prev) => ({
                      ...prev,
                      [currentView]: {
                        ...prev[currentView],
                        textSize: {
                          width: ref.offsetWidth,
                          height: ref.offsetHeight,
                        },
                      },
                    }));
                  }}
                  bounds="parent"
                  style={{ border: selectedText ? "2px dashed gray" : "none" }}
                  onClick={handleSelectedText}
                >
                  {selectedText && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent Rnd interaction

                          // setLogoPreview(null);
                          setViewData((prev) => ({
                            ...prev,
                            [currentView]: {
                              ...prev[currentView],
                              text: [],
                            },
                          }));
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
                          setViewData((prev) => ({
                            ...prev,
                            [currentView]: {
                              ...prev[currentView],
                              textRotation:
                                (prev[currentView].textRotation + 15) % 360, // ✅ Rotate 15° each time
                            },
                          }));
                          // setTextRotation((prev) => (prev + 15) % 360); // rotate 15 degrees each click
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
                        position: "absolute",
                        objectFit: "contain",
                        color: t.color,
                        fontFamily: t.font,
                        fontSize: t.size || 20,
                        transform: `rotate(${viewData[currentView].textRotation}deg)`,
                      }}
                    >
                      {t.content}{" "}
                      {/* ✅ Just the string, not the whole object */}
                    </div>
                  ))}
                </Rnd>
              )}
            </div>
          </div>

          <div className="customization-section">
            <h2>Customization</h2>

            <div className="part-container">
              <span style={{ color: "red", float: "right" }}>
                [Min Quantity: 50]
              </span>
            </div>

            {/* ------------------------ */}
            {/* <div className="logo-size-container"> */}
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
            {/* </div> */}
            {/* ---------------- */}

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
                    setInput((prev) => ({
                      ...prev,
                      fabricType: e.target.value,
                    }));
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
                    setInput((prev) => ({
                      ...prev,
                      printType: e.target.value,
                    }));
                  }}
                  className="selectCustome"
                >
                  <option to=""></option>
                  <option to="screen print">screen print</option>
                  <option to="degital print">degital print</option>
                  <option to="embroidery print">embroidery print</option>
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

          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {preview ? "Hide View" : "preview"}
          </button>
          {showText && (
            <AddText onClose={() => setShowText(false)} saveText={saveText} />
          )}
        </div>{" "}
        {/* {downloadEnabled && (
          <button onClick={handleCombinedDownload}>Download Now</button>
        )} */}
        <hr className="hr" />
        {showPopup && (
          <PopupForm
            onClose={() => setShowPopup(false)}
            onSubmit={handleCompanySubmit}
          />
        )}
      </>
    );
  }
);

export default ToteBagCanvas;
