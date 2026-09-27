# Tooth Cube Dental

Simple local website scaffold using HTML, CSS, and a dependency-free Node.js development server.

## Run

Requires Node.js 20 or newer. No dependency installation is needed.

```powershell
cd C:\cygwin64\home\wangc\workspace\toothcube-dental
npm run dev
```

Open http://localhost:3000. Set the PORT environment variable to use a different port.

## Files

- `dist/index.html`: homepage and editable content.
- `dist/styles.css`: responsive styles.
- `scripts/serve.mjs`: localhost-only development server.

Run `npm run check` to check server JavaScript syntax. The files in `dist` can be served by any static web host; the Node server is for local development.

## Before publishing

The current site could not be retrieved during scaffolding. All copy is preliminary, with clearly marked sections awaiting approved practice information. Confirm branding, team information, services, phone, address, office hours, and appointment destination before replacing the placeholders. Then remove the preview banner and noindex metadata.

No admin access, patient data collection, appointment backend, or production deployment is configured. Do not commit credentials to this project.
