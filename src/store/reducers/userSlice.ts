import { createSlice } from '@reduxjs/toolkit';

interface userLoginState {
    items: userItems[];
}

interface userItems {
    isAuthenticated: boolean,
    userId: any,
    token: any,
    loginResponse: any,
    role: "employer" | "employee" | null
}

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
  loginResponse: null,
  role: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.loginResponse = action.payload.loginResponse;
      state.role = action.payload.role;
    },
    loginFailed: (state, action) => {
        state.isAuthenticated = false;
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.loginResponse = action.payload.loginResponse;
      },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
      state.loginResponse = null;
      state.role = null;
    },
  },
});

export const { loginSuccess,loginFailed, logout } = userSlice.actions;
export default userSlice.reducer;
