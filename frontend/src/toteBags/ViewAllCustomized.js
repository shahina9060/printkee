import React, { useRef } from "react";
import html2canvas from "html2canvas";

const ViewAllCustomized = ({ customImages }) => {
  const combinedRef = useRef(null);

  const hasAllViews = Object.values(customImages).every(Boolean);
  console.log("hasAllViews", hasAllViews);

  console.log("customeImages", customImages);
  return (
    <div className="mt-6">
      {hasAllViews && (
        <>
          <h2 className="text-lg font-bold mb-2">Customized T-Shirts</h2>

          {/* Combined hidden render for image capture */}
          <div
            ref={combinedRef}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            {Object.entries(customImages).map(([view, src]) => (
              <>
                {/* <p>{src}</p> */}
                <img
                  key={view}
                  src={src}
                  alt={`${view} view`}
                  style={{ width: "200px", border: "1px solid black" }}
                />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAllCustomized;
