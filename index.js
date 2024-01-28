const express = require("express");
const fileUpload = require("express-fileupload");
const photosRouters = require("./photos.routes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.use(photosRouters);

app.listen(3000);
