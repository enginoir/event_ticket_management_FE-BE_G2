// import databse
const db = require("../sequlize/models");

const { uploader } = require("../middlewares/uploader");
const fs = require("fs");

module.exports = {
  uploadFile: (req, res) => {
    try {
      let path = "/public";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);

        let sqlInsert = `Insert into album set ?`;
        db.query(sqlInsert, data, (err, results) => {
          if (err) {
            console.log(err);
            // Jika eror file yg tersimpan akan dihapus
            fs.unlinkSync("./public" + filepath);
            res.status(500).send(err);
          }
          // Jika file terupload maka
          req.status(200).send({ message: "Upload file success" });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
