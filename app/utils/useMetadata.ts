import type React from "react";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export interface Metadata {
  title?: string;
  description?: string;
  rightActions?: React.ReactNode;
  withTabs?: boolean;
}

export const MetaContext = createContext<
  [Metadata, Dispatch<SetStateAction<Metadata>>]
>([{}, () => {}]);

export default function useMetadata(): [
  Metadata,
  Dispatch<SetStateAction<Metadata>>,
] {
  const [meta, setMeta] = useContext(MetaContext);

  return [meta, setMeta];
}
