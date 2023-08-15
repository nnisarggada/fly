import AppContext from "@/pages/AppContext";
import config from "@/public/config";
import React, { useState, useEffect, useContext } from "react";
import path from "path";
import {
  AiFillCopy,
  AiFillDelete,
  AiFillEdit,
  AiFillFolder,
  AiFillHome,
  AiOutlineDoubleRight,
  AiOutlineMore,
  AiOutlineRollback,
} from "react-icons/ai";
import {
  BsFileEarmarkImageFill,
  BsFileEarmarkMusicFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkPlayFill,
  BsFileEarmarkSlidesFill,
  BsFileEarmarkWordFill,
  BsFileEarmarkZipFill,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import {
  FaArrowCircleRight,
  FaCaretRight,
  FaCopy,
  FaEdit,
  FaShareAlt,
  FaTrash,
} from "react-icons/fa";

const FileList = () => {
  const { currentDir, setCurrentDir } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const fetchFilesAndDirs = async () => {
    try {
      const response = await fetch(
        `/api/readfiles?currentDir=${encodeURIComponent(currentDir)}`,
      );
      const data = await response.json();
      setFiles(data.files);
      setFolders(data.folders);
    } catch (error) {
      console.error("Error fetching files and directories:", error);
    }
  };

  useEffect(() => {
    fetchFilesAndDirs();
  }, [currentDir]);

  const handleDownload = (fileName) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = `/api/download?currentDir=${encodeURIComponent(
      currentDir,
    )}&fileName=${encodeURIComponent(fileName)}`;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  const handleFolderClick = (folderPath) => {
    setCurrentDir(`${currentDir}/${folderPath}`);
  };

  const handleFolderBack = () => {
    const lastSlashIndex = currentDir.lastIndexOf("/");
    const newDir = currentDir.slice(0, lastSlashIndex);
    setCurrentDir(newDir);
  };

  const folder = path.basename(currentDir);

  const FolderItem = ({ entry }) => {
    const [showMenu, setShowMenu] = useState(false);

    let opacity = "";

    if (entry.name.startsWith(".")) {
      opacity = "opacity-60";
    }

    const MoreMenu = () => {
      return (
        <>
          <div
            className="fixed z-30 top-0 left-0 w-screen h-screen bg-black bg-opacity-50"
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="more-menu absolute z-30 top-2 right-2 w-48 h-56 bg-slate-700 bg-opacity-100 flex flex-col items-center justify-center shadow rounded-md p-4">
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaEdit className="" />
              <h1>Rename</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaCopy className="" />
              <h1>Copy</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaArrowCircleRight className="" />
              <h1>Move</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaTrash className="" />
              <h1>Delete</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaShareAlt className="" />
              <h1>Share</h1>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className={`relative ${showMenu ? "z-10" : ""}`}>
        {showMenu ? <MoreMenu /> : null}
        <div
          className={`w-full h-20 bg-gray-800 rounded-lg flex items-center justify-between gap-2 p-4 cursor-pointer ${opacity}`}
        >
          <div className="w-5/6 flex gap-4">
            <AiFillFolder
              onClick={() => handleFolderClick(entry.name)}
              className="text-6xl"
            />
            <div
              onClick={() => {
                handleFolderClick(entry.name);
              }}
              className="w-2/3"
            >
              <h1 className="font-bold text-lg line-clamp-1 overflow-ellipsis">
                {entry.name}
              </h1>
              <p className="text-md line-clamp-1">{entry.items} Items</p>
            </div>
          </div>
          <div className="relative text-3xl w-12 h-full grid place-items-center">
            <AiOutlineMore onClick={() => setShowMenu(true)} />
          </div>
        </div>
      </div>
    );
  };

  const FileItem = ({ entry }) => {
    const [showMenu, setShowMenu] = useState(false);

    let opacity = "";

    if (entry.name.startsWith(".")) {
      opacity = "opacity-60";
    }

    const MoreMenu = () => {
      return (
        <>
          <div
            className="fixed z-30 top-0 left-0 w-screen h-screen bg-black bg-opacity-50"
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="more-menu absolute z-30 top-2 right-2 w-48 h-56 bg-slate-700 bg-opacity-100 flex flex-col items-center justify-center shadow rounded-md p-4">
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaEdit className="" />
              <h1>Rename</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaCopy className="" />
              <h1>Copy</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaArrowCircleRight className="" />
              <h1>Move</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaTrash className="" />
              <h1>Delete</h1>
            </div>
            <div className="flex w-full gap-4 items-center flex-grow text-2xl cursor-pointer">
              <FaShareAlt className="" />
              <h1>Share</h1>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className={`relative ${showMenu ? "z-10" : ""}`}>
        {showMenu ? <MoreMenu /> : null}
        <div
          className={`w-full h-20 bg-gray-800 rounded-lg flex items-center justify-between gap-2 p-4 cursor-pointer ${opacity}`}
        >
          <div className="w-5/6 flex gap-4">
            {entry.fileType === "image" ? (
              <BsFileEarmarkImageFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "doc" ? (
              <BsFileEarmarkWordFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "pdf" ? (
              <BsFileEarmarkPdfFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "ppt" ? (
              <BsFileEarmarkSlidesFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "audio" ? (
              <BsFileEarmarkMusicFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "video" ? (
              <BsFileEarmarkPlayFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "zip" ? (
              <BsFileEarmarkZipFill className="text-6xl" />
            ) : (
              <></>
            )}
            {entry.fileType === "other" ? (
              <BsFillFileEarmarkTextFill className="text-6xl" />
            ) : (
              <></>
            )}
            <div onClick={() => handleDownload(entry.name)} className="w-2/3">
              <h1 className="font-bold text-lg line-clamp-1 overflow-ellipsis">
                {entry.name}
              </h1>
              <p className="text-md line-clamp-1">{entry.size}</p>
            </div>
          </div>
          <div className="text-3xl w-12 h-full grid place-items-center">
            <AiOutlineMore onClick={() => setShowMenu(true)} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {currentDir != config.homeDir && (
        <div className="w-full flex justify-between items-center gap-4 text-gray-400 text-3xl">
          <h1 className="text-xl font-black text-white text-left w-5/6 truncate">
            {folder}
          </h1>
          <AiOutlineRollback
            onClick={() => handleFolderBack()}
            className="cursor-pointer"
          />
          <AiFillHome
            onClick={() => setCurrentDir(config.homeDir)}
            className="cursor-pointer"
          />
        </div>
      )}
      {folders.length === 0 && files.length === 0 && (
        <h2 className="text-3xl text-center font-thin mt-10">No Files :/</h2>
      )}
      {folders.length > 0 && <h2 className="text-xl font-black">Folders</h2>}
      {folders.map((entry) => {
        return <FolderItem key={entry.name} entry={entry} />;
      })}
      {files.length > 0 && <h2 className="text-xl font-black">Files</h2>}
      {files.map((entry) => {
        return <FileItem key={entry.name} entry={entry} />;
      })}
    </div>
  );
};

export default FileList;
