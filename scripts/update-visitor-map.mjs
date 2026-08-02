import fs from "node:fs/promises";
import path from "node:path";

const sourceUrl = process.env.POSTHOG_SHARED_INSIGHT_URL;
const outputPath = process.env.VISITOR_MAP_OUTPUT || "assets/data/visitor-map.json";

if (!sourceUrl) {
  throw new Error("POSTHOG_SHARED_INSIGHT_URL is not configured");
}

const refreshUrl = new URL(sourceUrl);
refreshUrl.pathname = refreshUrl.pathname.replace(/\/$/, "");

if (!refreshUrl.pathname.endsWith(".json")) {
  refreshUrl.pathname = `${refreshUrl.pathname}.json`;
}

refreshUrl.searchParams.set("refresh", "force_blocking");

const response = await fetch(refreshUrl, {
  headers: { Accept: "application/json" },
});

if (!response.ok) {
  throw new Error(`PostHog returned HTTP ${response.status}`);
}

let payload = await response.json();

while (typeof payload === "string") {
  payload = JSON.parse(payload);
}

const insight = payload.insight || payload.data?.insight;
const rows = insight?.result;

if (insight?.query_status?.error) {
  throw new Error(`PostHog query failed: ${insight.query_status.error}`);
}

const lastRefresh = Date.parse(insight?.last_refresh || "");

if (!Number.isFinite(lastRefresh) || Date.now() - lastRefresh > 60 * 60 * 1000) {
  throw new Error("PostHog did not return freshly computed visitor data");
}

if (!Array.isArray(rows)) {
  throw new Error("PostHog country breakdown was not found");
}

if (rows.length === 0) {
  throw new Error("PostHog returned no country data; preserving the last good map");
}

const mergedCounts = new Map();

for (const row of rows) {
  const rawCode = String(row.breakdown_value || "")
    .trim()
    .toUpperCase();
  const code = rawCode === "TW" ? "CN" : rawCode;
  const count = Number(row.aggregated_value ?? row.count ?? 0);

  if (!/^[A-Z]{2}$/.test(code) || !Number.isFinite(count) || count <= 0) {
    continue;
  }

  mergedCounts.set(code, (mergedCounts.get(code) || 0) + count);
}

const countries = Object.fromEntries([...mergedCounts.entries()].sort(([left], [right]) => left.localeCompare(right)));

if (Object.keys(countries).length === 0) {
  throw new Error("PostHog returned no valid country data; preserving the last good map");
}

const totalPageviews = Object.values(countries).reduce((sum, count) => sum + count, 0);
const nextData = {
  updated_at: insight.last_refresh || insight.updated_at || new Date().toISOString(),
  total_pageviews: totalPageviews,
  countries,
};

let previousData;

try {
  previousData = JSON.parse(await fs.readFile(outputPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

const hasSameCounts =
  previousData?.total_pageviews === nextData.total_pageviews && JSON.stringify(previousData?.countries || {}) === JSON.stringify(nextData.countries);

if (hasSameCounts) {
  process.stdout.write("Visitor map counts are unchanged; the PostHog query was refreshed.\n");
} else {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(nextData, null, 2)}\n`);
  process.stdout.write(`Updated ${outputPath}.\n`);
}
