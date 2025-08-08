import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export const TitleContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["DS-Next", () => 0]);
