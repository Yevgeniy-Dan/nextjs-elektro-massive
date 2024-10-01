import { register } from "node:module";
import { pathToFileURL } from "node:url";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

register("ts-node/esm", pathToFileURL("./"));

import("./src/scripts/generate-sitemap.ts")
  .then(async (module) => {
    if (typeof module.generateSitemaps === "function") {
      await module.generateSitemaps();
      console.log("Sitemaps generated successfully!");
    } else {
      console.error("generateSitemaps function not found in the module");
    }
  })
  .catch((error) => {
    console.error("Error running the script:", error);
  });
