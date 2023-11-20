"use client"
import React, {useEffect, useState} from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import {Space, Table, Tag, notification, Button } from 'antd';
import Modal from "@/app/components/Modal";
import {ColumnsType} from 'antd/es/table';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ItemList = () => {

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string) => {
        api[type]({
          message: 'Амжилттай',
          description: message,
        });
      };


    const [barcode, setBarcode] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [sellPrice, setSellPrice] = useState('');

    const [isModalOpen, setModalOpen] = useState(false);
    const [newItemModalOpen, setNewItemModalOpen] = useState(false);
    const [convertedList, setConvertedList] = useState<SkuToPosData[]>([]);
    
    const openNewItemModal = () => {
        setBarcode('')
        setCode('')
        setName('')
        setSellPrice('')
        setNewItemModalOpen(true);
    };

    const closeNewItemModal = () => {
        setNewItemModalOpen(false);
    };
    const [items, setItems] = useState<Item[]>([]);
    const [dataSourceData, setDataColumns] = useState<DataSourceData[]>([]);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        getAllItemGroup();
        getAllItem();
        setConvertedList(sda);

    }, []); // The empty dependency array [] means this effect will only run once, similar to componentDidMount


    const sda = () => {
        // Map through dataSourceData and its children to create SkuToPosData array
        return  dataSourceData.flatMap((element) =>
          element.children.flatMap((child) => ({
            barcode: child.barcode,
            name: child.name,
            code: child.group,
            sellPrice: child.sellPrice,
            deleted: !child.hasVat
          }))
        );
        //
        // console.log("11111" + convertedData)
        // return convertedData;
      };

    interface Item {
        internalCode: number;
        name: string;
        groupName: string;
    }

    interface Result {
        code: string;
        message: string;
        isSuccess: boolean;
        data: any[];
    }

    interface Res {
        code: string;
        message: string;
        isSuccess: boolean;
        data: any[];
    }

    interface DataSourceData {
        internalCode: number,
        name: string,
        barcode: string,
        groupName: string,
        branch: string,
        sellPrice: string,
        children: [
            {
                itemCode: number,
                name: string,
                barcode: string,
                group: string,
                branch: string,
                sellPrice: number,
                hasVat: boolean
            }
        ]
    };

    interface SkuToPosData {

        barcode: string,
        name: string,
        code: string,
        sellPrice: number,
        deleted: boolean,

    }

    interface SourceItem {
        internalCode: number;
        name: string;
        groupName: string;
        children: SourceChildItem[];
    }

    interface SourceChildItem {
        itemCode: number;
        sellPrice: number;
        supplierSellPrice: number;
        name: string;
        barcode: string;
        measurement: number;
        hasVat: boolean;
        hasCityTax: boolean;
    }


    const getAllItemGroup = async () => {
        try {
            const response = await fetch('http://43.231.114.193:8081/item/get-item-codes', {method: 'GET',});


            if (response.ok) {
                const result: Result = await response.json();

                setItems(result.data);
            } else {
                console.error('Error fetching items:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const getAllItem = async () => {
        try {
            const response = await fetch('http://43.231.114.193:8081/item/get-all', {method: 'GET',});
            console.log(response)
            if (response.ok) {
                const result: Res = await response.json();

                setDataColumns(result.data);
            } else {
                console.error('Error fetching items:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const saveNewItem = async () => {
        try {
            const body = {
                barcode: barcode,
                name: name,
                code: code,
                sellPrice: sellPrice
            }

            const response = await fetch('http://43.231.114.215:8400/item/save-item', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const result = await response.json();
                if (result.code == "200") {
                  openNotificationWithIcon('success', 'Амжилттай хадгалалаа')
                  closeNewItemModal()
                }
                console.log('Update item result:', result);
              } else {
                openNotificationWithIcon('error', response.statusText)
                console.error('Error updating item:', response.status, response.statusText);
              }
        }
        catch (error) {
            console.error('Error updating item:', error);
        }

    }

    const setAllItem = async () => {
        const convertedData = sda();
        setConvertedList(convertedData);
        // debugger
        // const transformData = (sourceData: DataSourceData[]): SkuToPosData[] => {
        //     return sourceData.flatMap((sourceItem) =>
        //         sourceItem.children.map((child) => ({
        //         barcode: child.barcode,
        //         name: child.name,
        //         code: child.group.toString(), // Assuming itemCode should be used as code
        //         sellPrice: child.sellPrice,
        //         deleted: !child.hasVat,
        //     }))
        //     );
        // };


    
        try {
            const response = await fetch('http://43.231.114.215:8400/item/save-items', {


                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },


                body: JSON.stringify(convertedData),
            });
            
            if (response.ok) {
                const result = await response.json();
                openNotificationWithIcon('success', 'Амжилттай хадгалалаа')
                console.log('Save successful:', result);
            } else {
                console.error('Error saving items:', response.status, response.statusText);
                openNotificationWithIcon('error', response.statusText)
            }
        } catch (error) {
            console.error('Error saving items:', error);
        }
    };


    interface ItemInfo {
        internalCode: React.ReactNode;
        name: string;
        barcode: string;
        group: string;
        branch: string;
        sellprice: string;
        items?: ItemInfo[];
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
            dataIndex: 'groupName',
            key: 'groupName'
        },
        {
            title: 'Салбар',
            dataIndex: 'internalCode',
            key: 'internalCode'
        },
        {
            title: 'Худалдах үнэ',
            dataIndex: 'itemCode',
            key: 'itemCode'
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
                        <div>
                            <div className='dropdown'>
                                <label tabIndex={0} className="btn m-1">
                                    Хийх үйлдлүүд
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 9l6 6 6-6"/>
                                    </svg>
                                </label>
                                <ul tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={openModal}>Өгөгдлийн сангаас татах</a></li>
                                    <li><a>Экселээс татах</a></li>
                                    <li><a>Экселрүү буулгах</a></li>
                                </ul>
                            </div>
                            {contextHolder}
                            <button className="btn btn-info text-white ml-3" onClick={openNewItemModal}>Шинээр нэмэх</button>
                            {contextHolder}
                            <button className="btn btn-success text-white ml-3" onClick={setAllItem}>Хадгалах</button>
                        </div>
                    </div>
                    <div className='mt-3 h-40'>
                        <Table columns={columns} dataSource={dataSourceData} pagination={{ pageSize: 50 }} scroll={{ y: 650 }}
                               onRow={(record, rowIndex) => {
                                   return {
                                       onMouseDown: event => {
                                           console.log(record);
                                       }
                                   }
                               }}
                        >
                        </Table>
                    </div>

                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="p-6">
                        <h2 className="text-2xl text-black font-semibold mb-4">Барааны мэдээлэл татах</h2>
                        <p className="text-black">Таны эрхэлж буй бузнесийн төрөлд хамаарах дараах бараа материалаас
                            сонгон өөрийн систем рүү татан ашиглах боломжтой</p>
                        <select className="select select-bordered max-w-xs">
                            <option disabled selected>Барааны ангилал</option>
                            {items.map((item) => (

                                <option key={item.name} className="text-black">{item.name}
                                </option>

                            ))}

                        </select>

                        <select className="select select-bordered max-w-xs ml-3">
                            <option disabled selected>Татварын төрөл</option>
                        </select>

                        <select className="select select-bordered max-w-xs ml-3">
                            <option disabled selected>Салбар</option>
                        </select>

                        <button
                            onClick={closeModal}
                            className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Татах
                        </button>
                    </div>
                </Modal>

                <Modal isOpen={newItemModalOpen} onClose={closeNewItemModal}>
                    <div className="p-6 min-w-full">
                        <h2 className="text-2xl text-black font-semibold">Шинэ бараа нэмэх</h2>
                        <div className='w-full max-w-xs'>
                            <div className='mt-3'>Баар код:</div>
                            <input type="text" placeholder="Баар код" value={barcode} onChange={e => setBarcode(e.currentTarget.value)} className="mt-1 input input-bordered w-full max-w-xs" />

                            <div className='mt-3'>Барааны нэр:</div>
                            <input type="text" placeholder="Барааны нэр" value={name} onChange={e => setName(e.currentTarget.value)} className="mt-1 input input-bordered w-full max-w-xs" />

                            <div className='mt-3'>Барааны код:</div>
                            <input type="text" placeholder="Барааны код" value={code} onChange={e => setCode(e.currentTarget.value)} className="mt-1 input input-bordered w-full max-w-xs" />

                            <div className='mt-3'>Худалдах үнэ:</div>
                            <input type="number" placeholder="Худалдах үнэ" value={sellPrice} onChange={e => setSellPrice(e.currentTarget.value)} className="mt-1 input input-bordered w-full max-w-xs" />
                        </div>
                        <div className='flex mt-10'>
                            <button
                                onClick={saveNewItem}
                                className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                                Нэмэх
                            </button>
                            <button
                                onClick={closeNewItemModal}
                                className="ml-5 bg-black hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full">
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

export default ItemList;