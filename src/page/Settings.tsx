import {
  Container,
  createStyles,
  Paper,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { ReactNode, useContext, useEffect } from "react";

import { TitleContext } from "@/component/Header/Header";
import { ThemeSetting } from "@/component/Settings/Theme";
import store from "@/store";
import { useOptionsState } from "@/store/module/options";
import { setS3Url, setZincsearchUrl } from "@/store/reducer/options";

const useStyles = createStyles((theme) => ({
  settingTable: {
    tableLayout: "fixed",
    "& thead": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[3],
    },
  },
}));

interface SettingItem {
  title: string;
  description: string;
  value: ReactNode;
}

export default function SettingsPage() {
  const { classes } = useStyles();
  const [_, setTitle] = useContext(TitleContext);
  const { state: options } = useOptionsState();

  useEffect(() => {
    setTitle("Settings");
  }, []);

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
        <Table verticalSpacing="lg" className={classes.settingTable} striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((setting) => (
              <tr key={`${setting.title}`}>
                <td>
                  <div>
                    <Text size="md" weight={500}>
                      {setting.title}
                    </Text>
                    <Text color="dimmed" size="sm">
                      {setting.description}
                    </Text>
                  </div>
                </td>
                <td>{setting.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Container>
  );
}
