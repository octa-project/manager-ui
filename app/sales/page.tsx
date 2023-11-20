"use client"
import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Modal from "@/app/components/Modal";

interface SaleHeaders {
    id: number;
    date: string;
    total_items: string;
    total_amount: string;
  }
  
  interface Result {
    code: string;
    message: string;
    isSuccess: boolean;
    data: SaleHeaders[];
  }

  interface SaleItems {
    itemBarcode: string;
    itemName: string;
    unitSalePrice: number;
    qty: number;
  }

  interface Resultt {
    code: string;
    message: string;
    isSuccess: boolean;
    data: SaleItems[];
  }

const Sales = () => {

    useEffect(() => {
        getAllItems();
    },[]);

    const [saleHeaders, setSaleHeaders] = useState<SaleHeaders[]>([]);
    const [saleItems, setSaleItems] = useState<SaleItems[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [saleId, setSaleId] = useState('');

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleOpenModal = (item: SaleHeaders) => {
        setModalOpen(true);
        setSaleId(item.id);
        getSaleItem();
    };

    const getAllItems = async () => {
        try {
            const response = await fetch('http://43.231.114.193:8080/manager/pos-sales', { method: 'GET', });

            if (response.ok) {
            const result: Result = await response.json();
            setSaleHeaders(result.data);
        } else {
            console.error('Error fetching items:', response.status, response.statusText);
        }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const getSaleItem = async () => {
        try {
            const response = await fetch('http://43.231.114.193:8080/manager/pos-sale-item?id=' + saleId, { method: 'GET', });
            if (response.ok) {
                const result: Resultt = await response.json();
                setSaleItems(result.data);
                console.log(result);
            }
            else {
                console.error('Error fetching items:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

  return (
    <body>
    <header>
      <Header></Header>
    </header>
    <main>
      <div className='flex-row lg:flex bg-[#e9e7e7]'>
        <SideBar></SideBar>
        <div className='h-[calc(100vh-5rem)] w-[calc(100%-15rem)] p-4 overflow-scroll'>
            <table className="table-auto min-w-full  bg-white border border-gray-300">
                <thead className='bg-gray'>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">№</th>
                        <th className="py-2 px-4 border-b text-left">Огноо</th>
                        <th className="py-2 px-4 border-b text-left">Нийт бараа</th>
                        <th className="py-2 px-4 border-b text-left">Нийт дүн</th>
                        <th className="py-2 px-4 border-b text-left">Үйлдэл</th>
                    </tr>
                </thead>
                <tbody>
                    {saleHeaders.map((item) => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-b">{item.id}</td>
                            <td className="py-2 px-4 border-b">{item.date}</td>
                            <td className="py-2 px-4 border-b">{item.total_items}</td>
                            <td className="py-2 px-4 border-b">{item.total_amount}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleOpenModal(item)} className="bg-blue-400 text-white px-2 py-1 rounded">Харах</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="p-6 min-w-full">
                <h2 className="text-2xl text-black font-semibold">Борлуулалтын дугаар №{saleId}</h2>
                <div className='w-full mt-4'>
                    <table className="table-auto min-w-full  bg-white border border-gray-300">
                        <thead className='bg-gray'>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Баар код</th>
                                <th className="py-2 px-4 border-b text-left">Нэр</th>
                                <th className="py-2 px-4 border-b text-left">Нэгж үнэ</th>
                                <th className="py-2 px-4 border-b text-left">Тоо</th>
                                <th className="py-2 px-4 border-b text-left">Нийт дүн</th>
                            </tr>
                        </thead>
                        <tbody>
                            {saleItems.map((item) => (
                                <tr key={item.itemBarcode}>
                                    <td className="py-2 px-4 border-b">{item.itemBarcode}</td>
                                    <td className="py-2 px-4 border-b">{item.itemName}</td>
                                    <td className="py-2 px-4 border-b">{item.unitSalePrice}</td>
                                    <td className="py-2 px-4 border-b">{item.qty}</td>
                                    <td className="py-2 px-4 border-b">{item.qty * item.unitSalePrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='flex mt-10 justify-end'>
                    <button
                        onClick={closeModal}
                        className="ml-2 bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
                        Болих
                    </button>
                </div>
            </div>
        </Modal>

      </div>
    </main>
  </body>
  )
}

export default Sales