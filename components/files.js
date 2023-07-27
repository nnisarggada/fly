import AppContext from "@/pages/AppContext";
import config from "@/public/config";
import React, { useState, useEffect, useContext } from "react";
import {
  AiFillFolder,
  AiFillHome,
  AiOutlineMore,
  AiOutlineRollback,
} from "react-icons/ai";
import {
  BsFileEarmarkImageFill,
  BsFileEarmark,
  BsFileEarmarkMusicFill,
  BsFileEarmarkPdfFill,
  BsFileEarmarkPlayFill,
  BsFileEarmarkSlidesFill,
  BsFileEarmarkWordFill,
  BsFileEarmarkZipFill,
} from "react-icons/bs";

const FileList = () => {
  const [filesAndDirs, setFilesAndDirs] = useState([]);
  const { currentDir, setCurrentDir } = useContext(AppContext);

  const fetchFilesAndDirs = async () => {
    try {
      const response = await fetch(
        `/api/readfiles?currentDir=${encodeURIComponent(currentDir)}`,
      );
      const data = await response.json();
      setFilesAndDirs(data.filesAndDirs);
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

  const FolderItem = ({ entry }) => {
    return (
      <div className="w-full h-20 bg-gray-800 rounded-lg flex items-center gap-2 p-4 cursor-pointer">
        <AiFillFolder
          onClick={() => handleFolderClick(entry.name)}
          className="text-6xl"
        />
        <div onClick={() => handleFolderClick(entry.name)} className="w-full">
          <h1 className="font-bold text-lg line-clamp-1">{entry.name}</h1>
          <p className="text-md line-clamp-1">{entry.items} Items</p>
        </div>
        <div className="text-3xl w-12 h-full grid place-items-center">
          <AiOutlineMore onClick={() => console.log("More")} />
        </div>
      </div>
    );
  };

  const FileItem = ({ entry }) => {
    return (
      <div
        onClick={() => handleDownload(entry.name)}
        className="w-full h-20 bg-gray-800 rounded-lg flex items-center gap-2 p-4 cursor-pointer"
      >
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
          <BsFileEarmark className="text-6xl" />
        ) : (
          <></>
        )}
        <div className="w-full">
          <h1 className="font-bold text-lg line-clamp-1">{entry.name}</h1>
          <p className="text-md line-clamp-1">{entry.size}</p>
        </div>
        <div className="text-3xl w-12 h-full grid place-items-center">
          <AiOutlineMore onClick={() => console.log("More")} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {currentDir != config.homeDir && (
        <div className="w-full flex justify-between items-center p-2 text-gray-400 text-3xl">
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
      <h2 className="text-xl font-black">Folders</h2>
      {filesAndDirs.map((entry) => {
        if (!entry.isFile) {
          return <FolderItem key={entry.name} entry={entry} />;
        }
        return null;
      })}
      <h2 className="text-xl font-black">Files</h2>
      {filesAndDirs.map((entry) => {
        if (entry.isFile) {
          return <FileItem key={entry.name} entry={entry} />;
        }
        return null;
      })}
    </div>
  );
};

export default FileList;
