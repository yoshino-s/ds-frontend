import SearchBox from "@/component/SearchBox/SearchBox";
import {
  AppShell,
  Avatar,
  Center,
  Group,
  rem,
  UnstyledButton,
} from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import ScrollTop from "@/component/ScrollTop/ScrollTop";
import Loading from "@/page/Loading";

import { useHeadroom } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/store";
import {
  instantMeiliSearch,
  InstantMeiliSearchInstance,
} from "@meilisearch/instant-meilisearch";
import { InstantSearch } from "react-instantsearch";

import { singleIndex } from "instantsearch.js/es/lib/stateMappings";

export default function MainLayout() {
  const pinned = useHeadroom({ fixedAt: 60 });
  const selector = useAppSelector((state) => state.options);

  const path = useLocation().pathname;

  const isSearchPage = path === "/";

  const [searchClient, setSearchClient] =
    useState<InstantMeiliSearchInstance>();

  useEffect(() => {
    const { meilisearchUrl, meilisearchToken } = selector;
    const { searchClient } = instantMeiliSearch(
      meilisearchUrl,
      meilisearchToken,
      {
        finitePagination: true,
        meiliSearchParams: {
          hybrid: {},
          attributesToRetrieve: [
            "cover",
            "title",
            "time",
            "author",
            "tags",
            "id",
          ],
        },
      },
    );
    setSearchClient(searchClient);
  }, [selector, setSearchClient]);

  const shell = (
    <>
      <AppShell
        header={{ height: 60, collapsed: !pinned, offset: false }}
        h="100vh"
      >
        <AppShell.Header>
          <Group h="100%" justify="space-between" px="md">
            <Group>
              <Avatar fw={700} component={Link} to="/">
                DS
              </Avatar>
            </Group>
            <Group>
              {isSearchPage && <SearchBox />}
              <UnstyledButton component={Link} to="/settings">
                <Center>
                  <IconSettings />
                </Center>
              </UnstyledButton>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </AppShell.Main>
      </AppShell>
      <ScrollTop />
    </>
  );

  return (
    <>
      {searchClient &&
        (isSearchPage ? (
          <InstantSearch
            searchClient={searchClient!}
            indexName="paragraph"
            routing={{
              stateMapping: singleIndex("paragraph"),
            }}
          >
            {shell}
          </InstantSearch>
        ) : (
          shell
        ))}
    </>
  );
}
