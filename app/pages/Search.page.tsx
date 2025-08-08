import { Container, Grid, Stack } from "@mantine/core";

import Hits from "@/component/Hits/Hits";
import Pagination from "@/component/Pagination/Pagination";
import Refinement from "@/component/Refinement/Refinement";

export default function SearchPage() {
  return (
    <Container size="xl">
      <Stack>
        <Refinement />
        <Grid my="md">
          <Hits />
        </Grid>
        <Pagination />
      </Stack>
    </Container>
  );
}
