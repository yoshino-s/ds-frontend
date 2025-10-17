import rehypeStarryNight from "rehype-starry-night";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import onigurumaWasmUrl from "./onig.wasm?url";

export async function markdownToHtml(markdown: string) {
  console.log(onigurumaWasmUrl);
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeStarryNight, {
      getOnigurumaUrlFetch: () =>
        new URL(onigurumaWasmUrl, window.location.origin),
    })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
