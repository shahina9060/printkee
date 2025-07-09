import React from "react";

const Header = ({ name }) => {
  return (
    <h1
      style={{
        color: "black",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "20px",
        position: "relative",
        fontSize: "2rem",
        fontWeight: "normal",
        fontFamily: 'Times New Roman Times, serif'
      }}
    >
      {name}
    </h1>
  );
};

export default Header;
