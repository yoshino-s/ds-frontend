import { Pagination } from "@mantine/core";
import { merge } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchApi } from "./api";

import { useOptionsState } from "@/store/module/options";

export function usePaginationData<T>(query: ZincQueryForSDK) {
  const [params, setParams] = useSearchParams({
    page: "1",
    size: "10",
  });
  const { state: options } = useOptionsState();
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<T[]>([]);
  const [skip, setSkip] = useState(0);
  const [take, _] = useState(parseInt(params.get("size") || "10"));
  const [page, setPage] = useState(parseInt(params.get("page") || "1"));

  function refresh() {
    SearchApi.search(
      options.zincsearchUrl,
      merge({}, query, {
        from: skip,
        max_results: take,
      })
    ).then((resp) => {
      setTotal(resp.hits.total.value);
      setData(
        resp.hits.hits.map((hit) =>
          SearchApi.wrapParagraph(
            options.s3Url,
            merge({ _id: hit._id }, hit._source)
          )
        ) as T[]
      );
    });
  }

  useEffect(() => {
    refresh();
  }, [skip, take]);

  useEffect(() => {
    console.log("set params");
    setParams({
      size: take.toString(),
      page: page.toString(),
    });
  }, [take, page]);

  useEffect(() => {
    setSkip((page - 1) * take);
  }, [page]);

  return {
    total,
    data,
    page,
    refresh,
    pagination: (
      <Pagination
        total={Math.ceil(total / take)}
        onChange={setPage}
        value={page}
      />
    ),
  };
}
