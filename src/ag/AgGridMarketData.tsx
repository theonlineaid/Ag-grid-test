import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useMarket } from "../context/MarketContext";
import { columnDefs, defaultColDef, handleContextMenu } from "./chunk/external";
import { useBoardFilter } from "./chunk/useBoardFilter";

export const AgGridMarketData = () => {
  const { marketData } = useMarket();
  const gridRef = useRef<AgGridReact>(null);

  // Use the custom hook for filtering
  const {
    filteredData,
    availableBoards,
    selectedBoard,
    setSelectedBoard,
  } = useBoardFilter(marketData);

  const onRowClicked = useCallback((event: any) => {
    console.log("Row Data: ", event.data);
  }, []);

  return (
    <>
      <div>
        <h3>Filter by Board:</h3>
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
        >
          <option value="">All Boards</option>
          {availableBoards.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>
      <div
        className="ag-theme-balham"
        style={{ height: 600, width: "100%" }}
        onContextMenu={handleContextMenu} // Attach context menu prevention to the grid
      >
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressMenuHide={false}
          animateRows={false}
          headerHeight={54}
          rowHeight={30}
          rowBuffer={100}
          suppressColumnVirtualisation={true}
          rowSelection="single"
          allowShowChangeAfterFilter={true}
          onRowClicked={onRowClicked}
        />
      </div>
    </>
  );
};
