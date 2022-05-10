import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { CheckOut } from '../Service/updateApi'
export default function ParkedModal(props) {
     const {visible,setVisible,setOpen,open,to_date,setSlots} = props
     const {from_date,vehicle_number,mobile_number,vehicle_category,slot_number} = props.slot   

     var date1 = new Date(from_date);
     var date2 = new Date(to_date);
     var Difference_In_Time = date2.getTime() - date1.getTime();
     var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
     Difference_In_Days=Math.ceil(Difference_In_Days)
     const [amount, setAmount] = useState('')


const handleClick=()=>{
     setVisible(!visible);
     setOpen(!open);
     const data = {
       from_date,to_date,vehicle_category,amount,vehicle_number,slot_number,mobile_number
     }
     console.log(data);
      CheckOut(data).then(res=>setSlots(res.data.data)).catch(e=>console.log(e))
}

  return (
    <>
    <Modal
                isOpen={visible}
                toggle={() =>{ setVisible(!visible);setOpen(!open)}}
              >
                <ModalHeader toggle={() =>{ setVisible(!visible);setOpen(!open)}}>
                  <h3 className='text-warning'>PVR PARKING</h3>
                </ModalHeader>
                <ModalBody>
                       <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                From Date : <input type="text" style={{ width: '20rem' }}
                 disabled
                name='from_date'
                defaultValue={from_date}
               />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                To Date : <input type="text" style={{ width: '20rem' }}
                disabled
                name='to_date'
                defaultValue={to_date}
               />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
               
              >
                Vehicle No : <input type="text" style={{ width: '20rem' }} 
                disabled
                 name='vehicle_number'
                 defaultValue={vehicle_number}
            />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                Contact no : <input type="text" style={{ width: '20rem' }}
                  disabled
                  name='mobile_number'
                  defaultValue={mobile_number}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                Days : <input type="text" style={{ width: '20rem' }}
                  disabled
                  name='days'
                  Value={Difference_In_Days}
                />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                 Amount : <input type="text" style={{ width: '20rem' }}
                onChange={(e)=>{setAmount(e.target.value)}}
                  name='amount'
                  Value={amount}
                />
              </div>
            </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={handleClick}
                    
                  >
                  checkout
                  </Button>

                  <Button onClick={() =>{ setVisible(!visible);setOpen(!open)}}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              </>
  )
}
