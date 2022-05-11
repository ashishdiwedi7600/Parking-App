import React, { useEffect, useState } from 'react'
import { getParkingSlots } from '../Service/getApi'
import './parkingMap.css'
import ParkedModal from './parkedModal'
import UnParkedModal from './unparkedModal'
import HeavyTruck from '../images/delivery-truck-front.png'
import Truck from '../images/truck.png'
import Car from '../images/sedan-car-front.png'
import Bike from '../images/motorcycle.png'
import MiniTruck from '../images/minitruck.png'
import Search from './search'


export default function Parkingmap() {

  const [slots, setSlots] = useState([])
  const [slotstatus, setslotStatus] = useState('')
  const [visible, setVisible] = useState(null)
  const [slot_number, setSlot_number] = useState('')
  const [slotbooktime, setSlotbooktime] = useState('')
  const [searchTerm, setSearchTerm] = useState("")

  const [open, setOpen] = useState(false)

  useEffect(() => {

    getParkingSlots().then(res => setSlots(res.data.data)).catch(e => console.log(e))

  }, [])
  const handleSearch = e => {
    setSearchTerm(e.target.value)
    console.log(searchTerm);

}


  const handleClick = (slot, s_status, id) => {

    setVisible(!visible)
    setslotStatus(s_status)
    setOpen(!open)
    var BookDate = new Date();
    setSlotbooktime(BookDate);
    setSlot_number(slot);
  }
  return (
    <>
      <h1 className='m-auto text-center text-warning mt-3 mb-3'>PVR PARKING</h1>
      <Search handleSearch={handleSearch}  />
      <div style={{
        backgroundColor: 'lightgray', borderRadius: '10px',marginBottom:'5px',
        height: 'auto', width: '98%', display: 'flex', gap: '15px', padding: '20px', flexWrap: 'wrap', justifyContent: 'space-evenly', border: '1px solid red', margin: 'auto'

      }}>

        {slots.filter((slot) => {
                        if (searchTerm === "")
                            return slot

                        else if (slot.vehicle_number.toLowerCase().includes(searchTerm.toLowerCase()))
                            return slot
                        
                    }).map((slot,id) => {
          return <>
            <div className='slots'
              style={{display:"flex",justifyContent:'center',alignItems:'center',objectFit:'contain',position:'relative',flexDirection:'column',
                borderRadius: '10px', marginBottom: '100px', backgroundColor: slot.slot_status ? 'skyblue':'rgb(8,146,208)',
                height: '150px', minWidth: '150px',color:'white'
              }}
              onClick={() => handleClick(slot.slot_number, slot.slot_status, id)}>

             {slot.slot_status && <div className='slot-hover'   >
               {slot.from_date}
               <br/>
               Slot No:{slot.slot_number}
              </div>}
              {slot.slot_status && slot.vehicle_category == "Car" && <img src={Car} style={{ height: '50%', width: '50%' }} />}
              {slot.slot_status && slot.vehicle_category == "Bike" && <img src={Bike} style={{ height: '50%', width: '50%' }} />}
              {slot.slot_status && slot.vehicle_category == "Loader" && <img src={Truck} style={{ height: '50%', width: '50%' }} />}
              {slot.slot_status && slot.vehicle_category == "Heavy Truck" && <img src={HeavyTruck} style={{ height: '50%', width: '50%' }} />}
              {slot.slot_status && slot.vehicle_category == "Mini Truck" && <img src={MiniTruck} style={{ height: '50%', width: '50%' }} />}
            <b>{slot.slot_number}</b>  
            </div>

            {slotstatus && open && (parseInt(slot_number) === parseInt(id)+1) && <ParkedModal visible={visible} setVisible={setVisible} 
              slot={slot}
              setSlots={setSlots}
              slot_number={slot_number}
              to_date={slotbooktime}
              setOpen={setOpen}
              open={open} />}

            {!slotstatus && open && <UnParkedModal visible={visible} slot_num={slot_number} setSlots={setSlots}
              setOpen={setOpen}
              id={id}
              open={open}
              setVisible={setVisible} from_date={slotbooktime} />}
          </>
        })}
      </div>

    </>
  )
}
