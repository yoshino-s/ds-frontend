import { Container, Grid, Group } from "@mantine/core";
import { useContext, useEffect } from "react";
import { useLoaderData, useLocation, useParams } from "react-router";

import { ParagraphCard } from "../component/ParagraphCard/ParagraphCard";

import { TitleContext } from "@/component/Header/Header";
import { usePaginationData } from "@/helper/hooks";

export default function SearchPage() {
  const [_title, setTitle] = useContext(TitleContext);

  const params = useLoaderData() as ZincQueryForSDK;

  const {
    page,
    pagination,
    data: paragraphs,
  } = usePaginationData<Paragraph>(params);

  const location = useLocation();
  const param = useParams();

  useEffect(() => {
    let action = "Index";
    if (location.pathname.startsWith("/search/")) {
      action = "Search";
    } else if (location.pathname.startsWith("/tag/")) {
      action = `Tag ${param.tag}`;
    } else if (location.pathname.startsWith("/author/")) {
      action = `Author ${param.author}`;
    }
    const title = `${action} Page ${page}`;
    setTitle(title);
  }, [page, location, param, setTitle]);

  return (
    <Container>
      <Grid my="md">
        {paragraphs.map((paragraph) => {
          return (
            <Grid.Col span={{ base: 12, sm: 6 }} key={paragraph._id}>
              <ParagraphCard {...paragraph} key={`${paragraph._id}_card`} />
            </Grid.Col>
          );
        })}
      </Grid>
      <Group justify="center">{pagination}</Group>
    </Container>
  );
}
