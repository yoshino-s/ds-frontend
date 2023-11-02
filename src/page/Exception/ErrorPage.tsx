import { Button, Container, Group, Text, Title } from "@mantine/core";
import classes from "./ErrorPage.module.css";

export interface ErrorPageProps {
  label?: string | null;
  title?: string | null;
  description?: string | null;
}

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>{props.label}</div>
        <Title className={classes.title}>{props.title}</Title>
        <Text size="lg" ta="center" className={classes.description}>
          {props.description}
        </Text>
        <Group justify="center">
          <Button variant="white" size="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
