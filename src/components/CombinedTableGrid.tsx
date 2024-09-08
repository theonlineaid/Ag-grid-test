import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

interface RowData {
    id: number;
    name: string;
    age: number;
    source?: string; // Optional field to identify the source
}

const CombinedTableGrid: React.FC = () => {
    const [rowData, setRowData] = useState<RowData[]>([]);

    useEffect(() => {
        const dataSet1: RowData[] = [
            { id: 1, name: "John", age: 25 },
            { id: 2, name: "Jane", age: 30 },
        ];
        const dataSet2: RowData[] = [
            { id: 3, name: "Alice", age: 22 },
            { id: 4, name: "Bob", age: 28 },
        ];

        // Combine the two datasets and add the source identifier
        const combinedData: RowData[] = [
            ...dataSet1.map((row) => ({ ...row, source: "Table 1" })),
            ...dataSet2.map((row) => ({ ...row, source: "Table 2" })),
        ];

        setRowData(combinedData);
    }, []);

    const columnDefs: ColDef<RowData>[] = [
        { field: "source", rowGroup: true, hide: true }, // Group by the source
        { field: "name", headerName: "Name" },
        { field: "age", headerName: "Age" },
    ];

    const defaultColDef: ColDef = {
        flex: 1,
        sortable: true,
        filter: true,
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact<RowData>
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                groupDisplayType="singleColumn"
                autoGroupColumnDef={{ headerName: "Source", minWidth: 200 }}
            />
        </div>
    );
};

export default CombinedTableGrid;
