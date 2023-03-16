import { Button } from "@mantine/core";
import { Paragraph } from "@prisma/client";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import ParagraphGrid from "../components/ParagraphGrid/ParagraphGrid";
import { prismaClient } from "../lib/db";

interface ListProps {
  paragraphs: Omit<Paragraph, "content" | "markdown">[];
  skip: number;
  take: number;
  total: number;
}

export default function HomePage(props: ListProps) {
  const router = useRouter();

  return (
    <ParagraphGrid
      title="DS-Next"
      titleAction={<Button onClick={() => router.push("/statistic")}>Statistic</Button>}
      {...props}
    />
  );
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ListProps>> {
  const skip = Number(ctx.query.skip ?? 0);
  const take = Number(ctx.query.take ?? 12);
  const [total, paragraphs] = await Promise.all([
    prismaClient.paragraph.count(),
    await prismaClient.paragraph.findMany({
      skip: Number(skip),
      take: Number(take),
      orderBy: {
        time: "desc",
      },
      select: {
        id: true,
        title: true,
        tags: true,
        time: true,
        author: true,
        cover: true,
      },
    }),
  ]);
  paragraphs.forEach((paragraph) => {
    paragraph.time = paragraph.time.getTime() as any;
  });
  return { props: { paragraphs, skip, take, total } };
}
