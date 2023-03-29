import React from 'react'
import InsertDisease from '../MappingOperations/InsertDisease'
import EditOrDelete from '../MappingOperations/EditOrDelete'
import DisplayMapping from '../MappingOperations/DisplayMapping'
import Display from '../MappingOperations/display'

function MappedRoutes() {
    return (


<div className='row'>
<div className='col-12 col-md-6 mt-3'><DisplayMapping/></div>

<div className='col-0 col-md-6 mt-3'><Display/></div>

</div>
        
        
        
     
    )
}

export default MappedRoutes
