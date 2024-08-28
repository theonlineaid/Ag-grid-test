import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

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

const ExampleWithError: React.FC = () => {
  const [rowData, setRowData] = useState<IOlympicData[] | null>(null);

  const columnDefs = [
    { field: "athlete", }, // This will trigger the error
    { field: "age" },
    { field: "country" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact<IOlympicData>
        rowData={rowData}
        columnDefs={columnDefs as any}
      />
    </div>
  );
};

export default ExampleWithError;
