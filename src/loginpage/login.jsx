import React, { useState } from 'react'
import './login.css'
import { LoginAdmin } from '../Service/postApi'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
 
const navi = useNavigate();

 const [adminLogin, setAdminLogin] = useState(
     {
        username:"",
        password:""
     }
 )
  
 const handleChange=(e)=>{
    let key = e.target.name
    let val = e.target.value
   setAdminLogin({...adminLogin,[key]:val})
 }
 const handleSubmit= async (e)=>{
    e.preventDefault();
    await LoginAdmin(adminLogin)
    .then(res =>{
        if(res.data.msg) {
            toast('Login Successfull')
            navi('/parkingMap')
        }
    }
    )
    .catch(e=>{toast.warn('Invalid Credentials')})
 }
  return (
<>
<ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
            />
<div class="login-form">
    

<h1  style={{textAlign:'center'}} className='text-warning'>PVR PARKING </h1>
    <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>    
        <h2 class="text-center">Log in</h2>       
        <div class="form-group  mt-10  ">
            <input
            name='username'
            value={adminLogin.username}
            onChange={handleChange}
             type="text" class="form-control" placeholder="Username" required="required"/>
        </div>
        <div class="form-group mt-10 ">
            <input 
               name='password'
            value={adminLogin.password}
               onChange={handleChange}
            type="password" class="form-control" placeholder="Password" required="required"/>
        </div>
        <div class="form-group mt-10 ">
            <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>               
    </form>
  
</div>


</>  )
}
