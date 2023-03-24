import React from 'react'
import CreateDisease from '../DiseaseOperations/CreateDisease'
import EditOrDeleteDisease from '../DiseaseOperations/EditOrDeleteDisease'

function DiseaseRoutes() {
    return (
        <div className='row'>
            <div className='col-12 col-md-6'><CreateDisease/></div>
          
            <div className='col-0 col-md-6 '><EditOrDeleteDisease/></div>
           
            
            
            
        </div>
    )
}

export default DiseaseRoutes
