import { AgGridReact } from 'ag-grid-react';
import { useRef, useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const TestComponent = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const gridRef = useRef<any>(null); // Ref to store the grid API

  const rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];

  const columnDefs: any = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" }
  ];

  useEffect(() => {
    const gridApi = gridRef.current?.api;
    if (gridApi) {
      gridApi.addEventListener('selectionChanged', onSelectionChanged);
    }
    return () => {
      const gridApi = gridRef.current?.api;
      if (gridApi) {
        gridApi.removeEventListener('selectionChanged', onSelectionChanged);
      }
    };
  }, []);

  const onGridReady = (params: any) => {
    gridRef.current = params.api;
  };

  const onSelectionChanged = () => {
    if (gridRef.current) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node: any) => node.data);
      setSelectedRows(selectedData);

      // Remove previous custom styling
      const allRows = gridRef.current.api.getAllNodes();
      allRows.forEach((node: any) => {
        const rowElement = node.rowElement;
        if (rowElement) {
          rowElement.classList.remove('custom-selected');
        }
      });

      // Apply custom styling to selected rows
      selectedNodes.forEach((node: any) => {
        const rowElement = node.rowElement;
        if (rowElement) {
          rowElement.classList.add('custom-selected'); // Add custom class for selected rows
        }
      });
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="single" // Allow only one row to be selected
      />
      <div>
        <h3>Selected Rows:</h3>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
   
    </div>
  );
};

export default TestComponent;
