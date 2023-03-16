import { ActionIcon, createStyles, Group, Header, rem, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Icon123, IconHome, IconSearch } from "@tabler/icons";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  linkText: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export function HeaderSearch() {
  const { classes } = useStyles();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const items = [
    {
      link: "/",
      label: "Home",
      icon: <IconHome />,
    },
    {
      link: "/statistic",
      label: "Statistic",
      icon: <Icon123 />,
    },
  ].map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      <Group>
        {link.icon}
        <Text className={classes.linkText}>{link.label}</Text>
      </Group>
    </a>
  ));

  function submit({ search }: { search: string }) {
    router.push({
      pathname: "/search/[word]",
      query: { word: search },
    });
  }

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group spacing={5}>{items}</Group>
        <form onSubmit={form.onSubmit(submit)}>
          <Group>
            <TextInput placeholder="Search" required {...form.getInputProps("search")} />
            <ActionIcon type="submit">
              <IconSearch />
            </ActionIcon>
          </Group>
        </form>
      </div>
    </Header>
  );
}
