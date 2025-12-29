/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


export interface userInfo {
      _id: string;
  uid: string;

  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  city: string;
  state: string;

  profilePic: string;
  type: "user" | "admin"; // extend if needed
  verified: boolean;

  accountNumber: string;
  routingNumber: string;
  bankName: string;

  balance: number;

  bitcoin: string;
  btcBal: number;

  ethereum: string;
  ethBal: number;

  sol: string;
  solBal: number;

  referralId: string;

  createdAt: string;
  updatedAt: string;

  __v: number;
}
interface User {
user: {
    user:userInfo
}
}

interface UserState {
  User: User | null;  
  Token: string;
  Deposit: any[];
  Withdraw: any[];
  AllHistory: any[];
  Investment: any[];
  Image: string;
}

const initialState: UserState = {
  User: null,
  Token: "",
  Deposit: [],
  Withdraw: [],
  AllHistory: [],
  Investment: [],
  Image: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["User"]>) => {
      state.User = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.Token = action.payload;
    },
    setDeposit: (state, action: PayloadAction<UserState["Deposit"]>) => {
      state.Deposit = action.payload;
    },
    setWithdraw: (state, action: PayloadAction<UserState["Withdraw"]>) => {
      state.Withdraw = action.payload;
    },
    setAllHistory: (state, action: PayloadAction<UserState["AllHistory"]>) => {
      state.AllHistory = action.payload;
    },
    setInvestment: (state, action: PayloadAction<UserState["Investment"]>) => {
      state.Investment = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.Image = action.payload;
    },

    clearUser: (state) => {
      state.AllHistory = [];
      state.User = null;
      state.Deposit = [];
      state.Withdraw = [];
      state.Token = "";
      state.Investment = [];
      state.Image = "";
    },
  },
});

export const {
  setUser,
  setToken,
  setDeposit,
  setWithdraw,
  setAllHistory,
  setInvestment,
  clearUser,
  setImage,
} = UserSlice.actions;

export default UserSlice.reducer;