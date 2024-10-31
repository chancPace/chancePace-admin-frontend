import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  email: string | null;
  name: string | null;
  role: string | null;
  adminToken: string;
}

interface UserState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
}
const initialState: UserState = {
  isLoggedIn: false,
  userInfo: {
    email: null,
    name: null,
    role: null,
    adminToken: '',
  },
};

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<UserInfo>) => {
//       if (state.userInfo) {
//         state.userInfo.email = action.payload.email;
//         state.userInfo.name = action.payload.name;
//         state.userInfo.role = action.payload.role;
//       }
//     },
//     clearUser: (state) => {
//       if (state.userInfo) {
//         state.userInfo.email = null;
//         state.userInfo.name = null;
//         state.userInfo.role = null;
//         state.userInfo.token = ''; // token 초기화
//       }
//     },
//     loginSuccess: (state, action: PayloadAction<UserInfo>) => {
//       state.isLoggedIn = true;
//       state.userInfo = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.userInfo = null;
//     },
//   },
// });
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.isLoggedIn = true; // 로그인 상태 업데이트
      state.userInfo = action.payload; // 사용자 정보 업데이트
    },
    clearUser: (state) => {
      state.userInfo = null; // 사용자 정보 초기화
      state.isLoggedIn = false; // 로그인 상태 초기화
    },
    loginSuccess: (state, action: PayloadAction<UserInfo>) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser, loginSuccess, logout } = userSlice.actions;
