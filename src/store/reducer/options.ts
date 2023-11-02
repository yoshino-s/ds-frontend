import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OptionsState {
  zincsearchUrl: string;
  s3Url: string;
}

const ZINCSEARCH_URL = "https://zincsearch.yoshino-s.xyz";
const MINIO_URL = "https://minio-hdd.yoshino-s.xyz";

const optionsSlice = createSlice({
  name: "stats",
  initialState: {
    zincsearchUrl: ZINCSEARCH_URL,
    s3Url: MINIO_URL,
  } as OptionsState,
  reducers: {
    setZincsearchUrl: (state, action: PayloadAction<string | undefined>) => {
      state.zincsearchUrl = action.payload ?? ZINCSEARCH_URL;
    },
    setS3Url: (state, action: PayloadAction<string | undefined>) => {
      state.s3Url = action.payload ?? MINIO_URL;
    },
  },
});

export const { setS3Url, setZincsearchUrl } = optionsSlice.actions;

export default optionsSlice.reducer;
