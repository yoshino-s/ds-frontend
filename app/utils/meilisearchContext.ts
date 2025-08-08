import { createContext, useContext } from "react";

import type { Meilisearch } from "meilisearch";

export const MeilisearchContext = createContext<Meilisearch | null>(null);

export const MeilisearchProvider = MeilisearchContext.Provider;

export function useMeilisearch() {
  return useContext(MeilisearchContext);
}
