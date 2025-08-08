import { useCallback, useState } from "react";

import { TextInput, rem } from "@mantine/core";
import { TbSearch } from "react-icons/tb";

import type { UseSearchBoxProps } from "react-instantsearch";
import { useSearchBox } from "react-instantsearch";

export default function SearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);

  const setQuery = useCallback(
    (value: string) => {
      setInputValue(value);
      refine(value);
    },
    [refine, setInputValue],
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <TextInput
        placeholder="Search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        type="search"
        leftSection={<TbSearch style={{ width: rem(16), height: rem(16) }} />}
        value={inputValue}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
    </form>
  );
}
