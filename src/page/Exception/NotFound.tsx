import ErrorPage from "./ErrorPage";

export default function NotFoundPage() {
  return (
    <ErrorPage
      label="404"
      title="Page not found"
      description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    />
  );
}
