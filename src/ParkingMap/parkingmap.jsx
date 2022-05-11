import React, { useEffect, useState } from 'react'
import { getParkingSlots } from '../Service/getApi'
import './parkingMap.css'
import ParkedModal from './parkedModal'
import UnParkedModal from './unparkedModal'
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


  const handleClick = (slot, s_status,id) => {
 
    setVisible(!visible)
    setslotStatus(s_status)
    setOpen(!open)
    var BookDate = new Date();
    setSlotbooktime(BookDate);
    setSlot_number(slot); 
  }
  console.log("======>>>>", slots);
  return (
    <>
      <h1 className='m-auto text-center text-warning mt-3 mb-3'>PVR PARKING</h1>
      <Search handleSearch={handleSearch}  />
      <div style={{
        backgroundColor:'#e4d1b9',
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
              style={{display:"flex",justifyContent:'center',alignItems:'center',objectFit:'contain',
                borderRadius: '10px', marginBottom: '100px', backgroundColor: slot.slot_status ? 'skyblue':'green',
                height: '150px', minWidth: '150px',color:'white'
              }}
              
              onClick={() => handleClick(slot.slot_number, slot.slot_status,id)}>
             {slot.slot_status && <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg>}
              {slot.slot_number}
            </div>

            {slotstatus && open && (parseInt(slot_number) === parseInt(id)+1) && <ParkedModal visible={visible} setVisible={setVisible} 
              slot={slot}
              setSlots={setSlots}
              slot_number={slot_number}
              to_date={slotbooktime}
              setOpen={setOpen}
              open={open} />}

            {!slotstatus && open  && <UnParkedModal visible={visible} slot_num={slot_number} setSlots={setSlots}
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
