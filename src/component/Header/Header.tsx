import { Dispatch, SetStateAction, createContext } from "react";

export const TitleContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["DS-Next", () => 0]);
