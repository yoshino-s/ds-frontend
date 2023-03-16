import {
  Badge,
  Button,
  Container,
  Group,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Paragraph } from "@prisma/client";
import { IconArrowBack } from "@tabler/icons";
import dayjs from "dayjs";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import { remark } from "remark";
import html from "remark-html";

import { ParagraphContent } from "../../components/ParagraphContent/ParagraphContent";
import DayJS from "../../lib/dayjs";
import { prismaClient } from "../../lib/db";

export default function ParagraphPage({ paragraph }: { paragraph: Paragraph }) {
  const router = useRouter();

  return (
    <ScrollArea h="calc( 100vh - 56px )">
      <Container my="2rem">
        <Title mb="xl">{paragraph.title}</Title>
        <Group position="apart">
          <Group>
            <Text c="dimmed"> {DayJS.to(dayjs(paragraph.time))}</Text>
            <UnstyledButton
              onClick={() =>
                router.push({
                  pathname: "/author/[name]",
                  query: { name: paragraph.author },
                })
              }
            >
              <Badge ml="1rem" radius="sm">
                {paragraph.author}
              </Badge>
            </UnstyledButton>
          </Group>
          <Button variant="subtle" onClick={() => router.back()} rightIcon={<IconArrowBack />}>
            Back
          </Button>
        </Group>
        <Group mb="xl">
          {paragraph.tags.split(",").map((tag) => (
            <UnstyledButton
              key={tag}
              onClick={() =>
                router.push({
                  pathname: "/tag/[name]",
                  query: { name: tag },
                })
              }
            >
              <Badge fz="xs" variant="dot">
                {tag}
              </Badge>
            </UnstyledButton>
          ))}
        </Group>
        <ParagraphContent content={paragraph.content} />
      </Container>
    </ScrollArea>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{ paragraph: Paragraph }>> {
  const id = params?.id;

  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const paragraph = await prismaClient.paragraph.findUniqueOrThrow({
    where: { id },
  });
  paragraph.time = paragraph.time.toISOString() as any;

  if (paragraph.markdown) {
    const resp = await remark().use(html).process(paragraph.content);
    paragraph.content = resp.toString();
  }

  return {
    props: {
      paragraph,
    },
  };
}
