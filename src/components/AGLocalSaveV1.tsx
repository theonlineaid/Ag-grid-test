import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent } from "ag-grid-community";
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

const COLUMN_STATE_KEY = "ag-grid-column-state";

const AGLocalSave: React.FC = () => {
    const [rowData, setRowData] = useState<IOlympicData[] | null>(null);

    const columnDefs: ColDef<IOlympicData>[] = useMemo(
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

    useEffect(() => {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then((response) => response.json())
            .then((data: IOlympicData[]) => setRowData(data));
    }, []);

    const onGridReady = (params: GridReadyEvent) => {
        const gridApi = params.api;

        // Restore column state from localStorage
        const savedColumnState = localStorage.getItem(COLUMN_STATE_KEY);
        if (savedColumnState) {
            gridApi.applyColumnState({
                state: JSON.parse(savedColumnState),
                applyOrder: true,
            });
        }

        // Save column state to localStorage whenever columns are moved or resized
        const saveColumnState = () => {
            const columnState = gridApi.getColumnState();
            localStorage.setItem(COLUMN_STATE_KEY, JSON.stringify(columnState));
        };

        gridApi.addEventListener("columnMoved", saveColumnState);
        gridApi.addEventListener("columnVisible", saveColumnState);
        gridApi.addEventListener("columnPinned", saveColumnState);
        gridApi.addEventListener("columnResized", saveColumnState);
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            <AgGridReact<IOlympicData>
                rowData={rowData}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
                defaultColDef={{ flex: 1, sortable: true, filter: true }}
            />
        </div>
    );
};

export default AGLocalSave;
