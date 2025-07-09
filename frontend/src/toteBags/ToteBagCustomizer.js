import React, { useEffect, useRef, useState } from "react";
import ToteBagCanvas from "./ToteBagCanvas";
import ViewAllCustomized from "./ViewAllCustomized";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendEndApi, backendEndApiBannerUpload } from "../endUserApi/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ToteBagCustomizer = () => {
  const { productId } = useParams();
  const [view, setView] = useState("front"); // front, back, sleeves
  const [sideImages, setSideImages] = useState({
    front: null,
    back: null,
  });

  const [downloadEnabled, setDownloadEnabled] = useState(false);

  const [preview, setPreview] = useState(false);

  const canvasRef = useRef();

  const handleSave = (viewName, imageDataUrl) => {
    setCustomImages((prev) => ({ ...prev, [viewName]: imageDataUrl }));
  };

  const handleViewChange = async (newView) => {
    if (newView === view) return;

    if (canvasRef.current?.saveCurrentView) {
      await canvasRef.current.saveCurrentView();
    }

    console.log("newView", newView);
    setView(newView); // <-- You were missing this
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${backendEndApi}/products/side-images/${productId}`
        );
        setSideImages(res.data.imageUrl); // e.g. { front: '...', back: '...', sleeves: '...' }

        const imageArray = res.data.imageUrl;
        console.log("imageArray", imageArray);
        const objectImages = {
          front: `${backendEndApiBannerUpload}${imageArray[0]}`,
          back: `${backendEndApiBannerUpload}${imageArray[1]}`,
        };
        console.log("objectImages", objectImages);
        setCustomImages(objectImages);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, [productId]);

  console.log("sideImages", sideImages);
  console.log("current view", view);

  const [customImages, setCustomImages] = useState({
    front: null,
    back: null,
  });
  console.log("customeImages", customImages);

  // =======================

  const combinedRef = useRef(null);

  const hasAllViews = Object.values(customImages).every(Boolean);
  console.log("hasAllViews", hasAllViews);

  const handleCombinedDownload = async () => {
    if (combinedRef.current) {
      const canvas = await html2canvas(combinedRef.current, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height], // match canvas size
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("custom-tshirt-designs.pdf");
    }
  };
  // ==================

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button onClick={() => handleViewChange("front")}>Front</button>
        <button onClick={() => handleViewChange("back")}>Back</button>
      </div>

      <ToteBagCanvas
        ref={canvasRef}
        currentView={view}
        onSave={handleSave}
        sideImages={sideImages}
        setPreview={setPreview}
        preview={preview}
        setDownloadEnabled={setDownloadEnabled}
        combinedRef={combinedRef} // ✅ pass it
      />

      {preview && (
        <ViewAllCustomized
          customImages={customImages}
        />
      )}

      {downloadEnabled && 
        <div>
          <div
            // type="hidden"
            ref={combinedRef}
            style={{
              position: "absolute",
              left: "-9999px",
              top: 0,
              width: "fit-content",
              padding: "10px",
              backgroundColor: "white",
              display: "flex",
              gap: "10px",
            }}
          >
            {Object.entries(customImages).map(([view, src]) => (
              
                <img
                  key={view}
                  src={src}
                  alt={`${view} view`}
                  crossOrigin="anonymous"
                  style={{ width: "200px", border: "1px solid black" }}
                />
              
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white"
            onClick={handleCombinedDownload}
          >
            Download Combined Image
          </button>
        </div>
      }
    </div>
  );
};

export default ToteBagCustomizer;
