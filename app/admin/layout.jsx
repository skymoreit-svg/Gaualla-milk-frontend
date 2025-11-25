import React from 'react'
import Sidebar from './adminCompo/Sidebar'

const layout = ({children}) => {
  return (
    <div className='flex'>
        
<Sidebar />
        <div className='w-full h-screen overflow-auto'>
            {children}
        </div>
    </div>   
  )
}

export default layout