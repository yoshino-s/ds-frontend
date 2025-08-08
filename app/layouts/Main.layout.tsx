import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

import {
  AppShell,
  Avatar,
  Center,
  Group,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { TbSettings } from "react-icons/tb";

import type {
  InstantMeiliSearchInstance,
  MeiliSearch,
} from "@meilisearch/instant-meilisearch";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import { InstantSearch } from "react-instantsearch";
import { Link } from "react-router-dom";

import ScrollTop from "@/component/ScrollTop/ScrollTop";
import SearchBox from "@/component/SearchBox/SearchBox";
import Loading from "@/pages/Loading";
import useConfigStore from "@/store/config";
import { MeilisearchProvider } from "@/utils/meilisearchContext";

export default function MainLayout() {
  const pinned = useHeadroom({ fixedAt: 60 });
  const selector = useConfigStore();

  const path = useLocation().pathname;

  const isSearchPage = path === "/";

  const [searchClient, setSearchClient] =
    useState<InstantMeiliSearchInstance>();
  const [meilisearch, setMeilisearch] = useState<MeiliSearch | null>(null);

  useEffect(() => {
    const { meilisearchUrl, meilisearchToken, enableHybridSearch } = selector;
    const { searchClient, meiliSearchInstance } = instantMeiliSearch(
      meilisearchUrl,
      meilisearchToken,
      {
        finitePagination: true,
        meiliSearchParams: {
          hybrid: enableHybridSearch
            ? {
                embedder: "cloudflare",
              }
            : undefined,
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
    setMeilisearch(meiliSearchInstance);
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
                  <TbSettings />
                </Center>
              </UnstyledButton>
            </Group>
          </Group>
        </AppShell.Header>
        <AppShell.Main
          pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}
          pb={rem(60)}
        >
          <Suspense fallback={<Loading />}>
            <MeilisearchProvider value={meilisearch}>
              <Outlet />
            </MeilisearchProvider>
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
            searchClient={searchClient as any}
            indexName="paragraph"
            routing={{
              stateMapping: singleIndex("paragraph"),
            }}
            future={{
              preserveSharedStateOnUnmount: true,
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
