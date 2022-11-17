const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
    secretAccessKey:process.env.AWS_SECRET__KEY,
    accessKeyId:process.env.AWS_SECRET_ID,
    region: process.env.AWS_REGION,
  });
  const s3 = new aws.S3();

  const upload = multer({
    
    storage: multerS3({
      s3,
      bucket:  process.env.AWS_BUCKET_NAME+'/resume',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
          let aid = req.params.aid;
          let name = file.originalname.replace(/\s/g, '-');
          let fileName  = aid+'/'+name;
        cb(null,fileName);
      },
    }),
  });

module.exports = upload;