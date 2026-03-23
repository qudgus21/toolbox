import Link from "next/link";
import { Container } from "@/lib/ui";

export default function NotFound() {
  return (
    <main className="py-24">
      <Container size="sm" className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-foreground-muted mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
        >
          Go Home
        </Link>
      </Container>
    </main>
  );
}
