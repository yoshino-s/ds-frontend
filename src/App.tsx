import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import Loading from "./page/Loading";
import router from "./router";

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
