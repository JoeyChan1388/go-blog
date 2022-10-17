import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface UserState {
  id: Number;
  name: string;
}

const initialState: UserState = {
  id: 0,
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      console.log('login as', state.name);
    },
    logout: (state) => {
      state.name = '';
      state.id = 0;
      console.log('logout');
    }
  },
});

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.value)`
export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
