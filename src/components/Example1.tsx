import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import { useCallback, useMemo, useRef, useState } from "react";

function Example1() {
  const gridRef = useRef(null);
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState<any>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(
    () => ({
      filter: true,
      editable: false,
      sortable: true,
      resizable: true,
      // width: 150,
    }),
    []
  );

  const cellClickedLister = useCallback((e: any) => console.log(e), []);

  const deselectAll = useCallback((e: any) => {
    console.log(gridRef.current.api.deselectAll());
  }, []);

  return (
    <>
      <h1>Ag grid</h1>
      <button onClick={deselectAll}>Deselect all</button>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 200 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          animateRows={true}
          onCellClicked={cellClickedLister}
        />
      </div>
    </>
  );
}

export default Example1;
