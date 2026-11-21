'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');execFileSync(process.execPath,[path.join(root,'scripts/build.cjs')]);
const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
for(const file of [...html.matchAll(/(?:src|href)="([^"?#]+)"/g)].map(m=>m[1])){if(!file.startsWith('http')&&!file.startsWith('#'))assert(fs.existsSync(path.join(root,'dist',file)),file);}
const standalone=fs.readFileSync(path.join(root,'standalone/index.html'),'utf8');assert(!/<script src=|<link rel="stylesheet"/.test(standalone));assert(standalone.includes('data:image/png;base64,'));assert(standalone.includes('data:audio/wav;base64,'));assert(standalone.includes('naiwa-lab:resize'));assert(!/[A-Z]:[\\/]naiwa|C:\\Users/.test(standalone),'No workstation-specific runtime paths');
for(const name of ['README.md','docs/GAME_DESIGN.md','docs/WIKI_INTEGRATION.md','docs/DEVELOPMENT.md','THIRD_PARTY_NOTICES.md','integration/docusaurus/NaiwaLab.jsx','integration/docusaurus/NaiwaLab.module.css','tests/browser-smoke.cjs','.github/workflows/check.yml','.github/workflows/pages.yml'])assert(fs.existsSync(path.join(root,name)),name);
for(const match of fs.readFileSync(path.join(root,'README.md'),'utf8').matchAll(/\]\(([^)]+)\)/g)){if(!/^https?:/.test(match[1]))assert(fs.existsSync(path.join(root,match[1])),'README link: '+match[1]);}
console.log('PASS: reproducible build, local references, offline assets, embed bridge, portable runtime');
