import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speakers";
import { Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: SpeakerSessions;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker.speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {speaker.sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Text
                fontSize="sm"
                color="var(--text-muted)"
                _hover={{ textDecoration: "underline" }}
              >
                {session.startTime} · {session.title}
              </Text>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
