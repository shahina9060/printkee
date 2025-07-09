import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
// import "../styles/tshirtDetails.css";

const AddText = ({ onClose, saveText }) => {
  const [texts, setTexts] = useState([]);
  const [activeTextId, setActiveTextId] = useState(null);

  useEffect(() => {
    const newText = {
      id: Date.now(),
      content: "New Text",
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      font: "Impact",
      size: 20,
      color: "#000000",
      rotate: 0,
    };
    setTexts([newText]);
    setActiveTextId(newText.id);
  }, []);

  const updateText = (id, updates) => {
    setTexts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteText = (id) => {
    setTexts((prev) => prev.filter((t) => t.id !== id));
    setActiveTextId(null);
    onClose(); // Close panel when text is deleted
  };

  const activeText = texts.find((t) => t.id === activeTextId);

  return (
    <>
      {/* Text customization panel */}
      <div
        className="add-text-container"
      
      >
        {activeTextId && (
          <>
            <h3>Edit Text</h3>
            <input
              value={activeText.content}
              onChange={(e) =>
                updateText(activeTextId, { content: e.target.value })
              }
              placeholder="Enter text"
             
            />

            <select
              
              value={activeText.font}
              onChange={(e) =>
                updateText(activeText.id, { font: e.target.value })
              }
            >
              <option value="Impact">Impact</option>
              <option value="Arial">Arial</option>
              <option value="Comic Sans MS">Comic Sans</option>
            </select>

            <input
              type="color"
              value={activeText.color}
              onChange={(e) =>
                updateText(activeTextId, { color: e.target.value })
              }
             
            />
            <input
              type="number"
              value={activeText.size}
              onChange={(e) =>
                updateText(activeTextId, { size: parseInt(e.target.value) })
              }
              
            />
            <button
              onClick={() => deleteText(activeTextId)}
             
            >
              Delete
            </button>
            <button
              onClick={() => {
                saveText({
                  content: activeText.content,
                  color: activeText.color,
                  font: activeText.font,
                  size: activeText.size,
                });
                onClose();
              }}
             
            >
              Add
            </button>
          </>
        )}
      </div>

      {/* Render the actual draggable text */}
      {texts.map((text) => (
        <Rnd
          key={text.id}
          bounds="parent"
          size={{ width: text.width, height: text.height }}
          position={{ x: text.x, y: text.y }}
          onDragStop={(e, d) => updateText(text.id, { x: d.x, y: d.y })}
          onResizeStop={(e, dir, ref, delta, pos) =>
            updateText(text.id, {
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
              ...pos,
            })
          }
          onClick={() => setActiveTextId(text.id)}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              color: text.color,
              fontFamily: text.font,
              fontSize: `${text.size}px`,
              transform: `rotate(${text.rotate}deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: activeTextId === text.id ? "1px dashed blue" : "none",
              cursor: "move",
              backgroundColor: "transparent",
            }}
          >
            {text.content}
          </div>
        </Rnd>
      ))}
    </>
  );
};

export default AddText;
