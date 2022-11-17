const db = require('../utils/db');





async function getCurrOpenings(){
    const data = await db.query(
      `SELECT * FROM opening WHERE isactive=?`, 
      [1]
    );

    return data
}

async function getActEvent(){
  const data = await db.query(
    `SELECT * FROM eventmaster WHERE isactive=?`, 
    [1]
  );

  return data
}

async function contactUs(name,email,type,details,mobile,country,createdon){
    const result = await db.query(
      `INSERT INTO contactus 
      (name, email, type, requirements,createdon, mobile, country) 
      VALUES 
      (?,?,?,?,?,?,?)`, 
      [
        name,email,type,details,createdon,mobile,country
      ]
    );
    return result;
  }

async function hireResource(name,email,resource,details,mobile,country,model,createdon){
    const result = await db.query(
      `INSERT INTO hireresource 
      (name, email, contact, country, resourcetohire, model, details  ,createdon) 
      VALUES 
      (?,?,?,?,?,?,?,?)`, 
      [
        name,email,mobile,country,resource,model,details,createdon
      ]
    );
    return result;
  } 

async function modalContactUs(email,casestudy,mobile,country){
    const result = await db.query(
      `INSERT INTO inquiry 
      (email, casestudy, mobile, country) 
      VALUES 
      (?,?,?,?)`, 
      [
        email,casestudy,mobile,country
      ]
    );
    return result;
  } 

function applicantInsert(body,date){
    var resid=0
    const result = db.query(
      `INSERT INTO applicant 
      (name, email, contactno, country, createdon, modifiedon) 
      VALUES 
      (?,?,?,?,?,?)`, 
      [
        body.name,body.email,body.mobile.slice(-10),body.country,date,date
      ],
      function (err,res) {
          return res.insertId
      }
    );
    return result;
  } 

function openApplicationInsert(oid,aid,date_ob,isactive,date_ob,date_ob){
    const result = db.query(
      `INSERT INTO openingapplication 
      (oid, aid, applieddate, isactive, createdon, modifiedon) 
      VALUES 
      (?,?,?,?,?,?)`, 
      [
        oid,aid,date_ob,isactive,date_ob,date_ob
      ]
    );
    return result;
  } 

function sendOpeningApplication(resume,isActive,modifiedon,aid){
    const result = db.query(
      `UPDATE applicant SET resume=?,isactive=?,modifiedon=? WHERE aid=?`, 
      [
        resume,isActive,modifiedon,aid
      ]
    );
    return result;
  } 
  
  module.exports = {
    getCurrOpenings,
    contactUs,
    hireResource,
    modalContactUs,
    applicantInsert,
    openApplicationInsert,
    sendOpeningApplication,
    getActEvent
  }