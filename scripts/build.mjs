import { mkdir, readFile, writeFile } from "node:fs/promises";
import { minify } from "uglify-js";
import pkg from "../package.json" with { type: "json" };

const banner = `/*!\n * ${pkg.name} ${pkg.version} - Copyright ${new Date().getFullYear()} Terrill Dent, http://terrill.ca\n * ${pkg.description}\n * ${pkg.license}\n */\n`;

const sourcePath = "src/tsorter.js";
const distDir = "dist";
const distPath = `${distDir}/tsorter.js`;
const minPath = `${distDir}/tsorter.min.js`;

await mkdir(distDir, { recursive: true });

const source = await readFile(sourcePath, "utf8");
await writeFile(distPath, `${banner}${source}`, "utf8");

const result = minify(source, {
  compress: true,
  mangle: true,
  output: {
    comments: false
  }
});

if (result.error || !result.code) {
  throw result.error ?? new Error("UglifyJS failed without returning output.");
}

await writeFile(minPath, `${banner}${result.code}\n`, "utf8");

console.log(`Built ${distPath} and ${minPath}`);
