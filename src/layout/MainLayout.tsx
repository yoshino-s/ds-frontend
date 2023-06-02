import { Box, Container, Flex, ScrollArea, createStyles } from "@mantine/core";
import { Suspense, useState } from "react";
import { Outlet } from "react-router";

import { HeaderSearch, TitleContext } from "@/component/Header/Header";
import Loading from "@/page/Loading";

const useStyles = createStyles((theme) => ({
  contentContainer: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: "100vw",
    overflow: "hidden",
  },
  rootContainer: {
    height: "100vh",
    width: "100vw",
  },
}));

export default function MainLayout() {
  const { classes } = useStyles();
  const [title, setTitle] = useState("");

  return (
    <TitleContext.Provider value={[title, setTitle]}>
      <Flex direction="column" className={classes.rootContainer}>
        <HeaderSearch />
        <Box className={classes.contentContainer}>
          <Suspense fallback={<Loading />}>
            <ScrollArea h="100%" w="100vw">
              <Container maw="100vw">
                <Outlet />
              </Container>
            </ScrollArea>
          </Suspense>
        </Box>
      </Flex>
    </TitleContext.Provider>
  );
}
