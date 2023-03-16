import { createStyles, TypographyStylesProvider } from "@mantine/core";
import { useEffect, useRef } from "react";

const useStyles = createStyles(() => ({
  paragraph: {
    lineBreak: "anywhere",
  },
}));

export function ParagraphContent({ content }: { content: string }) {
  const { classes } = useStyles();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll("*").forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        console.log(el.tagName, el.style);
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
    }
  }, [ref]);
  return (
    <TypographyStylesProvider>
      <div
        ref={ref}
        className={classes.paragraph}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </TypographyStylesProvider>
  );
}
