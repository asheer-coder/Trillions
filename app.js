
const slides=['Fancy Ladies Slippers','Boys Sandals','Sports Shoes','Fashion Footwear'];
let i=0;
setInterval(()=>{
 const el=document.getElementById('slideText');
 if(el){i=(i+1)%slides.length;el.innerText=slides[i];}
},2000);

function addShortcut(key, boxId){
 let name=prompt('Enter Name');
 let url=prompt('Enter URL');
 if(!name || !url) return;
 let data=JSON.parse(localStorage.getItem(key)||'[]');
 data.push({name,url});
 localStorage.setItem(key,JSON.stringify(data));
 renderShortcuts(key, boxId);
}
function renderShortcuts(key, boxId){
 const box=document.getElementById(boxId);
 if(!box) return;
 box.innerHTML='';
 let data=JSON.parse(localStorage.getItem(key)||'[]');
 data.forEach(x=>{
   let b=document.createElement('button');
   b.innerText=x.name;
   b.onclick=()=>window.open(x.url,'_blank');
   box.appendChild(b);
   box.appendChild(document.createElement('br'));
 });
}
