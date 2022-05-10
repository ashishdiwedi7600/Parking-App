const accountSid = 'AC81a771df88dafea49f95158000290800';
const authToken = 'S........';
const client = require('twilio')(accountSid, authToken);


exports.sendMobileSMS = async ( body , to) => {
    return await client.messages.create({
        body,
        to,
        from: '+19704995417'
     }).then((r)=>console.log(r)).catch((e)=>{console.log(e)})
     
}  