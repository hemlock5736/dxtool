import esbuild from "esbuild";
import fs from "fs";
import path from "path";

function removeExportPlugin() {
  return {
    name: "remove-export-plugin",
    setup(build) {
      build.onEnd((result) => {
        result.outputFiles?.forEach((file) => {
          file.contents = file.text
            .replace(/export\s*\{\s*[^}]*\s*\};/, "")
            .trim();
          fs.mkdirSync(path.dirname(file.path), { recursive: true });
          fs.writeFileSync(file.path, file.contents);
        });
      });
    },
  };
}

esbuild
  .build({
    bundle: true,
    entryPoints: ["src/index.ts"],
    format: "esm",
    outfile: "build/index.js",
    plugins: [removeExportPlugin()],
    write: false,
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
