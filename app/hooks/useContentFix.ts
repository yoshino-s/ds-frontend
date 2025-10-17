import useConfigStore from "@/store/config";

export function useContentFix(content?: string | null) {
  const s3Url = useConfigStore((store) => store.s3Url);
  return content?.replace(
    /https?:\/\/minio-hdd\.yoshino-s\.(?:online|xyz)\/crawl\//g,
    s3Url,
  );
}
