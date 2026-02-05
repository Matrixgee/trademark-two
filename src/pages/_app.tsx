import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/Global/store";
import { Provider, useDispatch } from "react-redux";
import { DepositProvider } from "@/context/DepositContext";

import { useEffect } from "react";
import { isTokenExpired } from "@/utils/utils";
import { clearUser } from "@/Global/UserSlice";

export default function App({ Component, pageProps, router }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");

      if (!token || isTokenExpired(token)) {
        localStorage.removeItem("token");
        dispatch(clearUser());

        if (router.pathname !== "/login") {
          router.replace("/login");
        }
      }
    };

    checkSession();

    const interval = setInterval(checkSession, 60_000); // every minute
    return () => clearInterval(interval);
  }, [dispatch, router]);
  return (
    <AnimatePresence>
      <DepositProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} key={router.route} />
          </PersistGate>
        </Provider>
      </DepositProvider>
      <Toaster />
    </AnimatePresence>
  );
}
