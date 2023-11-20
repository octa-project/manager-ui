import React from 'react'
import Image from 'next/image'
import Link from "next/link";

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
                <Link href="http://localhost:3002">
                    <button className="btn">
                        <Image src="/cashier-machine.png" alt="icon" width={45} height={45}></Image>
                        POS
                    </button>
                </Link>
                <button className="btn">Нэвтрэх</button>
            </div>


        </nav>
    )
}

export default Header