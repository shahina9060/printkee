import React, { useRef } from "react";
// import html2canvas from "html2canvas";

const ViewAllCustomized = ({ customImages }) => {
  const combinedRef = useRef(null);

  const hasAllViews = Object.values(customImages).every(Boolean);
  console.log("hasAllViews", hasAllViews);

  // const handleCombinedDownload = async () => {
  //   if (combinedRef.current) {
  //     const canvas = await html2canvas(combinedRef.current);
  //     const dataURL = canvas.toDataURL("image/png");

  //     const link = document.createElement("a");
  //     link.href = dataURL;
  //     link.download = "combined-custom-tshirt.png";
  //     link.click();
  //   }
  // };

  console.log("customeImages", customImages);
  return (
    <div className="mt-6">
      {hasAllViews && (
        <>
          <h2 className="text-lg font-bold mb-2">Customized T-Shirts</h2>

          {/* Combined hidden render for image capture */}
          <div
            ref={combinedRef}
            // style={{ display: "flex", gap: "10px", marginBottom: "10px", padding: '10px', backgroundColor: 'white' }}
            style={{
              display: "flex",
              flexWrap: "wrap", // allow wrapping
              gap: "10px",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "white",
              width: "100%", // or a fixed width like '600px'
              maxWidth: "800px",
            }}
          >
            {Object.entries(customImages).map(([view, src]) => (
              <div
                key={view}
                style={{ border: "1px solid black", width: "200px" }}
              >
                <img
                  src={src}
                  alt={`${view} view`}
                  style={{ width: "100%", display: "block" }}
                />
                <p style={{ textAlign: "center" }}>{view}</p>
              </div>
            ))}
          </div>

          {/* Download single stitched image */}
          {/* {
            downloadEnabled && <button
            className="mt-4 px-4 py-2 bg-green-500 text-white"
            onClick={handleCombinedDownload}
          >
            Download Combined Image
          </button>
          } */}
        </>
      )}
    </div>
  );
};

export default ViewAllCustomized;
