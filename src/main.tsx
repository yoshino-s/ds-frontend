import { Notifications } from "@mantine/notifications";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App";
import store from "./store";

import "@mantine/core/styles.css";

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MantineProvider withCssVariables theme={theme}>
      <Notifications />
      <App />
    </MantineProvider>
  </Provider>,
);
