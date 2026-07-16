const fs = require("fs");
const path = require("path");

const root = process.cwd();

const staticSource = path.join(root, ".next", "static");
const staticDestination = path.join(
  root,
  ".next",
  "standalone",
  ".next",
  "static"
);

const publicSource = path.join(root, "public");
const publicDestination = path.join(
  root,
  ".next",
  "standalone",
  "public"
);

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    console.log(`Skipped missing directory: ${source}`);
    return;
  }

  fs.mkdirSync(destination, {
    recursive: true,
  });

  fs.cpSync(source, destination, {
    recursive: true,
    force: true,
  });
}

copyDirectory(staticSource, staticDestination);
copyDirectory(publicSource, publicDestination);

console.log(
  "TRINETRA standalone assets prepared successfully."
);