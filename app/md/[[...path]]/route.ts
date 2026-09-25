import { loadDoc, markdownTwin } from "@/lib/content";
// The Markdown twin of every page. Reached via the Accept: text/markdown rewrite in next.config.ts, or directly at /md/<route>.
export async function GET(_req: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params;
  let doc = null;
  if (path.length === 0) doc = loadDoc("page", "home");
  else if (path[0] === "notes" && path[1]) doc = loadDoc("note", path[1]);
  else if (path.length === 1) doc = loadDoc("page", path[0]);
  if (!doc) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" } });
  return new Response(markdownTwin(doc), { status: 200, headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
}
