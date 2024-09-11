import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, RowNode } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Define the type for the order data
interface Order {
  client_code: string;
  name: string;
  side: string;
  quantity: number;
  avg_price: number;
  exec_qty: number;
  exec_val: number;
  Average_Price: number;
  order_status: string;
  date: string;
}

const OrderSummary: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<any>(null); // Use any for gridRef

  useEffect(() => {
    // Fetch data from a local JSON file or an API endpoint
    const fetchOrders = async () => {
      try {
        const response = await fetch('OrderSummery.json'); // Update with your JSON file path or API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Define column definitions for ag-Grid
  const columnDefs: ColDef[] = [
    { headerName: 'Client Code', field: 'client_code' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Side', field: 'side' },
    { headerName: 'Quantity', field: 'quantity' },
    { headerName: 'Average Price', field: 'avg_price' },
    { headerName: 'Exec Qty', field: 'exec_qty' },
    { headerName: 'Exec Val', field: 'exec_val' },
    { headerName: 'Average Price', field: 'Average_Price' },
    { headerName: 'Order Status', field: 'order_status' },
    { headerName: 'Date', field: 'date' },
  ];

  const onGridReady = (params: GridReadyEvent) => {
    // Save the API references
    gridRef.current = {
      api: params.api,
      columnApi: params.columnApi
    };

    // Example filter logic
    onSelectChange(params);
  };

  const handleFilter = (params: GridReadyEvent, filterName: string) => {
    params.api.forEachNode((rowNode) => {
      if (rowNode.data.name === filterName) {
        const index: any = rowNode.rowIndex;
        rowNode.setSelected(true);
        params.api.ensureIndexVisible(index, 'middle');
      }
    });
  };

  const onSelectChange = (params: GridReadyEvent) => {
    const filterName = 'Order 1'; // Replace with the actual filter name or logic
    handleFilter(params, filterName);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={orders}
        columnDefs={columnDefs}
        rowSelection="single"  // Enable row selection
        onGridReady={onGridReady}
      />
    </div>
  );
};

export default OrderSummary