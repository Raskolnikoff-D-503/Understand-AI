import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '@/app/store';

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState: {
    isOnEdit: false,
  },
  reducers: {
    setIsOnEdit(state, action) {
      state.isOnEdit = action.payload;
    },
  },
});

export const selectIsOnEdit = (state: RootState) => state.mainPageSlice.isOnEdit;
