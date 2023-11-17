import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <nav className='bg-gray-800 flex justify-between items-center h-20 p-5'>
       <Image
            src="/logo_white.png"
            alt="Logo"
            className="dark:invert hover:cursor-pointer"
            width={150}
            height={45}
            priority
        />
        <div className='flex gap-6 list-none'>
            <button className="btn">Нэвтрэх</button>
        </div>
    </nav>
  )
}

export default Header