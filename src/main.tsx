import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import 'ag-grid-community/styles/ag-theme-balham.css';

import './index.css'
import { MarketProvider } from "./context/MarketContext.tsx";

const App = React.lazy(() => import(`./App.tsx`))

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MarketProvider>
      <Suspense fallback={<div>Loading</div>}>
        <App />
      </Suspense>
    </MarketProvider>
  </React.StrictMode>
);
