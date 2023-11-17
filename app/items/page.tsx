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

              <div className='flex justify-between'>
                <div className='flex'>
                  <select className="select select-bordered max-w-xs">
                    <option disabled selected>Барааны ангилал</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>

                  <select className="select select-bordered max-w-xs ml-3">
                    <option disabled selected>Салбарууд</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>

                  <select className="select select-bordered max-w-xs ml-3">
                    <option disabled selected>Бүх бараагаар</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>

                  <div className='ml-3'>
                    <input type="text" placeholder="Хайлт хийх" className="input input-bordered w-full max-w-xs" />
                  </div>
                </div>
                <div className='flex'>
                  <select className="select select-bordered max-w-xs ml-3">
                    <option disabled selected>Хийх үйлдлүүд</option>
                    <option>Өгөгдлийн сангаас татах</option>
                    <option>Экселээс татах</option>
                    <option>Экселрүү буулгах</option>
                  </select>
                  <button className="btn btn-active btn-info ml-3">Шинээр нэмэх</button>
                  <button className="btn btn-active btn-success ml-3">Хадгалах</button>
                </div>
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