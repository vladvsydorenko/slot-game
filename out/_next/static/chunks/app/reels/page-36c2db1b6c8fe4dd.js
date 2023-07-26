(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[624],{7989:function(e,t,i){Promise.resolve().then(i.bind(i,4366))},4366:function(e,t,i){"use strict";let s;i.r(t),i.d(t,{default:function(){return g}});var n=i(7437);i(2404);var r=i(9937),h=i(2528),o=i(6482),l=i(8439);class d{static setTexture(e,t){this._textures[e]=t}static getTexture(e){return this._textures[e]}static getSprite(e){let t=this._sprites[e];if(t||(t=[],this._sprites[e]=t),t.length>0)return t.pop();var i=this.getTexture(e);return new l.jyi(i)}static addSprite(e,t){let i=this._sprites[e];i||(i=[],this._sprites[e]=i),i.push(t)}}d._textures={},d._sprites={};class a{get sprite(){return this._sprite}static create(e){let t=this._pools[e];return void 0!=t&&t.length>0?t.pop():new a(e,d.getSprite(e))}static free(e){let t=this._pools[e._name];void 0==t&&(t=[],this._pools[e._name]=t),t.includes(e)||t.push(e)}static destroy(e){let t=this._pools[e._name];void 0!=t&&t.includes(e)&&t.splice(t.indexOf(e),1),d.addSprite(e._name,e._sprite)}static getRandomName(){return"/slot-game/images/slot-".concat(Math.floor(8*Math.random())+1,".png")}constructor(e,t){this._name=e,this._sprite=t}}a._pools={};class c extends h.A{layout(){super.layout();for(let e=0;e<this._layouts.length;e++){let t=this._layouts[e],i=this._cells[e],s=t.width/10;i.sprite.x=s,i.sprite.y=s,i.sprite.width=t.width-s,i.sprite.height=t.height-s}}reset(){this._time=0,this._startTime=Date.now();let e=this._cellsCount+this._hiddenCellsCount-this._cellsCount;for(let t=0;t<this._cellsCount;t++){let i=this._cells[t],s=this._cells[e+t];i.sprite.texture=s.sprite.texture}let t=this._cellsCount+this._hiddenCellsCount;for(let e=this._cellsCount;e<t;e++){let t=this._cells[e];t.sprite.texture=d.getTexture(a.getRandomName())}this._anchors.y=0,this._anchors.height=1}tick(e){if(this._time+=e.ticker.deltaMS,this._time<this._delay)return;let t=1/this._cellsCount*this._hiddenCellsCount;Math.abs(this._anchors.y)<=t&&(this._anchors.y-=this._speed*e.ticker.deltaTime,this._anchors.height-=this._speed*e.ticker.deltaTime)}onAdd(){let e=1/this._cellsCount,t=this._cellsCount+this._hiddenCellsCount;for(let i=0;i<t;i++){let t=a.create(a.getRandomName());this._cells.push(t);let s=i*e,n=new h.A({anchors:new l.AeJ(0,s,1,s+e),aspect:1});this._layouts.push(n),t.sprite.x=0,t.sprite.y=0,t.sprite.width=n.width,t.sprite.height=n.height,n.content.addChild(t.sprite),this.addChild(n)}}onRemove(){}constructor(e){super(e),this._startTime=0,this._time=0,this._delay=0,this._speed=.04,this._cells=[],this._layouts=[],this._delay=e.delay,this._cellsCount=e.cells,this._hiddenCellsCount=e.hiddenCells,this.on("added",this.onAdd),this.on("removed",this.onRemove)}}let u=[];function _(e){s=new o.L(e);let t=new h.A({anchors:new l.AeJ(0,0,1,1),color:new l.Ilk([0,0,0,1])});new h.A({anchors:new l.AeJ(0,0,1,.1),color:new l.Ilk("#373F47")});let i=new h.A({anchors:new l.AeJ(0,0,1,.9),aspect:1.5,color:new l.Ilk("#4683AF")}),n=new h.A({anchors:new l.AeJ(0,.9,1,1),color:new l.Ilk("#373F47")});s.addChild(t),t.addChild(i),t.addChild(n);let r=new h.A({anchors:new l.AeJ(0,0,.33,1),color:new l.Ilk("#8B8982")}),a=new h.A({anchors:new l.AeJ(.33,0,.66,1),color:new l.Ilk("#6C91C2")}),_=new h.A({anchors:new l.AeJ(.66,0,1,1),color:new l.Ilk("#C3C9E9")});i.addChild(r),i.addChild(a),i.addChild(_);for(let e=0;e<9;e++){let t="/slot-game/images/slot-".concat(e+1,".png");d.setTexture(t,l.xEZ.from(t))}[r,a,_].forEach((e,t)=>{let i=new c({anchors:new l.AeJ(0,0,1,1),cells:3,delay:250*t,hiddenCells:12});u.push(i),e.addChild(i)}),s.layout();var p=new h.A({anchors:new l.AeJ(0,0,1,1),aspect:1});n.addChild(p);let w=l.jyi.from("/slot-game/images/repeat.png");w.interactive=!0,w.on("pointerdown",()=>{u.forEach(e=>{e.reset()})}),w.width=p.width,w.height=p.height,p.content.addChild(w),e.stage.addChild(s)}function p(e){u.forEach(t=>t.tick(e)),s.layout()}function w(e){}function g(){return(0,n.jsx)(r.Z,{title:"Reels",stats:!1,init:_,tick:p,resize:w})}},9937:function(e,t,i){"use strict";let s,n;i.d(t,{Z:function(){return u}});var r=i(7437);i(591);var h=i(2265);i(3391);var o=i(1396),l=i.n(o);function d(e){let{children:t,title:i}=e;return(0,r.jsxs)("div",{className:"header-container",children:[(0,r.jsxs)("div",{className:"header-title flex flex-row justify-center items-center",children:[(0,r.jsx)("div",{className:"header-back-link text-lg",children:(0,r.jsx)(l(),{className:"p-2",href:"./",children:"<--"})}),i?(0,r.jsx)("h2",{className:"header-label grow pl-4 text-lg",children:i}):null]}),(0,r.jsx)("div",{className:"header-content",children:t})]})}var a=i(8439),c=i(5378);function u(e){let{title:t,header:i,stats:o,init:l,tick:u,resize:_}=e,p=(0,h.useRef)();return(0,h.useEffect)(()=>{let e;let t=p.current;if(t==s)return;s=t,t.innerHTML="",n&&n.destroy(),n=new a.MxU({background:"#000",resizeTo:t,antialias:!0}),t.append(n.view),l&&l(n),u&&n.ticker.add(()=>u(n)),o&&function(e){let t=(0,c.addStats)(document,e),i=a.vB5.shared;i.add(t.update,t,a.uFK.UTILITY)}(n);let i=!1;_&&n.renderer.on("resize",()=>{i||(e&&clearTimeout(e),n.view.style.display="none",e=setTimeout(()=>{var e=t.offsetWidth,s=t.offsetHeight;n.view.style.display="",(e<n.view.width||s<n.view.height)&&(i=!0,n.renderer.resize(e,s),i=!1),_(n)},200))})}),(0,r.jsxs)("main",{className:"flex min-h-screen flex-col items-center items-stretch",children:[(0,r.jsx)(d,{title:t,children:i}),(0,r.jsx)("div",{ref:p,className:"game-container flex flex-grow",children:"Game will be here"})]})}},6482:function(e,t,i){"use strict";i.d(t,{L:function(){return r}});var s=i(8439),n=i(2528);class r extends s.W20{get width(){return this._app.view.width}get height(){return this._app.view.height}getBounds(e,t){return new s.AeJ(0,0,this._app.view.width,this._app.view.height)}layoutChildren(e){for(let t of e.children)t instanceof n.A&&t.layout(),t instanceof s.W20&&this.layoutChildren(t)}layout(){clearTimeout(this._layoutTimeout),setTimeout(()=>this.layoutChildren(this),100)}onAdded(){this._app.renderer.addListener("resize",this._layoutListener),window.addEventListener("resize",this._layoutListener)}onRemoved(){this._app.renderer.removeListener("resize",this._layoutListener),window.removeEventListener("resize",this._layoutListener)}constructor(e){super(),this._app=e,this._layoutListener=this.layout.bind(this),this.on("added",this.onAdded.bind(this)),this.on("removed",this.onRemoved.bind(this))}}},2528:function(e,t,i){"use strict";i.d(t,{A:function(){return n}});var s=i(8439);class n extends s.W20{get content(){return this._content}get x(){return this.getBounds().x}get y(){return this.getBounds().y}get width(){return this._width}get height(){return this._height}getBounds(e,t){var i=this.parent.getBounds(),s=i.clone(),r=this._anchors.x*i.width,h=this._anchors.y*i.height;return s.x+=r,s.y+=h,s.width=this._anchors.width*i.width-r,s.height=this._anchors.height*i.height-h,null!=this._aspect&&(s=n.calculateAspectedBounds(s,this._aspect)),s}layout(){var e=this.getBounds();this._width=e.width,this._height=e.height,this._content.x=e.x,this._content.y=e.y,null!=this._colorSprite&&(this._colorSprite.x=e.x,this._colorSprite.y=e.y,this._colorSprite.width=e.width,this._colorSprite.height=e.height)}onAdded(){this.layout()}onRemoved(){}static calculateAspectedBounds(e,t){let i=e.clone(),{width:s,height:n}=i,r=s/n;if(r>t){let e=s/t;if(e>n){var h=n/e;i.width=s*h,i.height=e*h}else i.width=s,i.height=e}else{let e=n*t;if(e>n){var h=s/e;i.width=e*h,i.height=n*h}else i.width=e,i.height=n}return i.x+=(e.width-i.width)/2,i.y+=(e.height-i.height)/2,i}constructor(e){super(),this._anchors=e.anchors,this._aspect=e.aspect||null,this._color=e.color||null,this.on("added",this.onAdded.bind(this)),this.on("removed",this.onRemoved.bind(this)),this._colorSprite=null,this._color&&(this._colorSprite=new s.jyi,this._colorSprite.filters=[new s.wn$(void 0,"\n    precision mediump float;\n\n    varying vec2 vTextureCoord;\n    uniform sampler2D uSampler;\n    uniform vec4 uColor;\n\n    void main() {\n        // gl_FragColor = texture2D(uSampler, vTextureCoord);\n        gl_FragColor = uColor;\n    }\n",{uColor:this._color.toArray()})],this.addChild(this._colorSprite)),this._content=new s.W20,this.addChild(this._content)}}},2404:function(){},3391:function(){},591:function(){}},function(e){e.O(0,[176,756,971,596,744],function(){return e(e.s=7989)}),_N_E=e.O()}]);