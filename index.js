var express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();

app.use(fileUpload());
var AWS = require("aws-sdk");

app.post("/upload", (req, res) => {
  AWS.config.update({
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-south-1",
  });

  const s3 = new AWS.S3();
  const fileContent = Buffer.from(req.files.data.data, "binary");

  const params = {
    Bucket: "staticwebsitetestsatyam",
    Key: req.files.data.name,
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    res.send({
      response_code: 200,
      response_message: "Success",
      response_data: data,
    });
  });
});

app.listen(3002, () => {
  console.log("Connected to port 3002");
});
