import { Box } from "@mantine/core";
import { useHits, UseHitsProps } from "react-instantsearch";
import { ParagraphCard } from "../ParagraphCard/ParagraphCard";
import styles from "./Hits.module.css";

export default function Hits(props: UseHitsProps<Paragraph>) {
  const { results } = useHits(props);
  return (
    <Box className={styles["img-wrapper"]}>
      {results?.hits?.map((hit) => (
        <Box key={hit.id}>
          <ParagraphCard {...hit} key={`paragraph-card-${hit.id}`} />
        </Box>
      ))}
    </Box>
  );
}
