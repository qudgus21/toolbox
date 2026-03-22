import { Container } from "@/lib/ui";

export default function VideoHomePage() {
  return (
    <main className="py-20">
      <Container size="lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            <span className="text-accent">Video</span> Tools
          </h1>
          <p className="mt-4 text-lg text-foreground-muted max-w-2xl mx-auto">
            Convert, compress, trim, and edit videos. Coming soon.
          </p>
        </div>
      </Container>
    </main>
  );
}
