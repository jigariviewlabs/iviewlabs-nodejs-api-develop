require('dotenv').config();
const nodemailer = require('nodemailer');

// Email Configurations
let smtpConfig = {
    host: process.env.SMTP_HOST, 
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS
    }
  };


let transport = nodemailer.createTransport(smtpConfig);
  

function mailVisitor(email,data) {
    
    let res='';
    const messageToContactPerson = {
        from: process.env.SMTP_USER, 
        to: email,     
        subject: 'Thank you for Contacting us', 
        html: data
      };
        transport.sendMail(messageToContactPerson, function(err, info) {
          if (err) {
            res=JSON.stringify({'failed':'Something went wrong'})
            return res
          } else {
            res=JSON.stringify({'success': 'success'})
            return res
          }
      });
}

function mailCompanyHR(data,title){
                                          
  const messageToCompany = {
      from: process.env.SMTP_USER, 
      to: process.env.SMTP_USER,     
      subject: 'Inquiry from Website', 
      html: data,
      cc: [process.env.SALES_EMAIL,process.env.INFO_EMAIL],
      bcc: process.env.CC_NS_EMAIL
    };
      transport.sendMail(messageToCompany, function(err, info) {
        if (err) {
          res=JSON.stringify({'failed':'Something went wrong'})
          return res
        } else {
          res=JSON.stringify({'success': 'success'})
          return res
        }
      });
}

function mailCompanyMCnCU(data){
                                
  const messageToCompany = {
      from: process.env.SMTP_USER, 
      to: process.env.SMTP_USER,    
      subject: 'Inquiry from Website', 
      html: data,
      cc:[process.env.SALES_EMAIL,process.env.CC_NS_EMAIL,process.env.INFO_EMAIL]
    };
      transport.sendMail(messageToCompany, function(err, info) {
        if (err) {
          res=JSON.stringify({'failed':'Something went wrong'})
          return res
        } else {
          res=JSON.stringify({'success': 'success'})
          return res
        }
      });
}

function mailCompanyApplication(data,title){
                                            
  const messageToCompany = {
      from: process.env.SMTP_USER, 
      to: process.env.SMTP_USER,     
      subject: `${title}`, 
      html: data,
      cc:[process.env.INFO_EMAIL,process.env.CC_HR_EMAIL]
    };
      transport.sendMail(messageToCompany, function(err, info) {
        if (err) {
          res=JSON.stringify({'failed':'Something went wrong'})
          return res
        } else {
          res=JSON.stringify({'success': 'success'})
          return res
        }
      });
}

module.exports = {
    mailVisitor,
    mailCompanyHR,
    mailCompanyMCnCU,
    mailCompanyApplication
}
