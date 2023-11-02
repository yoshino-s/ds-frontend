import { DocsContainer as BaseContainer } from "@storybook/blocks";

import { themes } from "@storybook/theming";
import React from "react";
import { useDarkMode } from "storybook-dark-mode";

export const DocsContainer = ({ children, context }) => {
  const dark = useDarkMode();

  return (
    <BaseContainer
      context={context}
      theme={dark ? themes.dark : themes.light}
    >
      {children}
    </BaseContainer>
  );
};
