import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useEffect } from "react";

import { usePreferenceState } from "./store/module/preference";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const {
    state: { colorScheme },
    toggleColorScheme,
  } = usePreferenceState();

  useEffect(() => {
    console.log(colorScheme);
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
