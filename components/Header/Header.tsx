import { ActionIcon, createStyles, Group, Header, rem, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons";
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

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
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
}));

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

export function HeaderSearch({ links }: HeaderSearchProps) {
  const { classes } = useStyles();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const items = links.map((link) => (
    <a key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </a>
  ));

  function submit({ search }: { search: string }) {
    router.push({
      pathname: "/search/[word]",
      query: { word: search },
    });
  }

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group spacing={5}>{items}</Group>
        <form onSubmit={form.onSubmit(submit)}>
          <Group>
            <TextInput
              className={classes.search}
              placeholder="Search"
              required
              {...form.getInputProps("search")}
            />
            <ActionIcon type="submit">
              <IconSearch />
            </ActionIcon>
          </Group>
        </form>
      </div>
    </Header>
  );
}
