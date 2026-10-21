#!/usr/bin/env node
/**
 * CRIVE Payment Link — local URL builder for usecrive.com payment requests.
 * No network. No credentials.
 */

function parseArgs(argv) {
  const out = { base: "https://usecrive.com", chainId: "4663", memo: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--to") { out.to = next; i++; }
    else if (a === "--token") { out.token = next; i++; }
    else if (a === "--amount") { out.amount = next; i++; }
    else if (a === "--memo") { out.memo = next; i++; }
    else if (a === "--base") { out.base = next; i++; }
    else if (a === "--chainId") { out.chainId = next; i++; }
    else if (a === "--help" || a === "-h") { out.help = true; }
  }
  return out;
}

function isAddr(s) {
  return typeof s === "string" && /^0x[a-fA-F0-9]{40}$/.test(s);
}

const args = parseArgs(process.argv.slice(2));
if (args.help || !args.to || !args.token || !args.amount) {
  console.log(`CRIVE Payment Link

Usage:
  node bin/crive-payment-link.mjs --to 0x... --token 0x... --amount 10 [--memo text]

Options:
  --base     default https://usecrive.com
  --chainId  default 4663 (Robinhood Chain)
`);
  process.exit(args.help ? 0 : 2);
}

if (!isAddr(args.to) || !isAddr(args.token)) {
  console.error("Error: --to and --token must be 0x + 40 hex characters");
  process.exit(1);
}

const q = new URLSearchParams({
  to: args.to,
  token: args.token,
  amount: String(args.amount),
  memo: args.memo || "",
  chainId: args.chainId,
});

const url = `${args.base.replace(/\/$/, "")}/dashboard/payments?${q.toString()}`;
console.log("CRIVE Payment Link");
console.log(url);
