# Event Summary Service

A small TypeScript service that ingests event data and returns an aggregated summary.

## What it will do

The initial version of this project will support:

- Reading a JSON array of events
- Returning:
  - total number of events
  - count per event type
  - sum of `value` per event type

Expected event shape:

- `id: string`
- `timestamp: string` (ISO date-time string)
- `type: string`
- `value: number`

## Run locally

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run once in CI-style mode:

```bash
npm run test:run
```

Build TypeScript:

```bash
npm run build
```

Run with an input file (via npm script):

```bash
npm start -- events.example.json
```

Run directly with `tsx`:

```bash
npx tsx src/cli.ts events.example.json
```

## Application flow

1. Input JSON is read by the CLI (`src/cli.ts`) from a file path.
2. Input is parsed as an array of events.
3. Events are passed to `summarise(...)` in `src/summarise.ts`.
4. A summary JSON object is printed to stdout.

## Testing approach

The test suite (`src/summarise.test.ts`) covers:

- happy path aggregation for one type
- multi-type aggregation
- empty input edge case


## Assumptions and decisions

- Duplicate `id` handling is not implemented yet in code.
- Validation for malformed events is intentionally minimal in the current iteration.
- `value` is treated as numeric input from trusted JSON for now.
- Summary output groups by exact `type` string.

