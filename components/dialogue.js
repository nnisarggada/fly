import React from "react";

const Dialogue = ({
  title,
  placeholder,
  action,
  cancel,
  onclick,
  setShowDialogue,
}) => {
  return (
    <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-70 grid place-items-center">
      <div className="w-72 h-56 bg-gray-700 p-4 flex flex-col justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div>
          <input
            type="text"
            placeholder={placeholder}
            className="p-2 text-lg text-black"
          />
          <div>
            <button>Cancel</button>
            <button>{action}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogue;
