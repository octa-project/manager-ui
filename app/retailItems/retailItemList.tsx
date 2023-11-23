import React, { useState, useEffect, useMemo } from 'react';
import { Button, Modal, TextField } from "@mui/material";
import Item from 'antd/es/list/Item';
import {Space, Table, Tag, notification } from 'antd';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Item {
  id: number;
  name: string;
  barcode: string;
  code: string;
  sellPrice: number;
}

interface Result {
  code: string;
  message: string;
  isSuccess: boolean;
  data: Item[];
}

function retailItemList() {

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, message: string) => {
    api[type]({
      message: 'Амжилттай',
      description: message,
    });
  };


  const [items, setItems] = useState<Item[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState('1');

  const [id, setId] = useState('');
  const [barcode, setBarcode] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [sellPrice, setSellPrice] = useState('');

  const containerStyle = useMemo(() => ({ width: '100%', height: '90%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  // <td className="py-2 px-4 border-b">{item.id}</td>
  // <td className="py-2 px-4 border-b">{item.name}</td>
  // <td className="py-2 px-4 border-b">{item.barcode}</td>
  // <td className="py-2 px-4 border-b">{item.code}</td>
  // <td className="py-2 px-4 border-b">{item.sellPrice}</td>

  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', headerName: 'Код' },
    { field: 'name', headerName: 'Барааны нэр', filter: "agTextColumnFilter" },
    { field: 'barcode', headerName: 'Баркод', filter: "agTextColumnFilter" },
    { field: 'code', headerName: 'Дотоод код', filter: "agTextColumnFilter" },
    { field: 'sellPrice', headerName: 'Худалдах үнэ' }
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      cellDataType: false,
      resizable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  const handleButtonClick = (newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };

  const handleOpenModal = (item: Item) => {
    setOpenModal(true);
    setId(item.id.toString())
    setBarcode(item.barcode)
    setCode(item.code)
    setName(item.name)
    setSellPrice(item.sellPrice.toString())
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleSellPriceChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSellPrice(event.target.value);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      const response = await fetch('http://43.231.114.215:8400/item/get-all-items', { method: 'GET', });


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

  const updateItem = async () => {
    try {

      const body = {
        id: id,
        barcode: barcode,
        name: name,
        code: code,
        sellPrice: sellPrice
      }

      console.log(body)

      const response = await fetch('http://43.231.114.215:8400/item/update-item', {
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
          // alert("амжилттай өөрчлөгдлөө");
          getAllItems()
          handleCloseModal()
        }
        console.log('Update item result:', result);
      } else {
        openNotificationWithIcon('error', response.statusText)
        console.error('Error updating item:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className='flex-auto p-5'>
      <button onClick={getAllItems} className="bg-blue-500 text-white px-2 py-1 mb-3 rounded">Бараанууд дуудах</button>

      <div style={containerStyle}>

            <div className="ag-theme-alpine" style={gridStyle}>

                <AgGridReact
                    rowData={items} // Row Data for Rows
                    columnDefs={columnDefs} // Column Defs for Columns
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
                    defaultColDef={defaultColDef}
                    enableRangeSelection={true}
                    enableFillHandle={true}
                    ensureDomOrder={true}
                    sideBar={true}
                    onRowDoubleClicked={(e) => handleOpenModal(e.data)}
                    // onRowDoubleClicked={(e) => console.log('aa', e.data)}
                    />
            </div>
        </div>

      {/* <table className="min-w-full bg-white border border-gray-300">
        <thead className='bg-gray'>
          <tr>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b text-left">Id</th>
            <th className="py-2 px-4 border-b text-left">Барааны нэр</th>
            <th className="py-2 px-4 border-b text-left">Баркод</th>
            <th className="py-2 px-4 border-b text-left">Дотоод Код</th>
            <th className="py-2 px-4 border-b text-left">Зарах үнэ</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">
              {contextHolder}
                <button onClick={() => handleOpenModal(item)} className="bg-blue-500 text-white px-2 py-1 rounded">Засах</button>
              </td>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.barcode}</td>
              <td className="py-2 px-4 border-b">{item.code}</td>
              <td className="py-2 px-4 border-b">{item.sellPrice}</td>
            </tr>
          ))}

        </tbody>

      </table> */}
      <div>
        <Modal
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={handleCloseModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            backgroundColor: '#f6f6f6',
            padding: '20px',
            borderRadius: '8px',
          }}>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <div>Барааны нэр</div>
                <div className="text-left text-black font-bold text-lg">
                  <TextField id="" variant="outlined" defaultValue={name} onChange={handleNameChange} />
                </div>
              </div>
              <div>
                <div>Баркод</div>
                <div className="text-left text-black font-bold text-lg">
                  <TextField variant="outlined" value={barcode} />
                </div>
              </div>
              <div>
                <div>Дотоод</div>
                <div className="text-left text-black font-bold text-lg">
                  <TextField variant="outlined" value={code} />
                </div>
              </div>
              <div>
                <div>Зарах үнэ</div>
                <div className="text-left text-black font-bold text-lg">
                  <TextField variant="outlined" type="number" defaultValue={sellPrice} onChange={handleSellPriceChange} />
                </div>
              </div>
              <div>
                <Button
                  onClick={(updateItem)}
                  className="bg-green-300 hover:bg-green-400 text-black p-2"
                  variant="contained">
                  Хадгалах
                </Button>
              </div>
            </div>
          </div>
        </Modal>

      </div >
    </div >
  );
}

export default retailItemList;
