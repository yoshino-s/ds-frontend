import { lazy } from "react";
import { createHashRouter } from "react-router-dom";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { SearchApi } from "@/helper/api";
import MainLayout from "@/layout/MainLayout";
import SearchPage from "@/page/Search";
import store from "@/store";

const NotFound = lazy(() => import("@/page/Exception/NotFound"));
const ErrorPage = lazy(() => import("@/page/Exception/ErrorPage"));
const LoadingPage = lazy(async () => import("@/page/Loading"));
const ParagraphPage = lazy(async () => import("@/page/Paragraph"));
const SettingsPage = lazy(async () => import("@/page/Settings"));

const router = createHashRouter([
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
        path: "/tag/:tag",
        element: <SearchPage />,
        loader({ params: { tag } }) {
          if (!tag) {
            return { redirect: "/" };
          }
          return {
            search_type: "querystring",
            query: {
              term: `tags:${JSON.stringify(tag)}`,
            },
          };
        },
      },
      {
        path: "/author/:author",
        element: <SearchPage />,
        loader({ params: { author } }) {
          if (!author) {
            return { redirect: "/" };
          }
          return {
            search_type: "querystring",
            query: {
              term: `author:${JSON.stringify(author)}`,
            },
          };
        },
      },
      {
        path: "/search/:search",
        element: <SearchPage />,
        loader({ params: { search } }) {
          if (!search) {
            return { redirect: "/" };
          }
          return {
            search_type: "querystring",
            query: {
              term: search,
            },
          };
        },
      },
      {
        path: "/paragraph/:id",
        element: <ParagraphPage />,
        async loader({ params: { id } }) {
          if (!id) {
            return { redirect: "/" };
          }

          const paragraph = await SearchApi.getParagraph(
            store.getState().options.zincsearchUrl,
            id,
          ).then((p) =>
            SearchApi.wrapParagraph(store.getState().options.s3Url, p),
          );

          console.log(paragraph.markdown);
          if (paragraph.markdown) {
            paragraph.content = (
              await remark().use(remarkHtml).process(paragraph.content)
            ).toString();
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
]);

export default router;
