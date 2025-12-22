import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const srcLogo = path.join(ROOT, 'logo vintage mania.png');
const publicDir = path.join(ROOT, 'public');
const outLogo = path.join(publicDir, 'logo-vintage-mania.png');
const outBadge = path.join(publicDir, 'logo-badge.svg');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // ignore
  }
}

async function copyLogo() {
  try {
    await fs.access(srcLogo);
  } catch {
    return;
  }

  await ensureDir(publicDir);
  const logoBuffer = await fs.readFile(srcLogo);
  await fs.writeFile(outLogo, logoBuffer);

  const base64 = logoBuffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64}`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <clipPath id="c">
      <circle cx="256" cy="256" r="216" />
    </clipPath>
    <radialGradient id="g" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#5CFF5C" stop-opacity="0.18" />
      <stop offset="60%" stop-color="#0F3B2E" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#0B0B0B" stop-opacity="0.95" />
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="#0B0B0B"/>
  <circle cx="256" cy="256" r="240" fill="url(#g)" stroke="#FFE14A" stroke-width="10"/>
  <g clip-path="url(#c)">
    <image href="${dataUrl}" x="76" y="76" width="360" height="360" preserveAspectRatio="xMidYMid meet" />
  </g>
</svg>`;

  await fs.writeFile(outBadge, svg, 'utf8');
}

copyLogo();
