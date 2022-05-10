const path = require('path');
const fs = require ('fs');
const parkingSlot = path.join(__dirname,'../Storage/parkingSlot.json');

exports.getSlots=(req,res,next)=>{
    const data = fs.readFileSync(parkingSlot,'utf8')
    const dataJson = data ? JSON.parse(data) : [];
    res.status(201).send({msg:'slot fetched successfully',data:dataJson})

}
