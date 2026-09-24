import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speakers";
import { Box, Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: SpeakerSessions;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        {/* `as="h2"`: Card.Title renders an <h3> by default, which would
            skip a level under this page's single <h1> (there's no
            sectioning <h2> in between, unlike e.g. FeaturedSessions). */}
        <CardTitle as="h2" fontSize="md">
          {speaker.speaker}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Native list markup: each speaker's sessions are a real list, so
            screen readers should announce list/item semantics. */}
        <Flex as="ul" direction="column" gap="2" listStyleType="none">
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Text
                  fontSize="sm"
                  paddingY="1"
                  color="var(--text-secondary)"
                  textDecoration="underline"
                >
                  {session.startTime} · {session.title}
                </Text>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
