import type { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";

import {
  ActionIcon,
  Button,
  Container,
  Paper,
  PasswordInput,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TbBrandGithub, TbMail } from "react-icons/tb";

import { Meilisearch } from "meilisearch";

import { TitleContext } from "@/component/Header/Header";
import { ThemeSetting } from "@/component/Settings/Theme";
import useConfigStore from "@/store/config";

interface SettingItem {
  title?: ReactNode;
  description?: ReactNode;
  value?: ReactNode;
}

export default function SettingsPage() {
  const [_, setTitle] = useContext(TitleContext);
  const {
    setS3Url,
    setEnableHybridSearch,
    setMeilisearchToken,
    setMeilisearchUrl,
    ...options
  } = useConfigStore();
  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  const form = useForm({
    initialValues: options,
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const [meilisearchVersion, setMeilisearchVersion] = useState<string | null>(
    null,
  );

  const onSubmit = async (v: typeof options) => {
    try {
      new URL(v.s3Url, location.origin);
      form.clearFieldError("s3Url");
    } catch {
      form.setFieldError("s3Url", "Invalid Minio URL");
    }

    try {
      const client = new Meilisearch({
        host: v.meilisearchUrl,
        apiKey: v.meilisearchToken,
      });
      const version = await client.getVersion();
      setMeilisearchVersion(version.pkgVersion);
      form.clearFieldError("meilisearchUrl");
      form.clearFieldError("meilisearchToken");
    } catch {
      form.setFieldError("meilisearchUrl", "Invalid Meilisearch URL");
      form.setFieldError("meilisearchToken", "Invalid Meilisearch Token");
    }

    if (form.errors.length !== 0) {
      return;
    }

    if (v.s3Url !== options.s3Url) {
      setS3Url(v.s3Url);
    }
    if (v.meilisearchUrl !== options.meilisearchUrl) {
      setMeilisearchUrl(v.meilisearchUrl);
    }
    if (v.meilisearchToken !== options.meilisearchToken) {
      setMeilisearchToken(v.meilisearchToken);
    }
  };

  const settings: SettingItem[][] = [
    [
      {
        title: "Theme",
        description: "Change the theme of your UI",
        value: <ThemeSetting />,
      },
      {
        title: "Enable Hybrid Search",
        description: "Enable hybrid search for Meilisearch",
        value: (
          <div>
            <Switch
              size="md"
              checked={options.enableHybridSearch}
              onChange={(value) => {
                const v = value.currentTarget.checked;
                setEnableHybridSearch(v);
              }}
            />
          </div>
        ),
      },
    ],
    [
      {
        title: "Minio URL",
        description: "The URL of your Minio instance",
        value: <TextInput {...form.getInputProps("s3Url")} required />,
      },
      {
        title: "Meilisearch URL",
        description: "The URL of your Meilisearch instance",
        value: <TextInput {...form.getInputProps("meilisearchUrl")} required />,
      },
      {
        title: "Meilisearch Token",
        description: "The token of your Meilisearch instance",
        value: (
          <PasswordInput {...form.getInputProps("meilisearchToken")} required />
        ),
      },
      {
        title: <Button type="submit">Test And Save</Button>,
        value: meilisearchVersion ? (
          <span
            style={{
              color: "var(--mantine-color-green-6)",
            }}
          >
            Meilisearch V{meilisearchVersion}
          </span>
        ) : null,
      },
    ],
    [
      {
        title: "Made With ❤️ By",
        description: (
          <a href="https://github.com/yoshino-s">
            https://github.com/yoshino-s
          </a>
        ),
        value: (
          <ActionIcon.Group>
            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Gallery"
              component="a"
              href="https://github.com/yoshino-s"
              target="_blank"
            >
              <TbBrandGithub style={{ width: rem(20) }} />
            </ActionIcon>

            <ActionIcon
              variant="default"
              size="lg"
              aria-label="Settings"
              component="a"
              href="mailto:yoshino.prog@gmail.com"
            >
              <TbMail style={{ width: rem(20) }} />
            </ActionIcon>
          </ActionIcon.Group>
        ),
      },
    ],
  ];

  return (
    <Container>
      <Title mt="lg" order={1}>
        Settings
      </Title>
      Customize the look and feel of your Coder deployment.
      <form onSubmit={form.onSubmit(onSubmit)}>
        {settings.map((settingItem, index) => (
          <Paper
            my="xl"
            radius="md"
            withBorder
            style={{ overflow: "hidden" }}
            key={index}
          >
            <Table verticalSpacing="lg" striped>
              <Table.Tbody>
                {settingItem.map((setting) => (
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
        ))}
      </form>
    </Container>
  );
}
