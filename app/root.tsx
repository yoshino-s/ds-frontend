import { useState } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";

import { MantineProvider } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { ContextMenuProvider } from "mantine-contextmenu";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import { theme } from "@/theme";
import { type Metadata, MetaContext } from "@/utils/useMetadata";

import type { Route } from "./+types/root";

import "dayjs/locale/en";
import "dayjs/locale/zh-cn";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {import.meta.env.DEV && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
        )}
      </head>
      <body style={{ colorScheme: "dark" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [metadata, setMetadata] = useState<Metadata>({
    title: "Mantine App",
  });
  useDocumentTitle(metadata.title ?? "Mantine App");

  return (
    <MantineProvider theme={theme} withCssVariables>
      <ContextMenuProvider>
        <MetaContext.Provider value={[metadata, setMetadata]}>
          <Notifications />
          <Outlet />
        </MetaContext.Provider>
      </ContextMenuProvider>
    </MantineProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    if (import.meta.env.DEV) {
      details = error.message;
      stack = error.stack;
    }
  }
  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
