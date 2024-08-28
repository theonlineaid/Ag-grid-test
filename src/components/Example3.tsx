import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./../style.css";

// Define the type for the row data
interface RowData {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

// Define cell class rules
const ragCellClassRules = {
  // Apply green to electric cars
  "rag-green": (params: { value: boolean }) => params.value === true,
};

// Define row class rules
const rowClassRules = {
  // Apply red to Ford cars
  "rag-red": (params: { data: RowData }) => params.data.make === "Ford",
};

export default function Example3() {
  const containerStyle = useMemo(() => ({ width: "100%", height: "400px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData] = useState<RowData[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
    { make: "Vauxhall", model: "Corsa", price: 18460, electric: false },
    { make: "Volvo", model: "EX30", price: 33795, electric: true },
    { make: "Mercedes", model: "Maybach", price: 175720, electric: false },
    { make: "Vauxhall", model: "Astra", price: 25795, electric: false },
    { make: "Fiat", model: "Panda", price: 13724, electric: false },
    { make: "Jaguar", model: "I-PACE", price: 69425, electric: true },
  ]);

  const [columnDefs] = useState<any[]>([
    {
      field: "make",
      checkboxSelection: true,
    },
    { field: "model" },
    { field: "price", filter: "agNumberColumnFilter" },
    {
      field: "electric",
      cellClassRules: ragCellClassRules,
    },
  ]);

  const defaultColDef = useMemo(() => ({
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex: 1,
  }), []);

  return (
    <div style={containerStyle}>
      <div
        style={gridStyle}
        className="ag-theme-alpine"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowClassRules={rowClassRules as any}
          rowSelection={"multiple"}
        />
      </div>
    </div>
  );
}
