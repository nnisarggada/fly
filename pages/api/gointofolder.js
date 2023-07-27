import fs from "fs";
import path from "path";
import config from "@/public/config";

export default function handler(req, res) {
  const { selectedFolder } = req.body;

  const configPath = path.join(process.cwd(), "public", "config.js");
  const configContent = `const data = { dir: "${config.dir}/${selectedFolder}", homeDir: "${config.homeDir}" };\n\nexport default data;\n`;

  try {
    fs.writeFileSync(configPath, configContent);
    res.status(200).json({ message: "Configuration updated successfully" });
  } catch (error) {
    console.error("Error updating configuration:", error);
    res.status(500).json({ error: "Failed to update configuration" });
  }
}
