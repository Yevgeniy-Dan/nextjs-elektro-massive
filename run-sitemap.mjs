// UNUSED
// Runs with npm run generate-sitemap
// This file may be useful in the future when you need to make a sitemap of 50,000 URLs. Now the sitemap is generated automatically, using cron job in vercel.json

// {
//   "crons": [
//     {
//       "path": "/api/generate-sitemap",
//       "schedule": "*/2 * * * *"
//     }
//   ]
// }

// If you need to process more than 50,000 URLs, you can take part of the logic from this file and transfer it to the file along the route /api/generate.sitemap/route.ts

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
