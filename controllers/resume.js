
var AWS = require('aws-sdk');
const resume = (req,res)=>{
    let fileName = req.params.id+'/'+req.params.file;
   AWS.config.update(
     {
       secretAccessKey:process.env.AWS_SECRET__KEY,
       accessKeyId:process.env.AWS_SECRET_ID,
       region: process.env.AWS_REGION,
     }
   );
   var fileKey = 'resume/'+fileName;
   var s3 = new AWS.S3();
   var options = {
       Bucket:process.env.AWS_BUCKET_NAME,
       Key:fileKey,
   };
   s3.getObject(options).createReadStream().on('error', function(err){
     if(err){
       return res.status(404).send(err.message);
     }
   res.attachment(fileKey);
 }).pipe(res);
}

module.exports = {resume}