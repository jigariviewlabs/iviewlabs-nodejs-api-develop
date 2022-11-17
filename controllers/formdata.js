const pvisitormail = require('../utils/sendMail')
const db = require('../utils/db');
const ejs = require('ejs');

async function visitordata(req, res, next) {

    const {name,email,contactnumber,companyname,websitelink,companysize,roles,lookingfor,budget,aboutus,comments}=req.body;
    const id = req.params.id;
    if (name && email && contactnumber && companyname && websitelink  &&companysize && roles && lookingfor && budget && aboutus && comments)
    {
        const result = await db.query(`UPDATE visitordata SET submit = 'done' WHERE id = '${id}'`)
        .then((rows) => {
            console.log("1 record inserted, ID: " + id, rows)         
        })
        .catch((err) => {
                    console.log("err", err)
        })         
        try {
            ejs.renderFile("./views/visitor-email-company.ejs", { name: name, email: email, companyname: companyname, mobile: contactnumber, websitelink: websitelink, companysize: companysize,roles: roles,lookingfor:lookingfor,budget:budget,aboutus:aboutus}, function (err, data) {
                if (data) {
                    pvisitormail.mailCompanyMCnCU(data)
                    ejs.renderFile("./views/visitor-email-visitor.ejs", { name: name }, function (err, data) {
                        if (data) {
                            const resp = pvisitormail.mailVisitor(email, data)
                            return res.status(200).send(resp);
                        }
                    });
                }
            });
            
        } catch (error) {
            console.log(error.message);
        }
    }
        else{
            res.send({ "status": "error", "message": "provide all feilds"})
        }
    
    
    

}
async function next(req, res) {
    const { name, email, contactnumber, companyname, websitelink, companysize, roles, lookingfor, budget, aboutus, comments, submit } = req.body;
    const id = req.params.id;
    console.log("id",id);
    console.log("name", name);
    if (id == 0) {
        const result = await db.query(`INSERT INTO visitordata (name) VALUES ('${name}')`)
            .then((rows) => {
                console.log("1 record inserted, ID: " + rows.insertId, rows)
                res.send({ "status": "success", "id": rows.insertId, "name": name })
            })
            .catch((err) => {
                console.log("err", err)
            })

    }
    else {
        if (id !== null) {
            const result = await db.query(`UPDATE visitordata SET name = '${name}',email = '${email}',contactnumber ='${contactnumber}',companyname = '${companyname}',websitelink = '${websitelink}',companysize = '${companysize}',roles = '${roles}',lookingfor = '${lookingfor}',budget = '${budget}',aboutus = '${aboutus}',comments = '${comments}',submit = '${submit}' WHERE id = '${id}'`)
                .then((rows) => {
                    console.log("1 record inserted, ID: " + id, rows)
                    res.send({ "status": "success", "id": id })
                })
                .catch((err) => {
                    console.log("err", err)
                })
        }
    }
   
}
module.exports = { visitordata,next };