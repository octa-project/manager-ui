import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'

const CustomerList = () => {
  return (
    <body>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className='flex-row lg:flex bg-[#e9e7e7]'>
          <SideBar></SideBar>
          <div className='h-full w-[calc(100%-15rem)] p-4'>
              CustomerList
          </div>
        </div>
      </main>
    </body>
  )
}

export default CustomerList