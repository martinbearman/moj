import { describe, expect, it } from "vitest";
import { summarise } from "./summarise.js";
import type { Event } from "./types.js";

function event(overrides: Partial<Event> & Pick<Event, "id">): Event {
  return {
    timestamp: "2025-01-01T00:00:00.000Z",
    type: "click",
    value: 10,
    ...overrides,
  };
}

describe("summarise", () => {
  it("returns zero total and empty type map for an empty array", () => {
    expect(summarise([])).toEqual({
      total: 0,
      type: {},
    });
  });

  it("aggregates count and sum for a single event type", () => {
    const events: Event[] = [
      event({ id: "1", type: "click", value: 50 }),
      event({ id: "2", type: "click", value: 70 }),
    ];

    expect(summarise(events)).toEqual({
      total: 2,
      type: {
        click: { count: 2, aggregate: 120 },
      },
    });
  });

  it("breaks down count and aggregate per event type", () => {
    const events: Event[] = [
      event({ id: "1", type: "click", value: 20 }),
      event({ id: "2", type: "click", value: 30 }),
      event({ id: "3", type: "purchase", value: 100 }),
      event({ id: "4", type: "purchase", value: 200 }),
    ];

    expect(summarise(events)).toEqual({
      total: 4,
      type: {
        click: { count: 2, aggregate: 50 },
        purchase: { count: 2, aggregate: 300 },
      },
    });
  });
});
