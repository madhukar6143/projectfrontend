import React from 'react'
import CreateSymptom from '../SymptomOperations/CreateSymptom'
import EditOrDeleteSymptom from '../SymptomOperations/EditOrDeleteSymptom'

function SymptomRoutes() {
    return (
<div className='row'>
<div className='col-12 col-md-6'><CreateSymptom/></div>

<div className='col-0 col-md-6 mt-3'><EditOrDeleteSymptom/></div>

</div>
    )
}

export default SymptomRoutes
