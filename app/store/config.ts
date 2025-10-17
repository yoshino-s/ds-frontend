import { type ExtractState, create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

export type ConfigStore = ExtractState<typeof useConfigStore>;

const useConfigStore = create(
  devtools(
    persist(
      combine(
        {
          meilisearchUrl: "https://meilisearch.yoshino-s.xyz/",
          meilisearchToken:
            "70014cdf1f1fb94b6ed420e11abf2e74e0dfa7bc00ddd77f213599c50bd1e26f",
          s3Url: "https://minio-hdd.yoshino-s.xyz/",
          enableHybridSearch: false,
        },
        (set) => ({
          setMeilisearchUrl: (url: string | undefined) =>
            set((state) => ({
              meilisearchUrl: url ?? state.meilisearchUrl,
            })),
          setMeilisearchToken: (token: string | undefined) =>
            set((state) => ({
              meilisearchToken: token ?? state.meilisearchToken,
            })),
          setS3Url: (url: string | undefined) =>
            set((state) => ({
              s3Url: url ?? state.s3Url,
            })),
          setEnableHybridSearch: (enable: boolean | undefined) =>
            set((state) => ({
              enableHybridSearch: enable ?? state.enableHybridSearch,
            })),
        }),
      ),
      { name: "ds-pages" },
    ),
  ),
);

export default useConfigStore;
