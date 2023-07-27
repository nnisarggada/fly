import React from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineMore,
  AiOutlineSearch,
} from "react-icons/ai";

export default function Navbar() {
  const [showSearch, setShowSearch] = React.useState(false);

  const Searchbar = () => {
    return (
      <div className="w-full h-16 sticky top-0 z-50 flex items-center gap-4 bg-gray-900 p-4 text-lg">
        <AiOutlineArrowLeft
          onClick={() => {
            setShowSearch(false);
          }}
          className="text-2xl cursor-pointer"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-900 focus:outline-none"
        ></input>
      </div>
    );
  };

  return (
    <>
      {showSearch && <Searchbar />}
      {!showSearch && (
        <nav className="w-full h-16 sticky top-0 z-40 flex items-center gap-4 bg-gray-900 p-4 text-2xl">
          <div className="w-20 h-full flex items-center justify-start gap-4">
            <AiOutlineMenu className="cursor-pointer" />
          </div>
          <h1 className="font-black flex-grow text-center">N-CLOUD</h1>
          <div className="w-20 h-full flex items-center justify-end gap-4">
            <AiOutlineSearch
              onClick={() => setShowSearch(true)}
              className="cursor-pointer"
            />
            <AiOutlineMore className="cursor-pointer" />
          </div>
        </nav>
      )}
    </>
  );
}
