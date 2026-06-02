import type { Event, Summary } from "./types.js";

export function summarise(events: readonly Event[]): Summary {
  const type: Summary["type"] = {};
  const seenIds = new Set<string>();

  for (const event of events) {
    validateEvent(event);

    if (seenIds.has(event.id)) {
      throw new Error(`Duplicate id: ${event.id}`);
    }
    seenIds.add(event.id);

    const existing = type[event.type];
    if (existing) {
      existing.count += 1;
      existing.aggregate += event.value;
    } else {
      type[event.type] = { count: 1, aggregate: event.value };
    }
  }

  return {
    total: events.length,
    type,
  };
}

function validateEvent(event: Event): void {
  if (
    !event ||
    typeof event.id !== "string" ||
    event.id.length === 0 ||
    typeof event.timestamp !== "string" ||
    event.timestamp.length === 0 ||
    typeof event.type !== "string" ||
    event.type.length === 0 ||
    typeof event.value !== "number"
  ) {
    throw new Error("Invalid event");
  }

  if (Number.isNaN(Date.parse(event.timestamp))) {
    throw new Error(`Invalid timestamp: ${event.timestamp}`);
  }

  if (!Number.isFinite(event.value)) {
    throw new Error(`Invalid value: ${String(event.value)}`);
  }
}