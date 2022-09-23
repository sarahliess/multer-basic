const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const upload = require("./controllers/uploadLogic");

//Initiale Route rendert unser index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

//Middleware um Inhalte senden zu können
app.use(express.static(path.join(__dirname, "public")));

//Die Route die unsere Post-Request akzeptieren wird
//.single(): Auf unserer Middleware nutzen wir die single Methode die wir durch Multer bekommen. Heißt hier: es wird nur eine Datei hochgeladen / akzeptiert. Argument der single Methode: Dateiname innerhalb der Request, wonach Multer suchen soll
app.post("/upload-one-pic", upload.single("picture"), (req, res) => {
  //In Postman: Body > form-data > file + wir brauchen genau den Namen, den wir in der .single Methode als Key definiert haben!
  const file = req.file;
  console.log(file);
  if (!file) {
    res.send("no file found");
  }
  console.log(file.path);
  res.status(200).send(
    //hier darf "public" folder nicht genannt werden, sonst funktioniert es nicht
    `<h2>Here is the picture:</h2><br/><img src="/images/${file.filename}" alt=${file.filename}/>`
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
