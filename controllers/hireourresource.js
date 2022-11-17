const ejs = require('ejs');
const {mailVisitor,mailCompanyHR} = require('../utils/sendMail')
const pHire = require('../models/dbQueries')

async function hireResource(req, res, next) {
   
  const name=req.body.name
  const email=req.body.email
  const resource=req.body.resource
  const details=req.body.details
  var subme = req.body.contact
  const mobile= subme.slice(-10)
  const country=req.body.country
  const model=req.body.model
  const createdon=new Date();

  const hdata = pHire.hireResource(name,email,resource,details,mobile,country,model,createdon)
            
  if(hdata){

    ejs.renderFile("./views/hiredeveloper-email-company.ejs", { name: name,email: email ,mobile: mobile ,details: details ,resource: resource  ,country : country }, function (err, data) {
      if (err) {
        return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
      } else {
        mailCompanyHR(data)
        ejs.renderFile("./views/hiredeveloper-email-visitor.ejs", { name: name , email: email }, function (err, data) {
          if (err) {
            return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
          } else {
            const resp = mailVisitor(email,data)
            return res.status(200).send(resp);
          }
          
        });
      }
    });

    
  }
  else{
    return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
  }

};


module.exports = {hireResource};