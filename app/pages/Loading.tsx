import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <LoadingOverlay visible />
    </div>
  );
}
