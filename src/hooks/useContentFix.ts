import { useAppSelector } from "@/store";

export function useContextFix(content: string) {
  const { s3Url } = useAppSelector((state) => state.options);
  return content.replace(
    /https?:\/\/(?:minio-hdd)\.yoshino-s\.(?:online|xyz)\//g,
    s3Url,
  );
}
