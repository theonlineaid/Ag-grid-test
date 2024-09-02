import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent, GridOptions } from "ag-grid-community";

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

    const [fontSize, setFontSize] = useState(14); // Initial font size

    const gridApiRef = useRef<any>(null);

    const columnDefs: ColDef<IOlympicData>[] = useMemo(
        () => [
            // { field: "athlete", pinned: 'left' },
            { field: "athlete",},
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


    const getRowHeight = (params: any) => (params?.node.group ? 30 : 20);
    // Static header height
    const headerHeight = 20;


    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
            sortable: true,
            resizable: true,
            enableCellChangeFlash: true,
            cellClass: 'align-right',
            cellStyle: { fontWeight: 200 },
            // { field: 'athlete', pinned: 'left' }
            //   valueFormatter: (params) => {
            //     if (typeof params?.value === 'string') return params?.value
            //     return formatNumber(params?.value)
            //   },
        }
    }, [])


    const resetTable = () => {
        gridApiRef.current?.setColumnDefs(columnDefs);
        gridApiRef.current?.resetRowHeights();
    }

    const increaseFontSize = () => setFontSize(prevSize => prevSize + 1);
    const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 1, 10)); // Minimum font size of 10


    return (
        <>
            <div style={{display: "flex", justifyContent: 'space-between'}}>

            <button onClick={resetTable}>Reset table</button> 
            <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={increaseFontSize}>Increase Font Size</button>
                <button onClick={decreaseFontSize}>Decrease Font Size</button>
            </div>
            </div>

            <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                {loading ? ( // Conditional rendering based on loading state
                    <div>Loading...</div>
                ) : (
                    <AgGridReact<IOlympicData>
                        rowData={rowData}
                        gridOptions={gridOptions}
                        onGridReady={onGridReady}
                        defaultColDef={defaultColDef}
                        getRowHeight={getRowHeight}
                        headerHeight={headerHeight}
                    />
                )}
            </div>
        </>
    );
};

export default AGLocalSave;
