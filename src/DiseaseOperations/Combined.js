import React from 'react'
import EditOrDeleteDisease from './EditOrDeleteDisease'
import DisplayMapping from '../MappingOperations/DisplayMapping'

function Combined() {
    return (
        <diV className="row">
            <div className='col-6'>
<DisplayMapping/>
            </div>

           <div className='col-6'>
<EditOrDeleteDisease/>
           </div>

        </diV>
    )
}

export default Combined
