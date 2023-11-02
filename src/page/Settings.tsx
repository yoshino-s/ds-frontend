import { Container, Paper, Table, Text, TextInput, Title } from "@mantine/core";
import { ReactNode, useContext, useEffect } from "react";

import { TitleContext } from "@/component/Header/Header";
import { ThemeSetting } from "@/component/Settings/Theme";
import store from "@/store";
import { useOptionsState } from "@/store/module/options";
import { setS3Url, setZincsearchUrl } from "@/store/reducer/options";

interface SettingItem {
  title: string;
  description: string;
  value: ReactNode;
}

export default function SettingsPage() {
  const [_, setTitle] = useContext(TitleContext);
  const { state: options } = useOptionsState();

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  const settings: SettingItem[] = [
    {
      title: "Theme",
      description: "Change the theme of your UI",
      value: <ThemeSetting />,
    },
    {
      title: "Minio URL",
      description: "The URL of your Minio instance",
      value: (
        <TextInput
          value={options.s3Url}
          onChange={(e) => {
            store.dispatch(setS3Url(e.currentTarget.value));
          }}
        />
      ),
    },
    {
      title: "Zincsearch URL",
      description: "The URL of your Zincsearch instance",
      value: (
        <TextInput
          value={options.zincsearchUrl}
          onChange={(e) => {
            store.dispatch(setZincsearchUrl(e.currentTarget.value));
          }}
        />
      ),
    },
  ];

  return (
    <Container>
      <Title mt="lg" order={1}>
        Settings
      </Title>
      Customize the look and feel of your Coder deployment.
      <Paper my="xl" radius="md" withBorder style={{ overflow: "hidden" }}>
        <Table verticalSpacing="lg" striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Value</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {settings.map((setting) => (
              <Table.Tr key={`${setting.title}`}>
                <Table.Td>
                  <Text size="md" fw={500}>
                    {setting.title}
                  </Text>
                  <Text c="dimmed" size="sm">
                    {setting.description}
                  </Text>
                </Table.Td>
                <Table.Td>{setting.value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}
