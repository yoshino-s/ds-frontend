import {
  Affix,
  AppShell,
  Avatar,
  Button,
  Center,
  Group,
  Text,
  TextInput,
  Transition,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { Suspense, useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { TitleContext } from "@/component/Header/Header";
import Loading from "@/page/Loading";

import { useForm } from "@mantine/form";
import { useHeadroom, useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { IconArrowUp, IconSearch, IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function MainLayout() {
  const [title, setTitle] = useState("");
  const pinned = useHeadroom({ fixedAt: 60 });

  const [scroll, scrollTo] = useWindowScroll();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const search = useCallback(
    function submit({ search }: { search: string }) {
      console.log(search);
      navigate(`/search/${encodeURIComponent(search)}`);
    },
    [navigate],
  );

  return (
    <TitleContext.Provider value={[title, setTitle]}>
      <AppShell
        header={{ height: 60, collapsed: !pinned, offset: false }}
        padding="md"
        h="100vh"
      >
        <AppShell.Header>
          <Group h="100%" justify="space-between" px="md">
            <Group>
              <Avatar fw={700} component={Link} to="/">
                DS
              </Avatar>
              {!isMobile && (
                <Text size="lg" fw={700} ml="sm">
                  {title}
                </Text>
              )}
            </Group>

            <Group>
              <form onSubmit={form.onSubmit(search)}>
                <TextInput
                  placeholder="Search"
                  {...form.getInputProps("search")}
                  leftSection={
                    <IconSearch
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                />
              </form>
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
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={
                <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </TitleContext.Provider>
  );
}
