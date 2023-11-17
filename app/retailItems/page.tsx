// @jsxImportSource @react-ssr/next
"use client"
import React, { useEffect, useState } from 'react';
import ItemList from './retailItemList';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

// Mark this file as a client entry
// @jsxImportSource @react-ssr/next
export default function retailItemPage() {

    return (
        <div>
            <header>
                <Header></Header>
            </header>
            <div className='flex bg-[#e9e7e7]'>
                <SideBar/>
                <ItemList />

            </div>
            
        </div>
    );

}

