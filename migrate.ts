import { createReadStream } from "node:fs";
import { createInterface } from "node:readline/promises";

import { Paragraph, PrismaClient } from "@prisma/client";

import { prismaClient } from "./lib/db";

const client = new PrismaClient();

async function processLineByLine() {
  await prismaClient.$executeRaw`delete from Paragraph`;
  const fileStream = createReadStream("../paragraph.json");

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let idx = 1;

  let submitData: Paragraph[] = [];

  for await (const line of rl) {
    const data = JSON.parse(line);
    idx++;
    submitData.push({
      id: data.id,
      content: data.content,
      cover: data.cover,
      title: data.title,
      tags: data.tags.join(","),
      author: data.author,
      markdown: data.markdown,
      time: new Date(data.time.$date),
    });
    if (idx % 1000 === 0) {
      console.log(idx);
      await client.paragraph.createMany({
        data: submitData,
      });
      submitData = [];
    }
  }

  await client.paragraph.createMany({
    data: submitData,
  });
}

processLineByLine();
