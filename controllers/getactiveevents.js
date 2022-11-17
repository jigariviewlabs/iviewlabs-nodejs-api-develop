const gActEvent =require('../models/dbQueries')

async function getActiveEvents(req,res,next){

    const date = req.body.inputdate
    const jdata=  await gActEvent.getActEvent()
    const data = {
        "events" : jdata              
    }
    return res.status(200).send(JSON.stringify(data));
    // res.send(data); 
    
}
module.exports = {getActiveEvents};