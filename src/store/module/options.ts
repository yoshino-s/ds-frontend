import store, { useAppSelector } from "..";

export const useOptionsState = () => {
  const state = useAppSelector((state) => state.options);
  return {
    state,
    getState: () => {
      return store.getState().options;
    },
  };
};
