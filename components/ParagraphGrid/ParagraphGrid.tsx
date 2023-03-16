import { Button, Container, Grid, Group, Pagination, ScrollArea, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { Paragraph } from "@prisma/client";
import { IconArrowBack } from "@tabler/icons";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

import { ParagraphCard } from "../ParagraphCard/ParagraphCard";

interface ListProps {
  paragraphs: Omit<Paragraph, "content" | "markdown">[];
  skip: number;
  take: number;
  total: number;
  title: string;
  titleAction?: ReactNode;
}

export default function ParagraphGrid({
  title,
  paragraphs,
  skip,
  take,
  total,
  titleAction,
}: ListProps) {
  useDocumentTitle(title);
  const router = useRouter();
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setTotalPage(Math.ceil(total / take));
    setPage(skip / take + 1);
  }, [skip, take]);

  function toPage(page: number) {
    router.push(router.pathname + `?skip=${(page - 1) * take}&take=${take}`);
  }

  return (
    <ScrollArea h="calc( 100vh - 56px )">
      <Container my="2rem">
        <Title>
          {title} Page {page}
        </Title>
        <Group position="apart">
          <Group>{titleAction}</Group>
          <Button variant="subtle" onClick={() => router.back()} rightIcon={<IconArrowBack />}>
            Back
          </Button>
        </Group>
        <Grid my="md">
          {paragraphs.map((paragraph) => {
            return (
              <Grid.Col xs={12} sm={4} lg={3} key={paragraph.id}>
                <ParagraphCard
                  title={paragraph.title}
                  id={paragraph.id}
                  author={paragraph.author}
                  time={paragraph.time}
                />
              </Grid.Col>
            );
          })}
        </Grid>
        <Group position="center">
          <Pagination total={totalPage} value={page} onChange={toPage} withControls withEdges />
        </Group>
      </Container>
    </ScrollArea>
  );
}
