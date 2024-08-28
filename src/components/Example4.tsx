import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Define the data structure
export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const Example4: React.FC = () => {
  const [rowData, setRowData] = useState<IOlympicData[] | null>(null);
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);

  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Participant",
      children: [
        { field: "athlete", flex: 1 },
        { field: "age", flex: 1 },
      ],
    },
    {
      headerName: "Details",
      children: [
        { field: "country", flex: 1 },
        { field: "year", flex: 1 },
        { field: "date", flex: 1 },
        { field: "sport", flex: 1 },
      ],
    },
  ];

  const defaultColDef = {
    flex: 1,
  };

  useEffect(() => {
    // Fetch data and set it to the grid
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "500px", width: "100%" }}
    >
      <AgGridReact<IOlympicData>
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        columnHoverHighlight={true}
      />
    </div>
  );
};

export default Example4;
