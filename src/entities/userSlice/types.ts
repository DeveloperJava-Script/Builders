import type { Reducer } from "@reduxjs/toolkit";

import type { AuthData, User } from "../../shared/api/auth.service";

export type TUserSliceState = {
  user: User | null;
  data: AuthData | null;
  loaded: boolean;
  currency: string;
};

export type TUserSliceStore = ReturnType<
  Reducer<{
    user: TUserSliceState;
  }>
>;
