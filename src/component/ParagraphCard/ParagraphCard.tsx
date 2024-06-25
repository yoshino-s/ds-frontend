import { Badge, Card, Group, Image, Text } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

export function ParagraphCard({
  cover,
  title,
  time,
  author,
  tags,
  id,
}: Paragraph) {
  const url = `/paragraph/${id}`;
  return (
    <Card withBorder radius="md" padding="lg" shadow="sm">
      <Card.Section>
        <Link to={url} target="_blank">
          {cover && <Image src={cover} height={140} width={140} />}
        </Link>
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text component={Link} to={url} target="_blank">
          {title}
        </Text>
        <Group>
          {tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </Group>
      </Group>

      <Group>
        <Group>
          <Text size="xs">{author}</Text>
        </Group>
        <Text size="xs" c="dimmed">
          •
        </Text>
        <Text size="xs" c="dimmed">
          {dayjs().to(dayjs(time))}
        </Text>
      </Group>
    </Card>
  );
}
