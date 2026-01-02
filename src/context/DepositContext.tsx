import React, { createContext, ReactNode, useContext, useState } from 'react'

interface DepositProps {
    mode:string
    from: string | undefined;
    amount: number |undefined;
    setMode: React.Dispatch<React.SetStateAction<string>>;
    setFrom: React.Dispatch<React.SetStateAction<string |undefined>>;
    setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const DepositContext = createContext<DepositProps | undefined>(undefined);
export const DepositProvider = ({children} : {children:ReactNode}) => {

    const [mode, setMode] = useState<string>("")
    const [from, setFrom] = useState<string | undefined>("")
    const [amount, setAmount] = useState<number >()
  return (
    <DepositContext.Provider value={{ setAmount, setMode, setFrom, amount, from, mode}}>
      {children}
    </DepositContext.Provider>
  );
}

export const useDepositContext =()=>{
    const context = useContext(DepositContext)

  if (!context) {
    throw new Error("useDepositContext must be used within a DepositProvider");
  }
  return context;
}

