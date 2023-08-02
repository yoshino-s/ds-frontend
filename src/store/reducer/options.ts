import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OptionsState {
  zincsearchUrl: string;
  s3Url: string;
}

const optionsSlice = createSlice({
  name: "stats",
  initialState: {
    zincsearchUrl: "https://zincsearch.yoshino-s.xyz",
    s3Url: "https://minio-hdd.yoshino-s.xyz",
  } as OptionsState,
  reducers: {
    setZincsearchUrl: (state, action: PayloadAction<string | undefined>) => {
      state.zincsearchUrl =
        action.payload ?? "https://zincsearch.yoshino-s.xyz";
    },
    setS3Url: (state, action: PayloadAction<string | undefined>) => {
      state.s3Url = action.payload ?? "https://minio-hdd.yoshino-s.xyz";
    },
  },
});

export const { setS3Url, setZincsearchUrl } = optionsSlice.actions;

export default optionsSlice.reducer;
