const ejs = require('ejs');
const {mailVisitor,mailCompanyMCnCU} = require('../utils/sendMail')
const pMContactUs = require('../models/dbQueries')

async function modalContact(req, res, next) {

  const email=req.body.email
  var subme = req.body.mobile
  const mobile= subme.slice(-10)
  const country=req.body.country
  const casestudy=req.body.casestudy

      const mdata = pMContactUs.modalContactUs(email,casestudy,mobile,country)
            
      if(mdata){
        
        ejs.renderFile("./views/modalcontact-email-company.ejs", { email: email ,mobile: mobile ,country : country , casestudy : casestudy } , function (err, data) {
          if (err) {
            return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
          } else {
            mailCompanyMCnCU(data)
            ejs.renderFile("./views/modalcontact-email-visitor.ejs", { casestudy: casestudy }, function (err, data) {
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

module.exports = {modalContact};