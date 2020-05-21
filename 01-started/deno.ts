import { serve } from "https://deno.land/std@0.50.0/http/server.ts";

const s = serve({ port: 8000 });
const res = await fetch('http://api.plos.org/search?q=title:DNA');
const body = new Uint8Array(await res.arrayBuffer());

console.log("http://localhost:8000/");

for await (const req of s) {
  req.respond({
    body: body,
  });
}
