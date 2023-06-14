import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface initialStateProps {
  windowWidthSize: number;
  windowHeightSize: number;
}

const initialState: initialStateProps = {
  windowWidthSize: 0,
  windowHeightSize: 0,
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setWidthSize: (state: initialStateProps, action: PayloadAction<number>) => {
      state.windowWidthSize = action.payload;
    },
    setHeightSize: (
      state: initialStateProps,
      action: PayloadAction<number>
    ) => {
      state.windowHeightSize = action.payload;
    },
  },
});

export const { setWidthSize, setHeightSize } = windowSlice.actions;

export const selectorWindow = (state: RootState) => state.window;

export const reducer = windowSlice.reducer;
