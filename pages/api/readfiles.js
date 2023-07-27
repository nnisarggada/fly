import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { currentDir } = req.query;

  const formatFileSize = (bytes) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatLastModified = (date) => {
    const currentDate = new Date();
    const modifiedDate = new Date(date);

    const timeDifference = currentDate.getTime() - modifiedDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return "a few seconds ago";
    } else if (secondsDifference < 60 * 60) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (secondsDifference < 60 * 60 * 24) {
      const hours = Math.floor(secondsDifference / (60 * 60));
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (secondsDifference < 60 * 60 * 48) {
      return "yesterday";
    } else if (modifiedDate.getFullYear() === currentDate.getFullYear()) {
      const options = {
        month: "short",
        day: "numeric",
      };
      return modifiedDate.toLocaleDateString("en-US", options);
    } else {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return modifiedDate.toLocaleDateString("en-US", options);
    }
  };

  const getFileType = (fileType) => {
    const imageTypes = [".jpg", ".jpeg", ".png", ".gif"];
    const docTypes = [".doc", ".docx", ".txt"];
    const pdfTypes = [".pdf"];
    const pptTypes = [".ppt", ".pptx"];
    const audioTypes = [".mp3", ".wav"];
    const videoTypes = [".mp4", ".avi", ".mkv"];

    if (imageTypes.includes(fileType)) {
      return "image";
    } else if (docTypes.includes(fileType)) {
      return "doc";
    } else if (pdfTypes.includes(fileType)) {
      return "pdf";
    } else if (pptTypes.includes(fileType)) {
      return "ppt";
    } else if (audioTypes.includes(fileType)) {
      return "audio";
    } else if (videoTypes.includes(fileType)) {
      return "video";
    } else {
      return "other";
    }
  };

  try {
    const files = await fs.promises.readdir(currentDir);

    const filesAndDirs = await Promise.all(
      files.map(async (entry) => {
        const entryPath = path.join(currentDir, entry);
        const stat = await fs.promises.stat(entryPath);

        if (stat.isDirectory()) {
          const subFiles = await fs.promises.readdir(entryPath);
          const itemCount = subFiles.length;
          return {
            name: entry,
            isFile: false,
            items: itemCount,
          };
        } else {
          return {
            name: entry,
            isFile: true,
            size: formatFileSize(stat.size),
            lastModified: formatLastModified(stat.mtime),
            fileType: getFileType(path.extname(entry).toLowerCase()),
          };
        }
      }),
    );

    res.status(200).json({ filesAndDirs });
  } catch (error) {
    console.error("Error reading directory:", error);
    res.status(500).json({ error: "Failed to read files and directories" });
  }
}
