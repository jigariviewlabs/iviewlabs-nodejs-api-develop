const gCurrOpen =require('../models/dbQueries')

async function getCurrentOpening(req,res,next){

    const jdata=  await gCurrOpen.getCurrOpenings()
    const data = {
        "error" : false,
        "message" : "Success",
        "data" : jdata              
    }
    res.send(data); 
    
}
module.exports = {getCurrentOpening};