const path = require('path');
const fs = require ('fs');
const login = path.join(__dirname,'../Storage/login.json');



exports.adminLogin = async(req,res,next)=>{
    const {username,password} = req.body
    const data = fs.readFileSync(login,'utf8')
    const dataJson = data ? JSON.parse(data) : [];
    let index = dataJson.findIndex(( v ) => v.username == username);
    if (index<0) return next(new Error("No admin found"));
    if (dataJson[index].password == password) return res.status(201).send({msg:'successfully login'})
    return next(new Error("Password not matched"));
}