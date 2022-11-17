const ejs = require('ejs');
const {mailVisitor,mailCompanyMCnCU} = require('../utils/sendMail')
const pContact = require('../models/dbQueries')
var request = require("request");
require('dotenv').config();


function getContacted(req, res, next) {

    const name=req.body.name
    const email=req.body.email
    const type=req.body.type
    const details=req.body.details
    const subme = req.body.mobile
    const mobile= subme.slice(-10)
    const country=req.body.country
    const createdon =new Date()

    const cdata = pContact.contactUs(name,email,type,details,mobile,country,createdon)
            
    if(cdata){
      try {
        var options = { method: 'POST',
          url: process.env.HUBSPOT_URL,
          qs: { hapikey: process.env.HUBSPOT_API_KEY },
          headers: 
          { 
            'Content-Type': 'application/json' },
          body: 
          { properties: 
              [ { property: 'email', value: email },
                { property: 'firstname', value:  name },
                { property: 'phone', value: mobile },
                //{ property: 'country', value: country },
                ] },
          json: true };
        console.log(options);
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log(body);
        });
      } catch (error) {
        console.log(error.message);
      }

      try { 
        ejs.renderFile("./views/contactus-email-company.ejs", { name: name,email: email ,type: type ,mobile: mobile ,country : country ,details: details }, function (err, data) {
          if (data) {
            mailCompanyMCnCU(data)
            ejs.renderFile("./views/contactus-email-visitor.ejs", { name: name }, function (err, data) {
              if (data) {
                const resp = mailVisitor(email,data)
                return res.status(200).send(resp);
              }
            });
          }        
        });
      } catch (error) {
        console.log(error.message);
      }
    } else{
        return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
    }

}
module.exports = {getContacted};