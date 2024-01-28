const { Router } = require("express");
const { uploadFile, readFile } = require("./s3");
const router = Router();

router.get("/", (req, res) => res.send("welcome to server"));

router.post("/upload", async (req, res) => {
  console.log(req.files["photo"].tempFilePath);

  const result = await uploadFile(req.files["photo"]);
  console.log(result);
  res.send("archivo subido");
});

router.get("/archivo", async (req, res) => {
  const result = await readFile();
  console.log(result);
  res.send("tu archivo");
});

module.exports = router;
