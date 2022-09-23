const multer = require("multer");

//The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //wo wollen wir unsere Dateien speichern?
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    //Dateinamen erstellen > Erstellungsdatum + originaler Name
    cb(null, Date.now() + "--" + file.fieldname);
  },
});

//Middleware die wir innerhalb unserer Applikation nutzen können
const upload = multer({ storage: storage });
module.exports = upload;
