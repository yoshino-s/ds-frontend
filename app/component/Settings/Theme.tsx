import {
  Box,
  Center,
  SegmentedControl,
  useMantineColorScheme,
} from "@mantine/core";
import { TbMoon, TbRobot, TbSun } from "react-icons/tb";

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
              <TbSun size="1rem" />
              <Box ml={10}>Light</Box>
            </Center>
          ),
        },
        {
          value: "auto",
          label: (
            <Center>
              <TbRobot size="1rem" />
              <Box ml={10}>Auto</Box>
            </Center>
          ),
        },
        {
          value: "dark",
          label: (
            <Center>
              <TbMoon size="1rem" />
              <Box ml={10}>Dark</Box>
            </Center>
          ),
        },
      ]}
    />
  );
}
