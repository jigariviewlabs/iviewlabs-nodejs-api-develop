const upload = require('../services/fileUpload');
const singleUpload = upload.single("upl");

function uploadFile(req, res, next) {
    singleUpload(req, res, function (err) {
      if (err) {
        return res.status(400).send(JSON.stringify({ 'failed': 'Something went wrong' }));
      }

      return res.status(200).send('{"status":"success"}');
    });
};

module.exports = { uploadFile }