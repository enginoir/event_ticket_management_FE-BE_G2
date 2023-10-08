const multer = require("multer");
const fs = require("fs");

module.exports = {
  uploader: (directory, fileNamePrefix) => {
    // Lokasi penyimpanan gambar / file
    let defaultDir = "./public";

    //diskStorage : untuk menyimpan file dari FE ke dir BE
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = defaultDir + directory;

        if (fs.existsSync(pathDir)) {
          console.log("Directory ada");
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
        }
      },
      filename: (req, file, cb) => {
        let ext = file.originalname.split(".");
        let filename = fileNamePrefix + Date.now() + "." + ext[ext.length - 1];
        cb(null, filename);
      },
    });

    const fileFilter = (req, file, cb) => {
      const ext = /\.(jpg|jpeg|png|JPG|PNG|JPEG)/;
      if (!file.originalname.match(ext)) {
        return cb(
          new Error("Your file type does not match our requirement"),
          false
        );
      }
      cb(null, true);
    };
    return multer({
      storage,
      fileFilter,
    });
  },
};
