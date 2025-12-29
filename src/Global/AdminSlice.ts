/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  admin: any[];
  users: any[];
  token: string;
  alltransactions: any[];
  plans: any[];
  oneUser: any | null;
}

const initialState: AdminState = {
  admin: [],
  users: [],
  alltransactions: [],
  token: "",
  plans: [],
  oneUser: null,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminState["admin"]>) => {
      state.admin = action.payload;
    },
    setAdminToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<AdminState["users"]>) => {
      state.users = action.payload;
    },
    setAllTransactions: (
      state,
      action: PayloadAction<AdminState["alltransactions"]>
    ) => {
      state.alltransactions = action.payload;
    },
    setPlans: (state, action: PayloadAction<AdminState["plans"]>) => {
      state.plans = action.payload;
    },
    setOneUser: (state, action: PayloadAction<any>) => {
      state.oneUser = action.payload;
    },
    clearAdmin: (state) => {
      state.admin = [];
      state.token = "";
      state.alltransactions = [];
      state.users = [];
      state.plans = [];
      state.oneUser = null;
    },
  },
});

export const {
  setAdmin,
  setAdminToken,
  setAllUsers,
  setAllTransactions,
  setPlans,
  setOneUser,
  clearAdmin,
} = AdminSlice.actions;

export default AdminSlice.reducer;