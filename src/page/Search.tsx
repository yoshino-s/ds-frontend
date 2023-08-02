import { Grid, Group } from "@mantine/core";
import { merge } from "lodash";
import { useContext, useEffect } from "react";
import { useLoaderData, useLocation, useParams } from "react-router";

import { ParagraphCard } from "../component/ParagraphCard/ParagraphCard";

import { TitleContext } from "@/component/Header/Header";
import { usePaginationData } from "@/helper/hooks";

export interface SearchPageProps {
  query?: ZincQueryForSDK;
}

export default function SearchPage(props: SearchPageProps) {
  const [_, setTitle] = useContext(TitleContext);

  const params = useLoaderData();

  const query: ZincQueryForSDK = merge(
    {
      search_type: "matchall",
      sort_fields: ["-@timestamp"],
      _source: ["title", "cover", "author", "tags"],
    },
    props.query,
    params
  );

  const {
    page,
    pagination,
    refresh,
    data: paragraphs,
  } = usePaginationData<Paragraph>(query);

  useEffect(() => {
    console.log("refresh");
    refresh();
  }, [params]);

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
    const title = `${action} Page 1`;
    setTitle(title);
  }, [page]);

  return (
    <div>
      <Grid my="md">
        {paragraphs.map((paragraph) => {
          return (
            <Grid.Col xs={12} sm={6} key={paragraph._id}>
              <ParagraphCard {...paragraph} key={paragraph._id} />
            </Grid.Col>
          );
        })}
      </Grid>
      <Group position="center">{pagination}</Group>
    </div>
  );
}
