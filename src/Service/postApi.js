import axios from "axios"
import { URL } from "./endpoint"


 export  const LoginAdmin= async (adminDetail)=>{
    return await axios.post(`${URL}/api/PVR/parking/login`,adminDetail)
}