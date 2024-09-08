import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface RowData {
    id: number;
    name: string;
    age: number;
}

const SeparateGrids: React.FC = () => {
    const [dataSet1, setDataSet1] = useState<RowData[]>([]);
    const [dataSet2, setDataSet2] = useState<RowData[]>([]);

    useEffect(() => {
        setDataSet1([
            { id: 1, name: "John", age: 25 },
            { id: 2, name: "Jane", age: 30 },
        ]);
        setDataSet2([
            { id: 3, name: "Alice", age: 22 },
            { id: 4, name: "Bob", age: 28 },
        ]);
    }, []);

    const columnDefs: ColDef<RowData>[] = [
        { field: "name", headerName: "Name" },
        { field: "age", headerName: "Age" },
    ];

    const defaultColDef: ColDef = {
        flex: 1,
        sortable: true,
        filter: true,
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="ag-theme-alpine" style={{ height: 200, width: 600 }}>
                <h3>Table 1</h3>
                <AgGridReact<RowData>
                    rowData={dataSet1}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div>

            <div className="ag-theme-alpine" style={{ height: 200, width: 600, marginTop: '60px'}}>
                <h3>Table 2</h3>
                <AgGridReact<RowData>
                    rowData={dataSet2}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
        </div>
    );
};

export default SeparateGrids;
