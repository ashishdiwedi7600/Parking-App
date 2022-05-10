const path = require('path');
const fs = require('fs');
const parkingSlot = path.join(__dirname, '../Storage/parkingSlot.json');
const { sendMobileSMS } = require('../Utils/TwilioSMS')

exports.updateSlotStatus = async (req, res, next) => {
    console.log(req.body);
    req.body.mobile_number = "+91" + req.body.mobile_number
    const msg = `Dear Customer, a quick reminder for your parking slot booking at PVR parking - it is reserved by today till the date you checkout.
Feel safe for your parked vehicle.
Kindly regards,admin from PVR parking.`
    const { slot_number, from_date,  vehicle_number,  vehicle_category, mobile_number } = req.body;
    const sentSMS = await sendMobileSMS(msg, mobile_number)
    const data = fs.readFileSync(parkingSlot, 'utf8')
    const dataJson = data ? JSON.parse(data) : [];
    const index = dataJson.findIndex((v) => v.slot_number == slot_number)
    if (index < 0) return next(new Error("No Slot Exist"))
    dataJson[index].from_date = from_date
    dataJson[index].vehicle_number = vehicle_number
    dataJson[index].vehicle_category = vehicle_category
    dataJson[index].mobile_number = mobile_number
    dataJson[index].slot_status = true
    fs.writeFile(parkingSlot, JSON.stringify(dataJson), () => { })
    fs.readFile(parkingSlot, async (err, dataSlot) => {
        if (err) return next(new Error("Something went wrong"))
        res.status(201).send({ msg: 'slot updated successfully', data: JSON.parse(dataSlot) })
    })

}

exports.checkout = async (req, res, next) => {
    const { slot_number, from_date, to_date, amount, vehicle_number, slot_status, vehicle_category, mobile_number } = req.body;
    const msg = `Dear Customer, your booked parking slot for your ${vehicle_category} having vehicle number ${vehicle_number} is going to checkout today.
Your total amount to be paid is Rs. ${amount}.
Thank you,Please visit us again.`
    const sentSMS = await sendMobileSMS(msg, mobile_number)
    const data = fs.readFileSync(parkingSlot, 'utf8')
    const dataJson = data ? JSON.parse(data) : [];
    const index = dataJson.findIndex((v) => v.slot_number == slot_number)
    if (index < 0) return next(new Error("No Slot Exist"))
    dataJson[index].from_date = "",
    dataJson[index].to_date = "",
    dataJson[index].amount = "",
    dataJson[index].vehicle_number = "",
    dataJson[index].vehicle_category = "",
    dataJson[index].slot_status = false,
    dataJson[index].mobile_number = "";
    fs.writeFile(parkingSlot, JSON.stringify(dataJson), () => { })
    fs.readFile(parkingSlot, async (err, dataSlot) => {
        if (err) return next(new Error("Something went wrong"))
        res.status(201).send({ msg: 'slot updated successfully', data: JSON.parse(dataSlot) })
    })


}