import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef, getGridOption, GridReadyEvent } from "ag-grid-community";
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

const ExampleWithLogging: React.FC = () => {
  const [rowData, setRowData] = useState<IOlympicData[] | null>(null);

  const columnDefs: (ColDef<IOlympicData> | ColGroupDef<IOlympicData>)[] = useMemo(
    () => [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ],
    []
  );

  useMemo(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  const onGridReady = (params: GridReadyEvent) => {
    const gridApi = params.api;
    const gridColumnApi = params.columnApi;

    // Log grid options
    console.log("Grid Options: ", gridApi.getGridOption());
    // Log other properties or methods available on the gridApi
    console.log("Grid API: ", gridApi);
    console.log("Grid Column API: ", gridColumnApi);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact<IOlympicData>
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        defaultColDef={{ flex: 1 }}
        columnHoverHighlight={true}
      />
    </div>
  );
};

export default ExampleWithLogging;
