import { Container, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import type { Preview } from "@storybook/react";
import { useDarkMode } from 'storybook-dark-mode';


import i18n from "../src/i18n";

import React, { Fragment } from "react";
import { DocsContainer } from "./DocsContainer";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: DocsContainer,
    },
    i18n
  },
  globals: {
    locale: 'en',
    locales: {
        en: 'English',
        zh: '中文',
    },
  },
  decorators: [
    (Story, runtime) => {
      const isDark = useDarkMode();

      const C = runtime.parameters.layout === 'fullscreen' ? Fragment : Container;
      
      return <MantineProvider withCssVariables forceColorScheme={
        isDark ? 'dark' : 'light'
      }>
        <C>
          <Story />
        </C>
      </MantineProvider>
    },
  ]
};

export default preview;
