import React, { createContext, useState } from "react";

const ColorContext = createContext();

const ColorProvider = ({ children }) => {
  const initialColors = [
    { name: "red", value: "#FF0000" },
    { name: "green", value: "#00FF00" },
    { name: "blue", value: "#0000FF" },
  ];

  const [colors, setColors] = useState(initialColors);

  const addColor = (color) => {
    setColors([...colors, color]);
  };

  return (
    <ColorContext.Provider value={{ colors, addColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext, ColorProvider };
