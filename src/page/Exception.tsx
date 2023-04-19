import {
  Button,
  Center,
  Container,
  createStyles,
  Group,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { useNavigate, useRouteError } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    minHeight: "100vh",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors[theme.primaryColor][3],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.white,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colors[theme.primaryColor][1],
  },
}));

export interface ErrorPageProps {
  label?: string | null;
  title?: string | null;
  description?: string | null;
}

export default function ErrorPage(props: ErrorPageProps) {
  const navigate = useNavigate();

  const { classes } = useStyles();

  const error = useRouteError();

  useDocumentTitle(props.label ?? "Error");

  return (
    <Center className={classes.root}>
      <Container>
        <div className={classes.label}>{props.label ?? "Error"}</div>
        <Title className={classes.title}>
          {props.title ?? "An error occurred"}
        </Title>
        <Text size="lg" align="center" className={classes.description}>
          {props.description ??
            error?.toString?.() ??
            "An error occurred while loading the page."}
        </Text>
        <Group position="center">
          <Button variant="white" size="md" onClick={() => navigate(0)}>
            Refresh
          </Button>{" "}
          or
          <Button variant="white" size="md" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Group>
      </Container>
    </Center>
  );
}

export function NotFoundPage() {
  return (
    <ErrorPage
      label="404"
      title="Page not found"
      description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    />
  );
}
