import { createStyles, LoadingOverlay } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    fontSize: theme.fontSizes.xl,
  },
}));

export default function Loading() {
  const { classes } = useStyles();
  useDocumentTitle("Loading");
  return (
    <div className={classes.root}>
      <LoadingOverlay visible />
    </div>
  );
}
