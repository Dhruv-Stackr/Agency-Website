import claims from "@/content/claims.json";

export type Claim = { id: string; stat: string; source: string; url: string; asOf: string; validUntil: string };
export const CLAIMS: Claim[] = (claims as { claims: Claim[] }).claims;
export const claimById = (id: string): Claim => {
  const c = CLAIMS.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown claim id "${id}". Every statistic must map to content/claims.json, mirrored from memory/claims.md CLEARED.`);
  return c;
};
