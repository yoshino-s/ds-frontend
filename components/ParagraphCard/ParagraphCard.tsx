import { Badge, Card, createStyles, Group, Image, rem, Text, UnstyledButton } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import DayJS from "../../lib/dayjs";
const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  action: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

interface ArticleCardProps {
  cover?: string;
  id: string;
  title: string;
  description?: string;
  author: string;
  time: Date;
}

export function ParagraphCard({
  className,
  cover,
  id,
  title,
  description,
  time,
  author,
  ...others
}: ArticleCardProps & Omit<React.ComponentPropsWithoutRef<"div">, keyof ArticleCardProps>) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const linkProps = { href: `/paragraph/${id}` };

  return (
    <Card withBorder radius="md" className={cx(classes.card, className)} {...others}>
      {cover && (
        <Card.Section>
          <a {...linkProps}>
            <Image src={cover} height={180} />
          </a>
        </Card.Section>
      )}

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {title}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group position="apart" className={classes.footer}>
        <UnstyledButton
          onClick={() =>
            router.push({
              pathname: "/author/[name]",
              query: { name: author },
            })
          }
        >
          <Badge radius="md">
            <Text fz="sm" inline>
              {author}
            </Text>
          </Badge>
        </UnstyledButton>

        <Text>{DayJS.to(dayjs(time))}</Text>
      </Group>
    </Card>
  );
}
