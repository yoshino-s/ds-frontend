import {
  Box,
  Center,
  SegmentedControl,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconRobot, IconSun } from "@tabler/icons-react";

export function ThemeSetting() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(v) => setColorScheme(v as any)}
      data={[
        {
          value: "light",
          label: (
            <Center>
              <IconSun size="1rem" stroke={1.5} />
              <Box ml={10}>Light</Box>
            </Center>
          ),
        },
        {
          value: "auto",
          label: (
            <Center>
              <IconRobot size="1rem" stroke={1.5} />
              <Box ml={10}>Auto</Box>
            </Center>
          ),
        },
        {
          value: "dark",
          label: (
            <Center>
              <IconMoon size="1rem" stroke={1.5} />
              <Box ml={10}>Dark</Box>
            </Center>
          ),
        },
      ]}
    />
  );
}
