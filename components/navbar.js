import React, { useState, useEffect, useContext } from "react";
import AppContext from "@/pages/AppContext";
import config from "@/public/config";
import {
  AiFillFileAdd,
  AiFillFolder,
  AiFillFolderAdd,
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineMore,
  AiOutlineSearch,
} from "react-icons/ai";

const NavMenu = ({
  showMenu,
  setShowMenu,
  setShowNewFolderDialogue,
  setCurrentDir,
}) => {
  return showMenu ? (
    <div className="absolute top-0 left-0 z-50 w-screen h-screen flex">
      <div
        onClick={() => setShowMenu(false)}
        className="flex-grow h-full bg-black bg-opacity-50"
      ></div>
      <div className="absolute top-0 left-0 h-screen w-64 bg-gray-700 flex flex-col text-xl">
        <div
          onClick={() => {
            setCurrentDir(config.homeDir);
            setShowMenu(false);
          }}
          className="w-full h-16 border-b-2 border-b-gray-500 flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-600"
        >
          <AiFillFolder className="text-3xl text-white" />
          <h1>My Files</h1>
        </div>
        <div
          onClick={() => {
            setShowMenu(false);
            setShowNewFolderDialogue(true);
          }}
          className="w-full h-16 flex items-center gap-2 p-4 cursor-pointer hover:bg-gray-600"
        >
          <AiFillFolderAdd className="text-3xl text-white" />
          <h1>New Folder</h1>
        </div>
      </div>
    </div>
  ) : null;
};

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNewFolderDialogue, setShowNewFolderDialogue] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const { currentDir, setCurrentDir } = useContext(AppContext);

  async function createNewFolder(folderName) {
    const apiUrl = "/api/newfolder";
    const requestData = {
      directory: currentDir,
      folderName: folderName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      } else {
        setCurrentDir(`${currentDir}/${folderName}`);
        setShowMenu(false);
        setShowNewFolderDialogue(false);
      }
    } catch (error) {
      console.error("Error creating folder:", error.message);
      if (error.message.includes("already exists")) {
        alert(`Folder "${folderName}" already exists.`);
      } else {
        alert("An error occurred while creating the folder.");
      }
    }
  }

  useEffect(() => {
    document.body.style.overflowY = showMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [showMenu]);

  const handleMenuIconClick = (event) => {
    event.stopPropagation();
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleCreateFolder = () => {
    if (newFolderName) {
      createNewFolder(newFolderName);
      setNewFolderName("");
    } else {
      alert("Please enter a folder name.");
    }
  };

  return (
    <>
      {showSearch && <Searchbar setShowSearch={setShowSearch} />}
      {!showSearch && (
        <nav className="w-full h-16 sticky top-0 z-10 flex items-center gap-4 bg-gray-900 p-4 text-2xl">
          <AiOutlineMenu
            onClick={handleMenuIconClick}
            className="cursor-pointer"
          />
          <h1 className="font-black flex-grow text-left text-xl">
            Files Lovingly Yours
          </h1>
          <AiOutlineSearch
            onClick={() => setShowSearch(true)}
            className="cursor-pointer"
          />
          <AiOutlineMore className="cursor-pointer" />
        </nav>
      )}
      {showMenu && (
        <NavMenu
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setShowNewFolderDialogue={setShowNewFolderDialogue}
          setCurrentDir={setCurrentDir}
        />
      )}

      {showNewFolderDialogue && (
        <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-70 grid place-items-center">
          <div className="w-72 bg-gray-700 p-4 flex flex-col gap-6 rounded-xl">
            <h1 className="text-3xl font-bold">New Folder</h1>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="p-2 text-lg text-black rounded-lg focus:outline-none"
              />
              <div className="w-full flex items-center gap-4 text-xl">
                <button
                  onClick={() => setShowNewFolderDialogue(false)}
                  className="flex-grow h-12 bg-gray-500 bg-opacity-30 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="flex-grow h-12 bg-gray-800 rounded-lg"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Searchbar = ({ setShowSearch }) => {
  return (
    <div className="w-full h-16 sticky top-0 z-40 flex items-center gap-4 bg-gray-900 p-4 text-lg">
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
      />
    </div>
  );
};
