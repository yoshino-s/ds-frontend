import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface OptionsState {
  meilisearchUrl: string;
  meilisearchToken: string;
  s3Url: string;
}

const initialState: OptionsState = {
  meilisearchUrl: "https://meilisearch.yoshino-s.xyz/",
  meilisearchToken:
    "a568afad53a4dd124c508b9acd26ec35ff65665c07020913533cd7b176a28a04",
  s3Url: "https://minio-hdd.yoshino-s.xyz/",
};

const optionsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setMeilisearchUrl: (state, action: PayloadAction<string | undefined>) => {
      state.meilisearchUrl = action.payload ?? initialState.meilisearchUrl;
    },
    setMeilisearchToken: (state, action: PayloadAction<string | undefined>) => {
      state.meilisearchToken = action.payload ?? initialState.meilisearchToken;
    },
    setS3Url: (state, action: PayloadAction<string | undefined>) => {
      state.s3Url = action.payload ?? initialState.s3Url;
    },
  },
});

export const { setS3Url, setMeilisearchUrl, setMeilisearchToken } =
  optionsSlice.actions;

export default optionsSlice.reducer;
