import "dotenv";

export const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT ?? "http://localhost:9000";
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? "minioadmin";
export const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? "minioadmin";
export const MINIO_ENABLED = !!process.env.MINIO_ENABLED;
