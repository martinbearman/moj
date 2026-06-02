import type { Event, Summary } from "./types.js";

export function summarise(events: readonly Event[]): Summary {
  const type: Summary["type"] = {};

  for (const event of events) {
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