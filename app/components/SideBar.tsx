import Link from 'next/link'
import React from 'react'

const SideBar = () => {
  return (

    // <div className='flex-row lg:flex'>
        <div className='flex flex-col w-60 p-3 bg-white shadow lg:h-[calc(100vh-5rem)] lg:w-60'>
            <div className='flex-1'>
                <ul className='pt-2 pb-4 space-y-1 text-sm'>
                    <li className='rounded hover:bg-slate-100'>
                        <Link href='/items' className='flex items-center p-2 space-x-3 rounded-md'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"
                                />
                                <path d="M13 3v6h6"/>
                            </svg>
                            <span className='text-l font-bold'>Бараа материал</span>
                        </Link>
                    </li>

                    <li className='rounded hover:bg-slate-100'>
                        <Link href='/retailItems' className='flex items-center p-2 space-x-3 rounded-md'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V9l-7-7z"
                                />
                                <path d="M13 3v6h6"/>
                            </svg>
                            <span className='text-l font-bold'>Посын бараа</span>
                        </Link>
                    </li>

                    <li className='rounded hover:bg-slate-100'>
                        <Link href='/customer' className='flex items-center p-2 space-x-3 rounded-md'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span className='text-l font-bold'>Харилцагч</span>
                        </Link>
                    </li>

                    <li className='rounded hover:bg-slate-100'>
                        <Link href='/config' className='flex items-center p-2 space-x-3 rounded-md'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span className='text-l font-bold'>Баримтын тохиргоо</span>
                        </Link>
                    </li>

                    <li className='rounded hover:bg-slate-100'>
                        <Link href='/sales' className='flex items-center p-2 space-x-3 rounded-md'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}>
                                <circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"
                                />
                            </svg>
                            <span className='text-l font-bold'>Борлуулалт</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    // </div>
  )
}

export default SideBar