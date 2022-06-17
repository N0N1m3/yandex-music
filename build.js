const fs = require("fs");

(() => {
  const fileTypes = /\.(js|ts)$/i;

  const cjs = (path) => {
    const files = fs.readdirSync(path, { withFileTypes: true });

    const empty = Buffer.from(`"use strict";\r\nObject.defineProperty(exports, "__esModule", { value: true });\r\n`)

    files.forEach(async (file) => {
      if (file.isDirectory()) return cjs(`${path}/${file.name}`);

      if (!fileTypes.test(file.name)) return;

      const build = fs.readFileSync(`${path}/${file.name}`)

      if (!Buffer.compare(empty, build)) fs.unlinkSync(`${path}/${file.name}`)
    });
  };

  cjs("dist")

})();