import {
  ActionIcon,
  Group,
  Header,
  Text,
  TextInput,
  createStyles,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { useNavigate } from "react-router";

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
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export const TitleContext = createContext<
  [string, Dispatch<SetStateAction<string>>]
>(["DS-Next", () => 0]);

export function HeaderSearch() {
  const { classes } = useStyles();
  const [title, _] = useContext(TitleContext);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useDocumentTitle(title);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  function submit({ search }: { search: string }) {
    console.log(search);
    navigate(`/search/${encodeURIComponent(search)}`);
  }

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <span>
          <Text weight={600} component="a" href="/">
            DS-Next
          </Text>
          {!isMobile && (
            <Text weight={600} component="span">
              {" | "}
              {title}
            </Text>
          )}
        </span>
        <Group>
          <form onSubmit={form.onSubmit(submit)}>
            <TextInput
              placeholder="Search"
              icon={<IconSearch size="1rem" stroke={1.5} />}
              {...form.getInputProps("search")}
              required
            />
          </form>
          <ActionIcon component="a" href="/settings">
            <IconSettings />
          </ActionIcon>
        </Group>
      </div>
    </Header>
  );
}
