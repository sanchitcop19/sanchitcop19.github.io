#!/usr/bin/env node
// Local caption editor for a friends/<name>_2026 timeline page.
//
//   node tools/caption-editor.js [folder]     (default: makayla_2026)
//
// Serves an editor on 127.0.0.1 only, rewrites the `moments` list in that
// folder's data.js, and can commit + push. No dependencies. Nothing here is
// reachable from the internet; the live site never runs this file.

const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");
const { execFile } = require("child_process");

const name = process.argv[2] || "makayla_2026";
if (!/^[a-z0-9_]+$/i.test(name)) throw new Error("bad folder name");

const REPO = path.resolve(__dirname, "..");
const DIR = path.join(REPO, "friends", name);
const DATA = path.join(DIR, "data.js");
const PHOTOS = path.join(DIR, "photos");
const TOKEN = crypto.randomBytes(16).toString("hex");
const PORT = Number(process.env.PORT) || 4173;
const IMG = /\.(jpe?g|png|webp|gif)$/i;
const MIME = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

function load() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(DATA, "utf8"), sandbox, { timeout: 1000 });
  const moments = sandbox.window.BIRTHDAY.moments || [];
  const used = new Set(moments.map((m) => path.basename(m.photo || "")));
  const unlisted = fs.readdirSync(PHOTOS).filter((f) => IMG.test(f) && !used.has(f)).sort();
  return { moments, unlisted, name: sandbox.window.BIRTHDAY.name };
}

const str = (v) => (typeof v === "string" ? v.slice(0, 500) : "");

function save(input) {
  if (!Array.isArray(input) || input.length > 500) throw new Error("bad payload");
  const lines = input.map((m) => {
    const photo = str(m.photo);
    if (!/^photos\/[A-Za-z0-9._-]+$/.test(photo) || !fs.existsSync(path.join(DIR, photo))) {
      throw new Error("bad photo path: " + photo);
    }
    const parts = ["photo: " + JSON.stringify(photo)];
    for (const k of ["date", "title", "caption"]) {
      const v = str(m[k]).trim();
      if (v) parts.push(k + ": " + JSON.stringify(v));
    }
    return "        { " + parts.join(", ") + " },";
  });
  const src = fs.readFileSync(DATA, "utf8");
  const re = /moments:\s*\[[\s\S]*?\n?\s*\],/;
  if (!re.test(src)) throw new Error("moments list not found in data.js");
  const block = lines.length ? "moments: [\n" + lines.join("\n") + "\n    ]," : "moments: [],";
  fs.writeFileSync(DATA, src.replace(re, () => block));
}

function git(args) {
  return new Promise((resolve, reject) =>
    execFile("git", args, { cwd: REPO }, (err, out, errOut) =>
      err ? reject(new Error((errOut || err.message).trim())) : resolve(out.trim())
    )
  );
}

async function publish() {
  await git(["add", path.join("friends", name)]);
  const staged = await git(["diff", "--cached", "--name-only"]);
  if (staged) {
    await git(["commit", "-m", `feat: update ${name} captions`, "-m", "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"]);
  }
  await git(["pull", "--rebase", "-q"]);
  await git(["push", "-q"]);
  return staged ? "Published." : "Nothing new to commit; pushed anyway.";
}

const PAGE = fs.readFileSync(path.join(__dirname, "caption-editor.html"), "utf8");

function body(req) {
  return new Promise((resolve, reject) => {
    let n = 0;
    const chunks = [];
    req.on("data", (c) => {
      n += c.length;
      if (n > 1e6) { reject(new Error("too large")); req.destroy(); } else chunks.push(c);
    });
    req.on("end", () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString() || "{}")); } catch (e) { reject(e); } });
  });
}

const server = http.createServer(async (req, res) => {
  const send = (code, type, data) => { res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" }); res.end(data); };
  const json = (code, obj) => send(code, "application/json", JSON.stringify(obj));
  try {
    // Blocks DNS-rebinding: only accept requests addressed to localhost itself.
    if (!/^(127\.0\.0\.1|localhost):\d+$/.test(req.headers.host || "")) return send(403, "text/plain", "forbidden");
    const url = new URL(req.url, "http://localhost");

    if (req.method === "GET" && url.pathname === "/") return send(200, "text/html", PAGE.replace("__TOKEN__", TOKEN));
    if (req.method === "GET" && url.pathname === "/api/data") return json(200, load());
    if (req.method === "GET" && url.pathname.startsWith("/photo/")) {
      const f = path.basename(decodeURIComponent(url.pathname.slice(7)));
      const file = path.join(PHOTOS, f);
      if (!IMG.test(f) || !fs.existsSync(file)) return send(404, "text/plain", "not found");
      return send(200, MIME[f.split(".").pop().toLowerCase()], fs.readFileSync(file));
    }
    if (req.method === "POST" && (url.pathname === "/api/save" || url.pathname === "/api/publish")) {
      if (req.headers["x-token"] !== TOKEN) return json(403, { error: "bad token" });
      const data = await body(req);
      save(data.moments);
      if (url.pathname === "/api/publish") return json(200, { message: await publish() });
      return json(200, { message: "Saved." });
    }
    send(404, "text/plain", "not found");
  } catch (e) {
    json(500, { error: e.message });
  }
});

server.listen(PORT, "127.0.0.1", () => console.log(`Editing ${name}: http://127.0.0.1:${PORT}/`));
