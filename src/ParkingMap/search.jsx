import React from 'react'


export default function Search(props) {
    
    return (
        <>
            <div className='d-flex justify-content-end h-25 w-25 m-3 gap-2' style={{ placeItems: 'end' }}>
                
                <input type="text" className='form-control'  placeholder='Search by Vehicle number'onChange={props.handleSearch} />
                              
                 
            </div>
        </>
    )
}
