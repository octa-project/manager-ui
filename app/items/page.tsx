"use client"
import React, {useState} from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import {Space, Table, Tag} from 'antd';
import Modal from "@/app/components/Modal";
import { ColumnsType } from 'antd/es/table';

const ItemList = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    var isPriceModalOpen = false;
    // const [ isPriceModalOpen, setPriceModalOpen ] = useState(false);

    const openPriceModal = () => {
      isPriceModalOpen = true;
//      setPriceModalOpen(true);
    };

    const closePriceModal = () => {
      isPriceModalOpen = false;
      // setPriceModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    interface ItemInfo {
      key: React.ReactNode;
      name: string;
      barcode: string;
      group: string;
      branch: string;
      sellprice: string;
      childern?: ItemInfo[];
    }
  
    const columns: ColumnsType<ItemInfo> = [
      {
        title: 'Барааны нэр',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Баар код',
        dataIndex: 'barcode',
        key: 'barcode'
      },
      {
        title: 'Барааны ангилал',
        dataIndex: 'group',
        key: 'group'
      },
      {
        title: 'Салбар',
        dataIndex: 'branch',
        key: 'branch'
      },
      {
        title: 'Худалдах үнэ',
        dataIndex: 'sellprice',
        key: 'sellprice'
      },
      {
        title: 'Үйлдэл',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right'
      }
    ]
  
    const dataSource = [
      {
        key: 1,
        name: 'Coca cola',
        barcode: '2 баар код',
        group: 'Ус ундаа',
        branch: 'Бүх салбар',
        sellprice: '1500-5100',
        children: [
          {
            key: 11,
            name: 'Coca cola 500ml',
            barcode: '151515561561561511',
            group: '',
            branch: '',
            sellprice: '1900'
          },
          {
            key: 12,
            name: 'Coca cola 300ml',
            barcode: '151515561561561512',
            group: '',
            branch: '',
            sellprice: '1500'
          }
        ]
      },
      {
        key: 2,
        name: 'Bonaqua',
        barcode: '2 баар код',
        group: 'Ус ундаа',
        branch: 'Бүх салбар',
        sellprice: '1500-5100',
        children: [
          {
            key: 21,
            name: 'Bonaqua 500ml',
            barcode: '151515561561561511',
            group: '',
            branch: '',
            sellprice: '1900'
          },
          {
            key: 22,
            name: 'Bonaqua 300ml',
            barcode: '151515561561561512',
            group: '',
            branch: '',
            sellprice: '1500'
          }
        ]
      }
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
                                <input type="text" placeholder="Хайлт хийх"
                                       className="input input-bordered w-full max-w-xs"/>
                            </div>
                        </div>
                        <div className='dropdown'>
                            <label tabIndex={0} className="btn m-1">
                                Хийх үйлдлүүд
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" /></svg>
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a onClick={openModal}>Өгөгдлийн сангаас татах</a></li>
                                <li><a>Экселээс татах</a></li>
                                <li><a>Экселрүү буулгах</a></li>
                            </ul>
                            <button className="btn btn-active btn-info ml-3">Шинээр нэмэх</button>
                            <button className="btn btn-active btn-success ml-3">Хадгалах</button>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Table columns={columns} dataSource={dataSource}
                          onRow={(record, rowIndex) => {
                            return {
                              onMouseDown: event => {
                                openPriceModal;
                                console.log(record);
                              }
                              // onClick: event => {
                              //   openPriceModal
                              // }
                            }
                          }}
                        >
                        </Table>
                    </div>

                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-2xl text-black font-semibold mb-4">Modal Content</h2>
                        <p className="text-black">This is the content of the modal. You can add any components or text here.</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Close Modal
                        </button>
                    </div>
                </Modal>

                <Modal isOpen={isPriceModalOpen} onClose={closePriceModal}>
                    <div className="p-6">
                        <h2 className="text-2xl text-black font-semibold mb-4">Modal Content</h2>
                        <p className="text-black">This is the content of the modal. You can add any components or text here.</p>
                        <button
                            onClick={closePriceModal}
                            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Close Modal
                        </button>
                    </div>
                </Modal>

            </div>
        </main>
        </body>
    )
}

export default ItemList