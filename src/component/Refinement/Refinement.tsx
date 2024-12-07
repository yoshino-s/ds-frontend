import { SourceLabelMap } from "@/constants";
import {
  Badge,
  Box,
  CheckIcon,
  ComboboxItem,
  ComboboxLikeRenderOptionInput,
  Group,
  MultiSelect,
  rem,
  Select,
} from "@mantine/core";
import { useEffect } from "react";
import {
  useHitsPerPage,
  useRefinementList,
  useSortBy,
} from "react-instantsearch";

const sortItems = [
  { value: "paragraph:time:desc", label: "Newest" },
  { value: "paragraph:time:asc", label: "Oldest" },
];
const hitsPerPageItems = [
  { value: 20, label: "20", default: true },
  { value: 40, label: "40" },
  { value: 60, label: "60" },
  { value: 100, label: "100" },
];

export default function Refinement() {
  const { items, refine } = useRefinementList({ attribute: "source" });
  const { currentRefinement, refine: refineSortBy } = useSortBy({
    items: sortItems,
  });
  const hitsPerPage = useHitsPerPage({
    items: hitsPerPageItems,
  });

  const currentVal = items
    .filter((item) => item.isRefined)
    .map((item) => item.value);

  useEffect(() => {
    refineSortBy(sortItems[0].value);
  }, [refineSortBy]);

  function SelectItem(props: ComboboxLikeRenderOptionInput<ComboboxItem>) {
    return (
      <Group justify="space-between" w="100%">
        <Box
          style={{
            gap: "0.5em",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {currentVal.includes(props.option.value) && (
            <CheckIcon
              style={{
                opacity: "0.4",
                width: "0.8em",
                minWidth: "0.8em",
                height: "0.8em",
              }}
            />
          )}
          {props.option.label}
        </Box>
        <Badge>
          {items.find((item) => item.value === props.option.value)?.count}
        </Badge>
      </Group>
    );
  }

  return (
    <Group justify="space-between" align="center" my="md">
      <Group>
        <Select
          data={sortItems}
          value={currentRefinement}
          defaultValue={sortItems[0].value}
          onChange={(value) => value && refineSortBy(value)}
          label="Sort by"
        />
        <MultiSelect
          styles={{
            wrapper: {
              width: rem(300),
            },
          }}
          data={items.map((item) => ({
            value: item.label,
            label: SourceLabelMap[item.label],
          }))}
          renderOption={SelectItem}
          value={currentVal}
          label="Source"
          clearable
          onChange={(values) => {
            const diff = values
              .filter((value) => !currentVal.includes(value))
              .concat(currentVal.filter((value) => !values.includes(value)));
            diff.forEach((value) => refine(value));
          }}
        />
      </Group>
      <Group w={rem(96)}>
        <Select
          data={hitsPerPageItems.map((item) => ({
            value: item.value.toString(),
            label: item.label.toString(),
          }))}
          value={hitsPerPage.items
            .find((item) => item.isRefined)
            ?.value.toString()}
          onChange={(value) => value && hitsPerPage.refine(parseInt(value))}
          label="Hits per page"
        />
      </Group>
    </Group>
  );
}
