import { Paragraph } from "@prisma/client";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import ParagraphGrid from "../../components/ParagraphGrid/ParagraphGrid";
import { prismaClient } from "../../lib/db";

interface ListProps {
  paragraphs: Omit<Paragraph, "content" | "markdown">[];
  skip: number;
  take: number;
  total: number;
  word: string;
}

export default function TagPage(props: ListProps) {
  return <ParagraphGrid title={`DS-Next | Search ${props.word}`} {...props} />;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ListProps>> {
  const skip = Number(ctx.query.skip ?? 0);
  const take = Number(ctx.query.take ?? 12);
  const word = ctx.params?.word;

  if (typeof word !== "string") {
    return { notFound: true };
  }

  const condition = {
    content: {
      search: word,
    },
    tags: {
      search: word,
    },
    author: {
      search: word,
    },
    title: {
      search: word,
    },
  };

  const [total, paragraphs] = await Promise.all([
    prismaClient.paragraph.count({
      where: condition,
    }),
    await prismaClient.paragraph.findMany({
      where: condition,
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
  return { props: { word, paragraphs, skip, take, total } };
}
