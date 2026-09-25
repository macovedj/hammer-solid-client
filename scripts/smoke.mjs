import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const host = "127.0.0.1";
const port = Number(process.env.SMOKE_PORT ?? 4174);
const baseUrl = `http://${host}:${port}`;
const viteEntry = new URL("../node_modules/vite/bin/vite.js", import.meta.url);

const server = spawn(
  process.execPath,
  [
    viteEntry.pathname,
    "preview",
    "--configLoader",
    "runner",
    "--host",
    host,
    "--port",
    String(port),
    "--strictPort",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);

let output = "";
server.stdout.on("data", chunk => {
  output += chunk;
});
server.stderr.on("data", chunk => {
  output += chunk;
});

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Preview server exited early (${server.exitCode}).\n${output}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for ${baseUrl}.\n${output}`);
}

try {
  await waitForServer();

  const [rootResponse, deepResponse, dataResponse] = await Promise.all([
    fetch(`${baseUrl}/`),
    fetch(`${baseUrl}/products/anvil`),
    fetch(`${baseUrl}/data/products.json`),
  ]);

  assert.equal(rootResponse.status, 200, "root should return 200");
  assert.equal(deepResponse.status, 200, "SPA deep link should return 200");
  assert.equal(dataResponse.status, 200, "local JSON should return 200");

  const [rootHtml, deepHtml, products] = await Promise.all([
    rootResponse.text(),
    deepResponse.text(),
    dataResponse.json(),
  ]);

  assert.equal(deepHtml, rootHtml, "deep link should fall back to the same index.html");
  assert.match(rootHtml, /<div id="root"><\/div>/, "document should expose an empty CSR mount");
  assert.ok(Array.isArray(products), "product payload should be an array");
  assert.ok(products.some(product => product.id === "anvil"), "product payload should contain anvil");

  console.log("✓ root: 200 with empty CSR mount");
  console.log("✓ /products/anvil: 200 with SPA fallback");
  console.log("✓ /data/products.json: 200 with deterministic local data");
} finally {
  server.kill("SIGTERM");
}
