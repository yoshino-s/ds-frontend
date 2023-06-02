import {
  Badge,
  Container,
  Group,
  Text,
  Title,
  TypographyStylesProvider,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router";

import { TitleContext } from "@/component/Header/Header";

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

const useStyles = createStyles(() => ({
  paragraph: {
    lineBreak: "anywhere",
  },
}));

dayjs.extend(relativeTime);

export default function ParagraphPage() {
  const { classes } = useStyles();
  const [_, setTitle] = useContext(TitleContext);

  const paragraph = useLoaderData() as Paragraph;

  useEffect(() => {
    setTitle(paragraph.title);
  }, [paragraph]);

  return (
    <Container py="2rem">
      <Title mb="xl">{paragraph.title}</Title>
      <Group position="apart">
        <Group>
          <Text c="dimmed"> {dayjs().to(dayjs(paragraph.time))}</Text>
          <UnstyledButton
            component="a"
            href={`/author/${encodeURIComponent(
              paragraph.author || "unknown"
            )}`}
          >
            <Badge ml="1rem" radius="sm">
              {paragraph.author}
            </Badge>
          </UnstyledButton>
        </Group>
      </Group>
      <Group mb="xl">
        {paragraph.tags?.map((tag) => (
          <UnstyledButton
            key={tag}
            component="a"
            href={`/tag/${encodeURIComponent(tag)}`}
          >
            <Badge fz="xs" variant="dot">
              {tag}
            </Badge>
          </UnstyledButton>
        ))}
      </Group>
      <TypographyStylesProvider>
        <div
          className={classes.paragraph}
          dangerouslySetInnerHTML={{
            __html: stripStyles(paragraph.content),
          }}
        />
      </TypographyStylesProvider>
    </Container>
  );
}
