const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "Public");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "PIMG" +
        "-" +
        Date.now() +
        Math.round(Math.random() * 1000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else if (file.mimetype.split("/")[1] !== "pdf") {
    cb(new Error("File Format not Match, PDF only"));
  }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
