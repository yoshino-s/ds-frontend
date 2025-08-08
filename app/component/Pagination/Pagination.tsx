import { Center, Group, Pagination as MantinePagination } from "@mantine/core";

import type { UsePaginationProps } from "react-instantsearch";
import { usePagination } from "react-instantsearch";

export default function Pagination(props: UsePaginationProps) {
  const { currentRefinement, nbPages, refine } = usePagination(props);

  return (
    <Center>
      <Group>
        <MantinePagination
          total={nbPages}
          value={currentRefinement + 1}
          onChange={(value) => refine(value - 1)}
        />
      </Group>
    </Center>
  );
}
