import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/Global/store";
import { Provider } from "react-redux";
import { DepositProvider } from "@/context/DepositContext";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
      <AnimatePresence >
      <DepositProvider>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} key={router.route} />
      </PersistGate>
      </Provider>
      </DepositProvider>
      <Toaster />
    </AnimatePresence>
    
    )
}
