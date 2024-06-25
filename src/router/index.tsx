/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import SearchPage from "@/page/Search";
import store from "@/store";
import { markdownToHtml } from "@/utils/remark";
import { MeiliSearch } from "meilisearch";

const NotFound = lazy(() => import("@/page/Exception/NotFound"));
const ErrorPage = lazy(() => import("@/page/Exception/ErrorPage"));
const LoadingPage = lazy(async () => import("@/page/Loading"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ParagraphPage = lazy(async () => import("@/page/Paragraph"));
const SettingsPage = lazy(async () => import("@/page/Settings"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <SearchPage />,
          loader() {
            return {};
          },
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },

        {
          path: "/paragraph/:id",
          element: <ParagraphPage />,
          async loader({ params: { id } }) {
            if (!id) {
              return { redirect: "/" };
            }

            const meilisearch = new MeiliSearch({
              host: store.getState().options.meilisearchUrl,
              apiKey: store.getState().options.meilisearchToken,
            });

            const paragraph: Paragraph = await meilisearch
              .index("paragraph")
              .getDocument(id);

            if (paragraph.markdown) {
              paragraph.content = await markdownToHtml(paragraph.content);
            } else {
              paragraph.content = "NO HTML!";
            }

            return paragraph;
          },
        },
      ],
    },
    {
      path: "/loading",
      element: <LoadingPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {},
);

export default router;
