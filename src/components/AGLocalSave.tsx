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
const FONT_SIZE_KEY = "ag-grid-font-size"; // Key for storing font size

const AGLocalSave: React.FC = () => {
    const [rowData, setRowData] = useState<IOlympicData[] | null>(null);
    const [loading, setLoading] = useState(true);

    // Retrieve font size from localStorage or set default to 14
    const [fontSize, setFontSize] = useState<number>(() => {
        const savedFontSize = localStorage.getItem(FONT_SIZE_KEY);
        return savedFontSize ? parseInt(savedFontSize) : 14; // Default font size is 18px
    });

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
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then((response) => response.json())
            .then((data: IOlympicData[]) => {
                setRowData(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Save font size to localStorage whenever it changes
        localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
    }, [fontSize]);

    const onGridReady = (params: GridReadyEvent) => {
        gridApiRef.current = params.api;

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
        rowSelection: "single",
        onSelectionChanged: onSelectionChanged,
        onColumnMoved: saveColumnState,
        onColumnVisible: saveColumnState,
        onColumnPinned: saveColumnState,
        onColumnResized: saveColumnState,
    };

    function onSelectionChanged() {
        const selectedRows = gridApiRef.current!.getSelectedRows();

        console.log(selectedRows, "RowData selection ------>>")
    }

    const getRowHeight = (params: any) => (params?.node.group ? 30 : 20);
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
            cellStyle: { fontWeight: 400, fontSize: `${fontSize}px` }, // Apply font size here
            animateRows: true,
        };
    }, [fontSize]); // Depend on fontSize to update dynamically

    const resetTable = () => {
        gridApiRef.current?.setColumnDefs(columnDefs);
        gridApiRef.current?.resetRowHeights();
        setFontSize(14); // Reset font size to initial value and store in localStorage
    }

    const increaseFontSize = () => setFontSize((prevSize) => Math.min(prevSize + 1, 24));
    const decreaseFontSize = () => setFontSize((prevSize) => Math.max(prevSize - 1, 10)); // Minimum font size of 10

    return (
        <>
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <button onClick={resetTable}>Reset table</button>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <button onClick={increaseFontSize}>+</button>
                    <button onClick={decreaseFontSize}>-</button>
                </div>
            </div>

            <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <AgGridReact<IOlympicData>
                        rowData={rowData}
                        gridOptions={gridOptions}
                        onGridReady={onGridReady}
                        defaultColDef={defaultColDef}
                        getRowHeight={getRowHeight}
                        headerHeight={headerHeight}
                        suppressContextMenu={false}
                    />
                )}
            </div>
        </>
    );
};

export default AGLocalSave;
