import { Container } from "../container";

export function HomeSkeleton() {
  return (
    <main className="min-h-screen">
      <section className="pt-8 pb-0">
        <Container size="full" className="max-w-screen-2xl">
          <div className="text-center mb-6">
            <div className="mx-auto h-9 w-72 rounded bg-background-muted animate-pulse" />
            <div className="mx-auto mt-3 h-5 w-96 max-w-full rounded bg-background-muted animate-pulse" />
          </div>
        </Container>
      </section>
      <Container size="full" className="max-w-screen-2xl px-4 lg:px-10">
        <div className="flex gap-2 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-9 w-20 rounded-lg bg-background-muted animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="h-32 rounded-xl border border-border/60 bg-background-elevated p-6 animate-pulse">
              <div className="h-10 w-10 rounded bg-background-muted mb-4" />
              <div className="h-4 w-24 rounded bg-background-muted mb-2" />
              <div className="h-3 w-32 rounded bg-background-muted" />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
