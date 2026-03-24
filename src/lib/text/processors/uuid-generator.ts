import type { TextResult } from "../types";

export function process(
  _input: string,
  options?: Record<string, unknown>
): TextResult {
  const count = Math.max(1, (options?.count as number) ?? 5);
  const uppercase = (options?.uppercase as boolean) ?? false;

  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    let uuid: string;
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      uuid = crypto.randomUUID();
    } else {
      uuid = generateUUIDv4();
    }
    if (uppercase) uuid = uuid.toUpperCase();
    uuids.push(uuid);
  }

  return {
    output: uuids.join("\n"),
    stats: { count },
  };
}

function generateUUIDv4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);

  // Set version (4) and variant (10xx)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}
