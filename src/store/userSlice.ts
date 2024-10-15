import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  fullName: string;
  email: string;
}

interface UserState {
  user: User[];
}

const initialState: UserState = {
  user: [],
};

const userSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    initializeUser(state, action: PayloadAction<User[]>) {
      state.user = action.payload;
    },
  },
});

export const { initializeUser } = userSlice.actions;
export default userSlice.reducer;
