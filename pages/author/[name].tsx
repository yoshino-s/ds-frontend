import { Paragraph } from "@prisma/client";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import ParagraphGrid from "../../components/ParagraphGrid/ParagraphGrid";
import { prismaClient } from "../../lib/db";

interface ListProps {
  paragraphs: Omit<Paragraph, "content" | "markdown">[];
  skip: number;
  take: number;
  total: number;
  author: string;
}

export default function AuthorPage(props: ListProps) {
  return <ParagraphGrid title={`DS-Next | Author ${props.author}`} {...props} />;
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ListProps>> {
  const skip = Number(ctx.query.skip ?? 0);
  const take = Number(ctx.query.take ?? 12);
  const author = ctx.params?.name;

  if (!author || typeof author !== "string") {
    return { notFound: true };
  }

  const condition = {
    author: author,
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
  return { props: { author, paragraphs, skip, take, total } };
}
