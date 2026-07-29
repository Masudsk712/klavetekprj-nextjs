import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Container from "@/components/shared/Container";
import Section from "@/components/shared/Section";

export default function Home() {
  return (
    <Section>
      <Container>
        <Heading
          subtitle="WELCOME"
          title="Klavetek Design System"
        />

        <Card className="text-center">
          <p className="mb-6">
            Phase 3 Successfully Completed
          </p>

          <Button>
            Get Started
          </Button>
        </Card>
      </Container>
    </Section>
  );
}