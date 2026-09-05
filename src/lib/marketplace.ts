import { marketplaces } from "@/data/home/marketplaces";
export function detectMarketplace(value: string) {
  try {
    value = value.trim();
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (!["https:", "http:"].includes(url.protocol)) return undefined;
    return marketplaces.find(
      (m) => url.hostname === m.domain || url.hostname.endsWith("." + m.domain),
    );
  } catch {
    return undefined;
  }
}
