import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { BookSlot } from '../Service/updateApi'
import '../App.css'
export default function UnParkedModal(props) {

console.log(props.visible);
  const { visible, setVisible,from_date,slot_num,setOpen,open,setSlots} = props
  

  const [BookingDetails, setBookingDetails] = useState({
    slot_number:`${slot_num}`,
    from_date: `${from_date}`,
    vehicle_number:'',
    mobile_number:'',
    vehicle_category:'Bike',
    
  })


  const handleClick = () => {
    setVisible(!visible)
    setOpen(!open)
    BookSlot(BookingDetails).then(res=>setSlots(res.data.data))

  }

  const handleChange=(e)=>{
    let key=e.target.name;
    let val=e.target.value;
    setBookingDetails({...BookingDetails,[key]:val})
  }
  console.log(BookingDetails);
  return (
    <>
      <div>

        <Modal isOpen={visible}
          toggle={() =>{ setVisible(!visible);setOpen(!open)}}>
            <ModalHeader toggle={() =>{ setVisible(!visible);setOpen(!open)}}>
                  <h3 className='text-warning'>PVR PARKING</h3>
                </ModalHeader>
        
          <ModalBody style={{ height: "auto" }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                From Date : <input type="text" style={{ width: '20rem' }}
                name='from_date'
                value={BookingDetails.from_date}
                onChange={handleChange} />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
               
              >
                Vehicle No : <input type="text" style={{ width: '20rem' }} 
                 name='vehicle_number'
                 value={BookingDetails.vehicle_number}
               onChange={handleChange}/>
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              
              >
                Contact no : <input type="text" style={{ width: '20rem' }}
                  name='mobile_number'
                  value={BookingDetails.mobile_number}
                onChange={handleChange} />
              </div>
              <div style={{ width: '100%', display: 'flex', gap: '10px' }}
              >
               Choose a car:
                <select name="vehicle_category" id="vehicle_category" onChange={handleChange} value={BookingDetails.vehicle_category}>
                  
                  <option value="Bike" >Bike</option>
                  <option value="Car">Car</option>
                  <option value="Heavy Truck">Heavy Truck</option>
                  <option value="Loader">Loader</option>
                  <option value="Mini Truck">Mini Truck</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleClick}
            >
              Book Slot
            </Button>

            <Button onClick={() =>{ setVisible(!visible);setOpen(!open)}}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}
