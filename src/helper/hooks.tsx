import { Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useOptionsState } from "@/store/module/options";
import { useDebounceCallback, useMediaQuery } from "@mantine/hooks";
import { merge } from "lodash";
import { SearchApi } from "./api";

export function usePaginationData<T>(query: ZincQueryForSDK) {
  const [params, setParams] = useSearchParams({
    page: "1",
    size: "10",
  });
  const { state: options } = useOptionsState();
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<T[]>([]);
  const [take, _] = useState(parseInt(params.get("size") || "10"));
  const [page, setPage] = useState(parseInt(params.get("page") || "1"));
  const isMobile = useMediaQuery("(max-width: 768px)");

  const update = useDebounceCallback(async function update() {
    console.log("query", query, page, take, options);
    const resp = await SearchApi.search(
      options.zincsearchUrl,
      merge(
        {
          search_type: "matchall",
          sort_fields: ["-@timestamp"],
          _source: ["title", "cover", "author", "tags"],
        },
        query,
        {
          from: (page - 1) * take,
          max_results: take,
        },
      ),
    );
    setTotal(resp.hits.total.value);
    setData(
      resp.hits.hits.map((hit) =>
        SearchApi.wrapParagraph(
          options.s3Url,
          merge({ _id: hit._id, "@timestamp": hit["@timestamp"] }, hit._source),
        ),
      ) as T[],
    );
  }, 200);

  useEffect(update, [query, page, take, options, update]);

  useEffect(() => {
    setParams({
      size: take.toString(),
      page: page.toString(),
    });
  }, [take, page, setParams]);

  return {
    data,
    page,
    pagination: (
      <Pagination
        size={isMobile ? "sm" : "md"}
        total={Math.ceil(total / take)}
        onChange={setPage}
        value={page}
      />
    ),
  };
}
