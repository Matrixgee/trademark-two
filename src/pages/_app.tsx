// pages/_app.tsx
"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/Global/store";
import { Provider } from "react-redux";
import { DepositProvider } from "@/context/DepositContext";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { isTokenExpired } from "@/utils/utils";
import { clearUser } from "@/Global/UserSlice";

// -------------------------------------------
// SessionHandler Component
// Handles session timeout safely inside Redux Provider
// -------------------------------------------
function SessionHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

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

    checkSession(); // check on mount

    const interval = setInterval(checkSession, 60_000); // check every minute
    return () => clearInterval(interval);
  }, [dispatch, router]);

  return null;
}

// -------------------------------------------
// App Component
// Wraps everything in Providers
// -------------------------------------------
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <DepositProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionHandler /> {/* ✅ session timeout inside Provider */}
            <Component {...pageProps} key={router.route} />
          </PersistGate>
        </Provider>
      </DepositProvider>
      <Toaster />
    </AnimatePresence>
  );
}
