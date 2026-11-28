function mountGuideCanvas(panel) {
 const viewport = panel.querySelector('.map-view');
 const art = viewport.querySelector('.board__diagram');
 const bar = panel.querySelector('.map-tools');
 const output = bar.querySelector('output');
 let scale = 1, x = 0, y = 0;
 let drag = null, suppressClick = false, autoFit = true;
 function paint() {
   art.style.transform = 'translate('+x+'px,'+y+'px) scale('+scale+')';
   output.value = Math.round(scale*100)+'%';
   bar.querySelector('[data-zoom="out"]').disabled = scale <= 0.25;
   bar.querySelector('[data-zoom="in"]').disabled = scale >= 4;
 }
 function fit() {
   if (!panel.open || !viewport.clientWidth) return;
   scale = Math.min(1,(viewport.clientWidth-32)/art.offsetWidth,(viewport.clientHeight-32)/art.offsetHeight);
   x = (viewport.clientWidth-art.offsetWidth*scale)/2;
   y = (viewport.clientHeight-art.offsetHeight*scale)/2;
   autoFit = true;
   paint();
 }
 function zoom(factor, cx, cy) {
   const next = Math.max(0.25,Math.min(4,scale*factor));
   x = cx-(cx-x)*next/scale;
   y = cy-(cy-y)*next/scale;
   scale = next;
   autoFit = false;
   paint();
 }
 bar.addEventListener('click', event => {
   const button = event.target.closest('[data-zoom]');
   if (!button) return;
   if (button.dataset.zoom === 'fit') fit();
   else zoom(button.dataset.zoom === 'in' ? 1.25 : 0.8, viewport.clientWidth/2, viewport.clientHeight/2);
 });
 viewport.addEventListener('wheel', event => {
   if (!event.ctrlKey && !event.metaKey) return;
   event.preventDefault();
   const rect = viewport.getBoundingClientRect();
   zoom(Math.exp(-Math.max(-150,Math.min(150,event.deltaY))*0.005),event.clientX-rect.left,event.clientY-rect.top);
 }, {passive:false});
 viewport.addEventListener('pointerdown', event => {
   if (event.button !== 0 || !event.isPrimary) return;
   suppressClick = false;
   drag = {id:event.pointerId, startX:event.clientX, startY:event.clientY, x, y, moved:false};
   event.target.setPointerCapture(event.pointerId);
 });
 viewport.addEventListener('pointermove', event => {
   if (!drag || event.pointerId !== drag.id) return;
   const dx = event.clientX-drag.startX, dy = event.clientY-drag.startY;
   if (!drag.moved && Math.hypot(dx,dy)<5) return;
   drag.moved = true;
   autoFit = false;
   viewport.classList.add('map-view--dragging');
   x = drag.x+dx; y = drag.y+dy;
   paint();
 });
 function finish(event) {
   if (!drag || event.pointerId !== drag.id) return;
   suppressClick = drag.moved;
   drag = null;
   viewport.classList.remove('map-view--dragging');
 }
 for (const event of ['pointerup','pointercancel','lostpointercapture']) viewport.addEventListener(event, finish);
 viewport.addEventListener('click', event => {
   if (!suppressClick || !event.detail) return;
   event.stopImmediatePropagation();
   event.preventDefault();
   suppressClick = false;
 },true);
 viewport.addEventListener('keydown',event=>{
   const move = {ArrowLeft:[45,0],ArrowRight:[-45,0],ArrowUp:[0,45],ArrowDown:[0,-45]}[event.key];
   if (!move) return;
   event.preventDefault();
   autoFit = false; x += move[0]; y += move[1]; paint();
 });
 function reveal(node) {
   const v = viewport.getBoundingClientRect(), b = node.getBoundingClientRect();
   if (b.left<v.left || b.right>v.right || b.top<v.top || b.bottom>v.bottom) {
     x += (v.left+v.right-b.left-b.right)/2;
     y += (v.top+v.bottom-b.top-b.bottom)/2;
     paint();
   }
 }
 viewport.addEventListener('focusin', event => {
   if (event.target.matches('.board__route')) reveal(event.target);
 });
 panel.addEventListener('toggle',()=>{if (autoFit) fit()});
 const observer = new ResizeObserver(()=>{if (autoFit) fit()});
 observer.observe(viewport);
 return {
   disconnect:()=>observer.disconnect(),
   locate(node) {
     panel.open = true;
     if (autoFit) fit();
     reveal(node);
     node.focus({preventScroll:true});
     viewport.scrollIntoView({block:'center'});
   }
 };
}

// Mount once after rendering a scene. Keys are local to this scene.
function mountGuideBranches(scope, onChange) {
 const panel = scope.querySelector('details[data-state-map]');
 const canvas = mountGuideCanvas(panel);
 const controls = Array.from(scope.querySelectorAll('button[data-branch]'));
 const wires = Array.from(panel.querySelectorAll('[data-wire]'));
 const rows = Array.from(scope.querySelectorAll('button[data-route]'));
 const nodes = new Map(controls.filter(button => panel.contains(button))
   .map(button => [button.dataset.branch, button]));

 function select(value) {
   const key = String(value);
   if (!nodes.has(key)) return;
   controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.branch === key)));
   wires.forEach(wire => {
     const active = wire.dataset.wire === key;
     wire.classList.toggle('is-selected', active);
     if (active) wire.parentNode.append(wire);
   });
   rows.forEach(button => button.closest('tr').setAttribute('aria-current', String(button.dataset.route === key)));
   onChange(key);
 }

 function onClick(event) {
   const button = event.target.closest('button[data-branch],button[data-route]');
   if (!button || !scope.contains(button)) return;
   const key = button.dataset.route ?? button.dataset.branch;
   if (!nodes.has(key)) return;
   select(key);
   if (button.hasAttribute('data-route')) canvas.locate(nodes.get(key));
 }

 scope.addEventListener('click', onClick);
 return {
   select,
   disconnect() {
     scope.removeEventListener('click', onClick);
     canvas.disconnect();
   }
 };
}
