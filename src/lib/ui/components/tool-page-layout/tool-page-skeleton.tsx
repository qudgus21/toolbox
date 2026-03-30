import { Container } from "../container";

export function ToolPageSkeleton() {
  return (
    <main className="min-h-[calc(100vh-4rem)] py-6 sm:py-8">
      <Container size="lg">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-32 rounded bg-background-muted animate-pulse" />
          <div className="h-9 w-9 rounded bg-background-muted animate-pulse" />
        </div>
        <div className="text-center mb-6">
          <div className="mx-auto h-8 w-64 rounded bg-background-muted animate-pulse" />
          <div className="mx-auto mt-2 h-5 w-96 max-w-full rounded bg-background-muted animate-pulse" />
        </div>
        <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-border/60 bg-background-elevated p-12">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-background-muted animate-pulse" />
            <div className="h-5 w-48 rounded bg-background-muted animate-pulse" />
            <div className="h-4 w-32 rounded bg-background-muted animate-pulse" />
          </div>
        </div>
      </Container>
    </main>
  );
}
