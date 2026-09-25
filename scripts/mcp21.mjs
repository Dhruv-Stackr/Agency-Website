// Call one 21st.dev MCP tool over HTTP. Usage: node scripts/mcp21.mjs <tool> '<json args>'
const key = process.env.MCP21_KEY; if (!key) { console.error("MCP21_KEY missing"); process.exit(2); }
const [tool, args = "{}"] = process.argv.slice(2);
const r = await fetch("https://21st.dev/api/mcp", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", "x-api-key": key }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: tool, arguments: JSON.parse(args) } }) });
const raw = await r.text(); const m = raw.match(/data: (\{[\s\S]*\})/); const j = JSON.parse(m ? m[1] : raw);
const c = j.result?.content?.[0]; console.log(c?.text ?? JSON.stringify(j).slice(0, 2000));
