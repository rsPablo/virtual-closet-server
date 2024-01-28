require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const uploadFile = async (file) => {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
};

const readFile = async () => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: "ujaaual3xra01.png",
  });
  const result = await client.send(command);
  // const newFile = fs.createWriteStream("./imagens/newimage.png");
  // fs.createReadStream(result.Body).pipe(newFile);
  result.Body.pipe(fs.createWriteStream("./images/newimage.png"));
};

module.exports = {
  uploadFile,
  readFile,
};
