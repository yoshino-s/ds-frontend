import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OptionsState {
  zincsearchUrl: string;
  s3Url: string;
}

const optionsSlice = createSlice({
  name: "stats",
  initialState: {
    zincsearchUrl: "https://zincsearch.k8s.yoshino-s.xyz",
    s3Url: "https://s3.yoshino-s.xyz",
  } as OptionsState,
  reducers: {
    setZincsearchUrl: (state, action: PayloadAction<string | undefined>) => {
      state.zincsearchUrl =
        action.payload ?? "https://zincsearch.k8s.yoshino-s.xyz";
    },
    setS3Url: (state, action: PayloadAction<string | undefined>) => {
      state.s3Url = action.payload ?? "https://s3.yoshino-s.xyz";
    },
  },
});

export const { setS3Url, setZincsearchUrl } = optionsSlice.actions;

export default optionsSlice.reducer;
