import { Badge, Card, Group, Image, Text } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

export function ParagraphCard({
  cover,
  title,
  "@timestamp": time,
  author,
  tags,
  _id,
}: Paragraph) {
  const url = `/paragraph/${_id}`;
  return (
    <Card withBorder radius="md" padding="lg" shadow="sm">
      <Card.Section>
        <Link to={url}>
          {cover && <Image src={cover} height={140} width={140} />}
        </Link>
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text component={Link} to={url}>
          {title}
        </Text>
        <Group>
          {tags.map((tag, index) => (
            <>
              <Badge
                component={Link}
                key={index}
                to={`/tag/${encodeURIComponent(tag)}`}
              >
                {tag}
              </Badge>
            </>
          ))}
        </Group>
      </Group>

      <Group>
        <Group>
          <Text
            size="xs"
            component={Link}
            to={`/author/${encodeURIComponent(author)}`}
          >
            {author}
          </Text>
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
