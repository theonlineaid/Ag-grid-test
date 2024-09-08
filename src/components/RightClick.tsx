import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

interface RowData {
  id: number;
  name: string;
  age: number;
}

const ContextMenuExample: React.FC = () => {
  const [rowData] = useState<RowData[]>([
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Alice", age: 22 },
    { id: 4, name: "Bob", age: 28 },
  ]);
  
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const columnDefs: ColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name" },
      { field: "age", headerName: "Age" },
    ],
    []
  );

  const onCellContextMenu = (event: any) => {
    event.preventDefault(); // Prevent the default browser context menu

    setSelectedRow(event.data); // Set the selected row data
    setMenuPosition({ x: event.clientX, y: event.clientY }); // Set the position of the custom context menu
    setContextMenuVisible(true); // Show the custom context menu
  };

  const handleMenuClick = (action: string) => {
    console.log(`Action: ${action}, Row: `, selectedRow);
    setContextMenuVisible(false); // Hide the context menu after an action is taken
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellContextMenu={onCellContextMenu} // Capture the right-click event
        />
      </div>

      {contextMenuVisible && (
        <div
          style={{
            position: "absolute",
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            zIndex: 1000,
          }}
          onMouseLeave={() => setContextMenuVisible(false)} // Hide menu when mouse leaves
        >
          <div onClick={() => handleMenuClick("View")}>View</div>
          <div onClick={() => handleMenuClick("Edit")}>Edit</div>
          <div onClick={() => handleMenuClick("Delete")}>Delete</div>
        </div>
      )}
    </div>
  );
};

export default ContextMenuExample;
