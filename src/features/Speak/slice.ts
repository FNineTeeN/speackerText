import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface initialStateProps {
  player: SpeechSynthesisUtterance;
  text: string;
  lang: string;
  positionSelected: number;
  positionSpeak: number;
}

const initialState: initialStateProps = {
  player: new SpeechSynthesisUtterance(),
  text: "",
  lang: "es-ES",
  positionSelected: 0,
  positionSpeak: 0,
};

const speakSlice = createSlice({
  name: "speak",
  initialState,
  reducers: {
    setText: (state: initialStateProps, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setPositionSelected: (
      state: initialStateProps,
      action: PayloadAction<number>
    ) => {
      state.positionSelected = action.payload;
    },
    setPositionSpeak: (
      state: initialStateProps,
      action: PayloadAction<number>
    ) => {
      state.positionSpeak = action.payload;
    }
  },
});

export const {
  setText,
  setPositionSelected,
  setPositionSpeak,
} = speakSlice.actions;

export const selectorSpeak = (state: RootState) => state.speak;

export const reducer = speakSlice.reducer;
