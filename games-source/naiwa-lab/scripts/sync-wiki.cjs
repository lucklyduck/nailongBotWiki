'use strict';
const path=require('node:path'),fs=require('node:fs'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
execFileSync(process.execPath,[path.join(__dirname,'build.cjs')],{stdio:'inherit'});
const target=path.resolve(root,'../../source/static/games/naiwa-lab');
fs.mkdirSync(target,{recursive:true});
for(const name of fs.readdirSync(path.join(root,'dist')))fs.copyFileSync(path.join(root,'dist',name),path.join(target,name));
console.log('Game assets synchronized to Wiki static/games/naiwa-lab.');
