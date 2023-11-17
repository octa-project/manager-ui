import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Space, Table, Tag } from 'antd';

const ItemList = () => {

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <body>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className='flex-row lg:flex bg-[#e9e7e7]'>
            <SideBar></SideBar>
            <div className='h-full w-[calc(100%-15rem)] p-4'>

              <div className='flex'>
                <select className="select m-1 btn">
                  <option disabled selected>Барааны ангилал</option>
                  <option>Homer</option>
                  <option>Marge</option>
                  <option>Bart</option>
                  <option>Lisa</option>
                  <option>Maggie</option>
                </select>

                <details className="dropdown">
                  <summary className="m-1 btn">
                    Салбарууд
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                  </ul>
                </details>

                <details className="dropdown">
                  <summary className="m-1 btn">
                    Бүх бараагаар
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                  </ul>
                </details>
              </div>
              <div className='mt-3'>
                <Table dataSource={dataSource} columns={columns} />
              </div>
            </div>
        </div>
      </main>
    </body>
  )
}

export default ItemList