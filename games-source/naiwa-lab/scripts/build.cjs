'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),src=path.join(root,'src'),dist=path.join(root,'dist');
fs.mkdirSync(dist,{recursive:true});
for(const name of ['index.html','style.css','engine.js','app.js','embed.js'])fs.copyFileSync(path.join(src,name),path.join(dist,name));
const assets={atlas:['evolutions.png','image/png'],sol:['legendary-sol.png','image/png'],logo:['gpt-logo.svg','image/svg+xml']};
for(const key of Object.keys(assets)){const [name,mime]=assets[key];assets[key]='data:'+mime+';base64,'+fs.readFileSync(path.join(root,'assets/images',name)).toString('base64');}
fs.writeFileSync(path.join(dist,'assets.js'),'window.ROGUE_ASSETS='+JSON.stringify(assets)+';\n');
const audio={};for(const name of ['ui-click','training-start','training-success','training-breakthrough','training-failure','model-sold'])audio[name]='data:audio/wav;base64,'+fs.readFileSync(path.join(root,'assets/audio',name+'.wav')).toString('base64');
fs.writeFileSync(path.join(dist,'audio.js'),'window.LAB_SOUNDS='+JSON.stringify(audio)+';\n');
let html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+fs.readFileSync(path.join(dist,'style.css'),'utf8')+'</style>');
for(const name of ['engine','assets','audio','app','embed'])html=html.replace('<script src="'+name+'.js"></script>',()=>'<script>'+fs.readFileSync(path.join(dist,name+'.js'),'utf8')+'</script>');
fs.mkdirSync(path.join(root,'standalone'),{recursive:true});fs.writeFileSync(path.join(root,'standalone/index.html'),html);
console.log('Built dist/ for hosting and standalone/index.html for offline play.');
