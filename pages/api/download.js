import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const { currentDir } = req.query;
  const { fileName } = req.query;

  const filePath = path.join(currentDir, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  res.setHeader("Content-Type", "application/octet-stream");

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
