import { Button, Container, createStyles, Group, rem, Text, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";

import { MINIO_ACCESS_KEY, MINIO_ENABLED, MINIO_ENDPOINT, MINIO_SECRET_KEY } from "../lib/config";
import { prismaClient } from "../lib/db";
import { minIO } from "../lib/minio";

function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
}

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: rem(32),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

interface StatsGroupProps {
  data: { title: string; stats: string; description?: string }[];
}

export default function StatisticPage({ data }: StatsGroupProps) {
  const { classes } = useStyles();
  const router = useRouter();

  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return (
    <Container my="7rem">
      <Title>Statistic</Title>
      <Group position="apart" my="2rem">
        <div></div>
        <Button variant="subtle" onClick={() => router.back()} rightIcon={<IconArrowBack />}>
          Back
        </Button>
      </Group>
      <div className={classes.root}>{stats}</div>
    </Container>
  );
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<StatsGroupProps>> {
  const [total, { time }] = await Promise.all([
    prismaClient.paragraph.count(),
    prismaClient.paragraph.findFirstOrThrow({
      orderBy: {
        time: "desc",
      },
      select: {
        time: true,
      },
    }),
  ]);

  const data = [
    {
      title: "Paragraphs",
      stats: total.toString(),
    },
    {
      title: "Last Update",
      stats: time?.toLocaleDateString() ?? "N/A",
    },
  ];

  if (MINIO_ENABLED) {
    await minIO.login(MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY);
    const info = await minIO.bucketInfo();
    data.push({
      title: "Images",
      stats: info.objects.toString(),
    });
    data.push({
      title: "Images Size",
      stats: humanFileSize(info.size),
    });
  }

  return {
    props: {
      data,
    },
  };
}
