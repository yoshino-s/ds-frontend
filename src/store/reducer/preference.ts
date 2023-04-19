import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferenceState {
  colorScheme: "light" | "dark";
}

const preferenceSlice = createSlice({
  name: "preference",
  initialState: {
    colorScheme: localStorage.getItem("colorScheme") || "light",
  } as PreferenceState,
  reducers: {
    setColorScheme(state, action: PayloadAction<"light" | "dark">) {
      localStorage.setItem("colorScheme", action.payload);
      return {
        ...state,
        theme: action.payload,
      };
    },
    toggleColorScheme(state) {
      const colorScheme = state.colorScheme === "light" ? "dark" : "light";
      localStorage.setItem("colorScheme", colorScheme);
      return {
        ...state,
        colorScheme,
      };
    },
  },
});

export const { setColorScheme, toggleColorScheme } = preferenceSlice.actions;

export default preferenceSlice.reducer;
