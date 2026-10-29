const puppeteer = require('puppeteer');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../..');
const out = path.join(root,'kita-export/screenshots');
const pages = ['index','shop','story','craft','ritual','news','snow-jasmine','hibiscus-noir','volcano-oolong','untamed-rose','news-yunnan-to-the-table','news-sparkling-tea-tasting','news-tea-for-your-table','checkout'];
(async()=>{
 const browser=await puppeteer.launch({headless:true});
 const page=await browser.newPage();
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.evaluateOnNewDocument(()=>localStorage.setItem('chalu-demo-bag-v1',JSON.stringify({jasmine:1,oolong:1})));
 const manifest=[];
 for(const device of ['desktop','mobile']){
  await page.setViewport(device==='desktop'?{width:1440,height:960,deviceScaleFactor:1.5}:{width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
  for(const name of pages){
   await page.goto('http://127.0.0.1:4175/'+name+'.html',{waitUntil:'networkidle0'});
   await page.evaluate(async()=>{
    await document.fonts.ready;
    document.querySelectorAll('img[loading]').forEach(i=>i.loading='eager');
    await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));
    document.querySelectorAll('video').forEach(v=>v.pause());
    document.getAnimations().forEach(a=>a.finish());
   });
   const geometry=await page.evaluate(()=>({width:innerWidth,height:document.documentElement.scrollHeight,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length}));
   if(geometry.overflow||geometry.broken) throw new Error(name+' '+device+' '+JSON.stringify(geometry));
   const file=device+'-'+name+'.jpg';
   await page.screenshot({path:path.join(out,file),fullPage:true,type:'jpeg',quality:90});
   if(['index','shop','snow-jasmine','checkout','news','story'].includes(name)) await page.screenshot({path:path.join(out,device+'-'+name+'-viewport.jpg'),type:'jpeg',quality:92});
   manifest.push({page:name,device,file,...geometry});
   console.log(device+' '+name+' captured');
  }
 }
 fs.writeFileSync(path.join(root,'kita-export/source/capture-manifest.json'),JSON.stringify(manifest,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
