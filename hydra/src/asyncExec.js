const { execFile } = require("child_process");

const asyncExec = path =>
  new Promise((resolve, reject) => {
    execFile("find", [path], { maxBuffer: 1024 * 5000 }, (err, result) => {
      if (err) reject(err);

      let paths = result.split("\n");
      let allowedPaths = new Array();
      const regex = /\.(jpeg||jpg||png||PNG)$/;

      for (let path of paths) {
        if (path.match(regex)) {
          allowedPaths.push(path);
        }
      }

      resolve(allowedPaths);
    });
  });

module.exports = asyncExec;
