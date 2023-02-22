const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
const multer = require("multer");
const aws = require("aws-sdk");
const fs = require("fs");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    let last_dot = file.originalname.lastIndexOf(".");
    let ext = file.originalname.slice(last_dot + 1);
    let name = file.originalname.slice(0, last_dot);

    //added time stamp in case there is a file uploaded with same name as already uploaded file
    let finalName = `${name}-${Date.now()}.${ext}`;
    cb(null, finalName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.getUserId = (authKey) => {
  console.log("auth key is ", authKey);
  const tokenWithoutBearer = authKey.split("Bearer ")[1].trim();
  const token = jwt.verify(
    tokenWithoutBearer,
    process.env.SECRET_KEY || "my-secret-key",
    function (err, decodedToken) {
      if (err) {
        throw new Error("User not found");
      } else {
        return decodedToken.id;
      }
    }
  );

  return token;
};

module.exports.upload = multer({ storage, fileFilter });

module.exports.s3Upload = async (filePath, fileType, fileName) => {
  aws.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Read content from the file
  const fileContent = fs.readFileSync(filePath);

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  // Setting up S3 upload parameters
  const acl = "public-read";

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: fileType,
    ACL: acl,
  };

  const s3Response = s3.upload(params).promise();
  return s3Response;
};

module.exports.s3DeleteObject = async (Key) => {
  aws.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
  // Setting up S3 upload parameters
  const acl = "public-read";

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: Key,
  };

  const s3Response = s3.deleteObject(params).promise();
  return s3Response;
};
