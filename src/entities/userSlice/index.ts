import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AuthData, User } from "../../shared/api/auth.service";
import type { TUserSliceState } from "./types";

const initialState: TUserSliceState = {
  data: null,
  user: null,
  loaded: false,
  currency: "₽",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<AuthData>) => {
      state.data = action.payload;
    },
    setLoaded: (state) => {
      state.loaded = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { setUser, setData, setLoaded, setCurrency } = userSlice.actions;

export default userSlice.reducer;
