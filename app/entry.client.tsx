import { StrictMode, startTransition } from "react";

import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

import "./main.css";
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
