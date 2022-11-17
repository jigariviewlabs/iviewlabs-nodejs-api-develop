const pAppData = require('../models/dbQueries')
var lastid,aid,isactive,oid=0


async function openingApplication (req, res, next)  {

    const date_ob = new Date();
    const appdata = await pAppData.applicantInsert(req.body,date_ob)

    lastid = appdata['insertId']
    oid= req.body.titleid
    aid= lastid
    isactive=1

    const sappdata =await pAppData.openApplicationInsert(oid,aid,date_ob,isactive,date_ob,date_ob)
          
      if(appdata && sappdata){
        return res.status(200).send(JSON.stringify(`${aid}`));
      }
      else{
        return res.status(400).send(JSON.stringify({'failed':'Something went wrong'}));
      }
};

module.exports =  {openingApplication}