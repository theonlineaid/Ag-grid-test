// import { useState, useMemo } from "react";
// import { MarketData } from "../../context/MarketContext";

// const availableBoards = [
//   "Main Board",
//   "Alternative Trading Board",
//   "Small Cap Board",
// ];

// export const useBoardFilter = (initialData: MarketData[]) => {
//   const [selectedBoards, setSelectedBoards] = useState<string[]>([]);

//   const filteredData = useMemo(() => {
//     if (selectedBoards.length === 0) {
//       return initialData; // No filter applied, return all data
//     }
//     return initialData.filter(item => selectedBoards.includes(item.board));
//   }, [initialData, selectedBoards]);

//   const toggleBoardSelection = (board: string) => {
//     setSelectedBoards((prevSelected) =>
//       prevSelected.includes(board)
//         ? prevSelected.filter((b) => b !== board) // Remove board if already selected
//         : [...prevSelected, board] // Add board if not selected
//     );
//   };

//   return {
//     filteredData,
//     availableBoards,
//     selectedBoards,
//     toggleBoardSelection,
//   };
// };
import { useState, useMemo } from "react";
import { MarketData } from "../../context/MarketContext";

const availableBoards = [
  "Main Board",
  "Alternative Trading Board",
  "Small Cap Board",
];

export const useBoardFilter = (initialData: MarketData[]) => {
  const [selectedBoard, setSelectedBoard] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!selectedBoard) {
      return initialData; // No filter applied, return all data
    }
    return initialData.filter(item => item.board === selectedBoard);
  }, [initialData, selectedBoard]);

  return {
    filteredData,
    availableBoards,
    selectedBoard,
    setSelectedBoard,
  };
};
