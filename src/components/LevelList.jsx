import React, { useState } from "react";
import { useAppContext } from "../context/context";

const LevelList = ({ showForm, setShowForm, setIndexClicked }) => {
  const { levels } = useAppContext();

  const handleClicked = (index) => {
    if (showForm) {
      setShowForm((prevForm) => !prevForm);
    }
    setIndexClicked(index);
  };

  return (
    <div className="button-column">
      {levels.map((item, index) => (
        <button
          key={item.id}
          className="level-button"
          onClick={() => handleClicked(index)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default LevelList;
