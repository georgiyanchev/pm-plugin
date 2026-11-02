# Hosting

The owner's shared infrastructure, as it applies to this project. The shared parts are pre-filled from the owner's other projects; the `TBD:` slots are this project's. No address, credential, or key belongs in this file.

## This project

| What | Value |
|---|---|
| Domain | TBD: |
| Served from | TBD: the shared server below, or elsewhere (name it) |
| Site root on the server | `/srv/sites/TBD: domain/public/` |
| vhost | `/etc/nginx/sites-available/TBD: domain`, source in this repo at TBD: path |
| Subdomains | TBD: for example an image host, each with its own vhost |
| Ports | TBD: none for a static site; a process port must avoid the reserved ranges below |
| Deploy command | TBD: see "Deploy pattern" |
| Mail | TBD: inbound through Cloudflare Email Routing, outbound through which provider, or none |

## The shared server

- Host `TBD: server name`, reached only by SSH as root with a key: alias `TBD: ssh alias` in the owner's `~/.ssh/config`. Keys are per machine and are never committed; a new machine's public key is appended to the server by someone who already has access.
- Run server commands over SSH on the server by its alias; the same commands typed in a local PowerShell session fail or, worse, run against the wrong machine. Name the host in every command you hand the owner.
- The server runs the owner's other sites and production services. **Never touch another site's vhost. Never use the reserved port ranges (TBD: list them).** The current list of sites on the machine is in the owner's hosting note (TBD: path); look there before adding anything.
- Per-domain layout, the same for every site:

| What | Where |
|---|---|
| Site files | `/srv/sites/<domain>/public/`, owner `www-data` |
| nginx vhost | `/etc/nginx/sites-available/<domain>`, symlinked into `sites-enabled/` |
| TLS certificate and key | `/etc/ssl/cf-origin/<domain>.pem` and `.key` (key mode `600`) |

- Each vhost has three parts: port 80 redirects to `https://<domain>`; port 443 serves the site; `www.<domain>` 301-redirects to the apex. Security headers are set in the vhost; nginx drops the server-level `add_header` lines inside any `location` that has its own, so a new location with an `add_header` must repeat them.
- Copy a plain vhost as the starting point, not a hand-written one with site-specific headers. After pasting a vhost, check it holds no stray markdown link syntax before reloading.

## Cloudflare

- Each domain is its own Cloudflare zone. The origin certificate is a Cloudflare Origin CA certificate (RSA, PEM, `<domain>` and `*.<domain>`, 15-year validity, no renewal job). It is trusted only by Cloudflare, so every record pointing at the server stays **proxied** (orange cloud) and the zone's SSL/TLS mode is **Full (strict)**. An unproxied record shows a certificate error.
- Set SSL/TLS to Full (strict) **before** DNS points at the server; add the HTTP-to-HTTPS redirect only **after**. Adding the redirect under Flexible loops the browser.
- A zone that sends no mail carries `TXT "v=spf1 -all"` and a `p=reject` DMARC record. If mail is ever sent as the domain, replace both with the provider's values first. Inbound mail can use Cloudflare Email Routing (MX records to Cloudflare) and forward to the owner's mailbox.
- Cloudflare can inject scripts into pages (Web Analytics, Email Address Obfuscation); a strict Content-Security-Policy must allow what is turned on, and pages that show an address should wrap it in `<!--email_off-->`. Check a page in a real browser after any Cloudflare change.
- DNS, Email Routing, and dashboard settings are the owner's steps; agents have no Cloudflare access. Cloudflare's DNS import adds records and never overwrites: delete old records first.

## Deploy pattern

Static files: build locally, stream the build to the server, unpack **next to** the live folder, swap with two renames, keep the previous version for rollback. A failed upload never leaves a half-updated site; no nginx reload is needed for page changes.

```powershell
TBD: build command
cmd /c 'tar -C <build dir> -cf - . | ssh TBD: ssh alias "D=/srv/sites/TBD: domain; rm -rf $D/public.new && mkdir $D/public.new && tar -C $D/public.new -xf - && chown -R www-data:www-data $D/public.new && rm -rf $D/public.old && mv $D/public $D/public.old && mv $D/public.new $D/public && echo deployed"'
```

The `cmd /c` wrapper keeps the tar stream intact; PowerShell 5.1 would re-encode a binary pipe as text. Rollback: swap `public` and `public.old` back.

A vhost change: edit the source in this repo, copy it to the server as `<domain>.new`, back up the live file under `/root/`, copy the new one over, `nginx -t`, and only on a pass `systemctl reload nginx`; on a fail, put the backup back at once. `nginx -t` checks every site on the server.

After a deploy, check from the server with `curl --resolve <domain>:443:127.0.0.1` for every public path (expect `200`, and the intended `301`s), then open the site in a real browser: only the expected origins in the network panel, no Content-Security-Policy violation in the console, no leftover `TBD` text.

## Adding a domain to the shared server

1. Cloudflare: add the site, SSL/TLS Full (strict), create an Origin Server certificate.
2. Server: save the certificate and key under `/etc/ssl/cf-origin/`, `chmod 600` the key, confirm the two halves match (`openssl x509 ... -pubkey` against `openssl pkey ... -pubout`, same SHA-256).
3. Create `/srv/sites/<domain>/public/index.html`, `chown -R www-data:www-data`.
4. Copy a plain vhost, replace the domain throughout, link into `sites-enabled/`, `nginx -t`, reload on pass.
5. Test before DNS: `curl -sk --resolve <domain>:443:<server> https://<domain>/` on the server.
6. Add the DNS records (apex `A` proxied, `www` `CNAME` proxied, the two TXT records), then check `https://<domain>/` and `https://www.<domain>/`.

Every one of these is a production action: ask first, name the host, back up what you replace.
