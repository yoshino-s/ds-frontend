import { Card, Group, Image, Text, createStyles } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export function ParagraphCard({
  cover,
  title,
  "@timestamp": time,
  author,
  tags,
  _id,
}: Paragraph) {
  const { classes } = useStyles();
  const url = `/paragraph/${_id}`;
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <a href={url}>
          {cover && <Image src={cover} height={140} width={140} />}
        </a>
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            {tags.map((tag, index) => (
              <>
                {index > 0 && " • "}
                <Text
                  component="a"
                  key={index}
                  href={`/tag/${encodeURIComponent(tag)}`}
                >
                  {tag}
                </Text>
              </>
            ))}
          </Text>
          <Text
            className={classes.title}
            mt="xs"
            mb="md"
            component="a"
            href={url}
          >
            {title}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Text
                size="xs"
                component="a"
                href={`/author/${encodeURIComponent(author)}`}
              >
                {author}
              </Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {dayjs().to(dayjs(time))}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
