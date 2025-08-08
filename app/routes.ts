import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/Main.layout.tsx", [
    index("./pages/Search.page.tsx"),
    route("settings", "./pages/Settings.page.tsx"),
    route("paragraph/:id", "./pages/Paragraph.page.tsx"),
  ]),
] satisfies RouteConfig;
