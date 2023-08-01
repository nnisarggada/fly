import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { directory, folderName } = req.body;

  if (!directory || !folderName) {
    return res
      .status(400)
      .json({ error: "Missing directory or folderName in the request body." });
  }

  const newFolderPath = path.join(directory, folderName);

  try {
    fs.mkdirSync(newFolderPath);
    return res
      .status(200)
      .json({
        message: `Folder "${folderName}" created successfully in "${directory}".`,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error creating folder: ${error.message}` });
  }
}
