# CRIVE Payment Link

Local **Node.js** CLI that builds CRIVE payment request URLs for [usecrive.com](https://usecrive.com) — same shape the app uses for Payment Links / invoices.

**Language:** JavaScript (Node 18+, zero dependencies)  
**Scope:** Local URL construction only  
**Credentials:** None  
**GitHub:** [github.com/usecrive](https://github.com/usecrive)

## What it does

Composes a link:

```text
https://usecrive.com/dashboard/payments?to=0x…&token=0x…&amount=…&memo=…&chainId=4663
```

You share the URL; the payer opens it in CRIVE and pays from their own wallet.

## Usage

```bash
node bin/crive-payment-link.mjs \
  --to 0xReceiverAddress \
  --token 0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168 \
  --amount 10.5 \
  --memo "Invoice 42"

# Optional base (default https://usecrive.com)
node bin/crive-payment-link.mjs --to 0x... --token 0x... --amount 1 --base https://usecrive.com
```

## Safety

- Does not broadcast transactions
- Does not store keys
- Does not call RPC

## License

MIT
