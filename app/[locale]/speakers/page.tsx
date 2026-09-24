import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Passing `locale` explicitly (rather than letting getTranslations infer it
  // from request context) avoids a runtime headers()/cookies() read that
  // Cache Components rejects during prerendering — see the "uncached or
  // runtime data during prerendering" build error this replaced.
  const t = await getTranslations({ locale, namespace: "SpeakersPage" });
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <Grid gap="4" templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.speaker} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
