import React, { useEffect, useRef } from "react";

const TradingViewWidgettwo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(true); // To track component mount state

  useEffect(() => {
    // Cleanup function to be executed on component unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && isMounted.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR to USD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": false,
          "displayMode": "adaptive",
          "colorTheme": "dark", // Change color theme to dark
          "locale": "en",
          "autosize": true
        }
      `;
      containerRef.current.appendChild(script);
    }
  }, [isMounted]); // Add isMounted to dependency array

  return (
    <div
      className="tradingview-widget-container flex justify-center items-center"
      ref={containerRef}
      style={{ height: "150%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "200rem" }}
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
};

export default TradingViewWidgettwo;