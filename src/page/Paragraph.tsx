import {
  Badge,
  Container,
  Group,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useLoaderData } from "react-router";

import { Link } from "react-router-dom";

function stripStyles(content: string) {
  const element = document.createElement("div");
  element.innerHTML = content;
  element.querySelectorAll("*").forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    [
      "outline",
      "color",
      "font-size",
      "font-family",
      "background-color",
      "border-width",
      "border-style",
      "border-color",
      "counter-reset",
      "max-width",
      "caret-color",
      "letter-spacing",
      "white-space",
      "text-size-adjust",
      "box-sizing",
      "line-height",
      "overflow-wrap",
    ].forEach((key) => el.style.removeProperty(key));
    if (
      el.tagName === "P" &&
      el.childElementCount === 1 &&
      (el.children[0].tagName === "BR" ||
        (el.children[0].tagName === "SPAN" &&
          el.children[0].childElementCount === 1 &&
          el.children[0].children[0].tagName === "BR"))
    ) {
      el.parentElement?.removeChild(el);
    }
  });
  return element.innerHTML;
}

dayjs.extend(relativeTime);

export default function ParagraphPage() {
  const paragraph = useLoaderData() as Paragraph;

  return (
    <Container py="2rem">
      <Title >{paragraph.title}</Title>
      <Group justify="space-between" align="center" my="md">
        <Group>
          <Text size="sm" c="dimmed"> {dayjs().to(dayjs(paragraph["@timestamp"]))}</Text>
          <Text
            ml="1rem"
            size="sm"
            component={Link}
            to={`/author/${encodeURIComponent(paragraph.author || "unknown")}`}
          >
            {paragraph.author}
          </Text>
        </Group>
        <Group>
          {paragraph.tags.map((tag, index) => (
            <>
              <Badge
                size="sm"
                component={Link}
                key={index}
                to={`/tag/${encodeURIComponent(tag)}`}
              >
                {tag}
              </Badge>
            </>
          ))}
          {
            paragraph.source_url && (
              <a href={paragraph.source_url}>
                Goto Source
              </a>
            )
          }
        </Group>
      </Group>

      <TypographyStylesProvider
        style={{
          paddingLeft: 0,
        }}
      >
        <div
          style={{
            lineBreak: "anywhere",
          }}
          dangerouslySetInnerHTML={{
            __html: stripStyles(paragraph.content),
          }}
        />
      </TypographyStylesProvider>
    </Container>
  );
}
