import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, GridOptions} from "ag-grid-community";
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
    const [loading, setLoading] = useState(true); // Add loading state

    const gridApiRef = useRef<any>(null);

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
        // Fetch data and set loading to false when data is loaded
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then((response) => response.json())
            .then((data: IOlympicData[]) => {
                setRowData(data);
                setLoading(false);
            });
    }, []);

    const onGridReady = (params: GridReadyEvent) => {
        gridApiRef.current = params.api;

        // Restore column state from localStorage
        const savedColumnState = localStorage.getItem(COLUMN_STATE_KEY);
        if (savedColumnState) {
            params.api.applyColumnState({
                state: JSON.parse(savedColumnState),
                applyOrder: true,
            });
        }
    };

    const saveColumnState = () => {
        if (gridApiRef.current) {
            const columnState = gridApiRef.current.getColumnState();
            localStorage.setItem(COLUMN_STATE_KEY, JSON.stringify(columnState));
        }
    };

    const gridOptions: GridOptions = {
        columnDefs,
        onColumnMoved: saveColumnState,
        onColumnVisible: saveColumnState,
        onColumnPinned: saveColumnState,
        onColumnResized: saveColumnState,
    };

    return (
        <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
            {loading ? ( // Conditional rendering based on loading state
                <div>Loading...</div>
            ) : (
                <AgGridReact<IOlympicData>
                rowData={rowData}
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                defaultColDef={{ flex: 1, sortable: true, filter: true }}
            />
            )}
        </div>
    );
};

export default AGLocalSave;
