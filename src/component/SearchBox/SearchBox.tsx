import { rem, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch";

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
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={inputValue}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
    </form>
  );
}
