import React from "react";
import { ColDef } from "ag-grid-community";
import { MarketData } from "../../context/MarketContext";

// Static column definitions, moved outside the component
export const columnDefs: ColDef<MarketData>[] = [
  { headerName: "ID", field: "id", enableCellChangeFlash: true },
  { headerName: "Session", field: "session" },
  { headerName: "Ticker", field: "ticker" },
  { headerName: "Short Name", field: "short_name" },
  { headerName: "Full Name", field: "full_name" },
  { headerName: "Filter Name", field: "filter_name" },
  { headerName: "Firm ID", field: "firm_id" },
  { headerName: "Trading State", field: "trading_state" },
  { headerName: "Share Type", field: "share_type" },
  { headerName: "Market Type", field: "market_type" },
  { headerName: "Orderbook", field: "orderbook", filter: "agNumberColumnFilter" },
  { headerName: "Date", field: "date" },
  { headerName: "LQ", field: "lq", filter: "agNumberColumnFilter" },
  { headerName: "BQ", field: "bq", filter: "agNumberColumnFilter" },
  { headerName: "AQ", field: "aq", filter: "agNumberColumnFilter" },
  { headerName: "DL", field: "dl", filter: "agNumberColumnFilter" },
  { headerName: "DH", field: "dh", filter: "agNumberColumnFilter" },
  { headerName: "Bid", field: "bid", filter: "agNumberColumnFilter" },
  { headerName: "Ask", field: "ask", filter: "agNumberColumnFilter" },
  { headerName: "Open", field: "open", filter: "agNumberColumnFilter" },
  { headerName: "Reference", field: "reference", filter: "agNumberColumnFilter" },
  { headerName: "Last", field: "last", filter: "agNumberColumnFilter" },
  { headerName: "Volume", field: "volume", filter: "agNumberColumnFilter" },
  { headerName: "High", field: "high", filter: "agNumberColumnFilter" },
  { headerName: "Low", field: "low", filter: "agNumberColumnFilter" },
  { headerName: "Close", field: "close", filter: "agNumberColumnFilter" },
  { headerName: "D", field: "d", filter: "agNumberColumnFilter" },
  { headerName: "Change", field: "chg", filter: "agNumberColumnFilter" },
  { headerName: "Settle 1", field: "settle_1", filter: "agNumberColumnFilter" },
  { headerName: "Settle", field: "settle", filter: "agNumberColumnFilter" },
  { headerName: "Status", field: "status" },
  { headerName: "Value", field: "val", filter: "agNumberColumnFilter" },
  { headerName: "VWAP", field: "vwap", filter: "agNumberColumnFilter" },
  { headerName: "Sell Pending", field: "sell_pending", filter: "agNumberColumnFilter" },
  { headerName: "Buy Pending", field: "buy_pending", filter: "agNumberColumnFilter" },
  { headerName: "Board", field: "board" },
  { headerName: "Group", field: "group" },
  { headerName: "Instrument Type", field: "instrument_type" },
  { headerName: "Sector", field: "sector" },
  { headerName: "ISIN Code", field: "isin_code" },
  { headerName: "Trades", field: "trades", filter: "agNumberColumnFilter" },
  { headerName: "Last Trade Time", field: "last_trade_time" },
  // { headerName: "52 Week Low", field: "52_wk_low", filter: "agNumberColumnFilter" },
  // { headerName: "52 Week High", field: "52_wk_high", filter: "agNumberColumnFilter" },
  // { headerName: "1 Week Avg Vol", field: "1_wk_avg_vol", filter: "agNumberColumnFilter" },
  // { headerName: "1 Month Avg Vol", field: "1_month_avg_vol", filter: "agNumberColumnFilter" },
  // { headerName: "Stream ID", field: "stream_id" },
];

// Static default column definition, also moved outside the component
export const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 100,
  enableCellChangeFlash: true,
  cellClass: 'align-right',
};

// Context menu handler to prevent default right-click behavior
export const handleContextMenu = (event: React.MouseEvent) => {
  event.preventDefault();
};
