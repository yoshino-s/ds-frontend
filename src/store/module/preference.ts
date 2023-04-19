import store, { useAppSelector } from "..";
import { toggleColorScheme as toggleColorScheme_ } from "../reducer/preference";

function toggleColorScheme() {
  store.dispatch(toggleColorScheme_());
}

export const usePreferenceState = () => {
  const state = useAppSelector((state) => state.preference);
  return {
    state,
    toggleColorScheme,
  };
};
