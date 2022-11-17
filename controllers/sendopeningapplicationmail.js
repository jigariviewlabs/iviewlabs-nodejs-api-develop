const ejs = require('ejs');
const {mailVisitor,mailCompanyApplication} = require('../utils/sendMail')
const pSendOpMail = require('../models/dbQueries')

async function sendOpeningApplication(req, res, next){

  const name = req.body.name
  const email = req.body.email
  var subme = req.body.mobile
  const mobile = subme.slice(-10)
  const title = req.body.title
  const titleid = req.body.titleid
  const aid = req.body.aid
  const file = req.body.file 
  const modifiedon = new Date()
  const isActive='1'
  let fileName = file.replace(/\s/g, '-');
  let durl =process.env.BASE_URL+'resume/'+aid+'/'+fileName;
  var resume = encodeURI(durl)
  const sdata = await pSendOpMail.sendOpeningApplication(durl,isActive,modifiedon,aid)
   
    if(sdata){
      
      ejs.renderFile("./views/sendopeningapplication-email-company.ejs", { name:name,email:email,mobile:mobile,title:title,resume:resume} , function (err, data) {
        if (err) {
          return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
        } else {
          mailCompanyApplication(data,title)
          ejs.renderFile("./views/sendopeningapplication-email-visitor.ejs", { name: name, title: title }, function (err, data) {
            if (err) {
              return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
            } else {
                const resp = mailVisitor(email,data)
                return res.status(200).send(resp);
            }
            
          });
        }
      });
    }else{
      return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
    }
};

module.exports = {sendOpeningApplication}