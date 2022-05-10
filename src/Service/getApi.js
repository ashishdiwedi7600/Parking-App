import axios from "axios"
import { URL } from "./endpoint"


 export  const getParkingSlots= async ()=>{
    return  await axios.get(`${URL}/api/PVR/parking`)
}