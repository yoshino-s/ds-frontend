import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import store from "./store";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <Notifications />
      <App />
    </ThemeProvider>
  </Provider>
);
