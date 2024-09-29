import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useRef,
    useCallback,
} from "react";

// Define the shape of the market data
export interface MarketOrder {
    side: "B" | "S";
    qty: number;
    executed_qty?: number;
    price: number;
    order_numbers: any[];
}

export interface MarketData {
    id: number;
    session: string;
    short_name: string;
    full_name: string;
    filter_name: string;
    firm_id: string;
    trading_state: string;
    share_type: string;
    market_type: string;
    orderbook: number;
    date: string;
    lq: number;
    bq: number;
    aq: number;
    dl: number;
    dh: number;
    bid: number;
    ask: number;
    open: number;
    reference: number;
    last: number;
    volume: number;
    high: number;
    low: number;
    close: number;
    d: number;
    chg: number;
    settle_1: number;
    settle: number;
    status: string;
    val: number;
    vwap: number;
    sell_pending: number;
    buy_pending: number;
    board: string;
    group: string;
    instrument_type: string;
    ticker: string;
    sector: string;
    isin_code: string;
    trades: number;
    last_trade_time: string;
    orders: MarketOrder[];
    executed_orders?: MarketOrder[];
}

// Define the context type to work with an array of MarketData
export interface MarketContextType {
    marketData: MarketData[];
    setMarketData: React.Dispatch<React.SetStateAction<MarketData[]>>;
}

const MarketContext = createContext<MarketContextType | null>(null);

interface MarketProviderProps {
    children: ReactNode;
}

export const MarketProvider = ({ children }: MarketProviderProps) => {
    const [marketData, setMarketData] = useState<MarketData[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    const handleMessage = useCallback((event: MessageEvent) => {
        try {
            const data: MarketData = JSON.parse(event.data);
            setMarketData((prevData) => [...prevData, data]);
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    }, []);

    useEffect(() => {
        const ws = new WebSocket(
            "wss://itch.skytrade.us/socket-api/v1/marketfeed/ws"
        );
        wsRef.current = ws;

        ws.onopen = (event) => {
            console.log("WebSocket connection opened", event);
        };

        ws.onmessage = handleMessage;

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = (event) => {
            console.log("WebSocket connection closed");
        };

        return () => {
            if (wsRef.current) {
                console.log("Closing WebSocket connection");
                wsRef.current.close();
            }
        };
    }, [handleMessage]);

    // console.log(marketData);

    return (
        <MarketContext.Provider value={{ marketData, setMarketData }}>
            {children}
        </MarketContext.Provider>
    );
};

export const useMarket = () => {
    const context = useContext(MarketContext);
    if (!context) {
        throw new Error("useMarket must be used within a MarketProvider");
    }
    return context;
}; 