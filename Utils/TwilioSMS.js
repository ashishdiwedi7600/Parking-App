const accountSid = 'AC81a771df88dafea49f95158000290800';
const authToken = '28d3ffe9f4a2eaaa0d028f547bdef2e2';
const client = require('twilio')(accountSid, authToken);


exports.sendMobileSMS = async ( body , to) => {
    return await client.messages.create({
        body,
        to,
        from: '+19704995417'
     }).then((r)=>console.log(r)).catch((e)=>{console.log(e)})
     
}  