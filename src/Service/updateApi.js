import axios from "axios"
import { URL } from "./endpoint"


 export  const BookSlot= async (bookingDetails)=>{
    return await  axios.patch(`${URL}/api/PVR/parking/booking`,bookingDetails)
}

export  const CheckOut= async (data)=>{
    return await  axios.patch(`${URL}/api/PVR/parking/checkout`,data)
}