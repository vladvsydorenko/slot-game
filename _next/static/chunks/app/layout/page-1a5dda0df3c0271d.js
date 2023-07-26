(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[970],{2722:function(e,t,i){Promise.resolve().then(i.bind(i,5501))},5501:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return c}});var n=i(7437);i(4690);var r=i(9937),s=i(2528),o=i(6482),h=i(8439);function d(e){let t=new o.L(e),i=new s.A({anchors:new h.AeJ(0,0,1,1),color:new h.Ilk([0,0,0,1])}),n=new s.A({anchors:new h.AeJ(0,0,1,.1),color:new h.Ilk("#ECC8AF")}),r=new s.A({anchors:new h.AeJ(0,.1,1,.8),aspect:1.5,color:new h.Ilk("#4683AF")}),d=new s.A({anchors:new h.AeJ(0,.8,1,1),color:new h.Ilk("#C18C5D")});t.addChild(i),i.addChild(n),i.addChild(d),i.addChild(r),n.content.addChild(new h.xvT("Header, anchors: (0,0,1,0.1)",{fontSize:20})),r.content.addChild(new h.xvT("Game, 3/2 aspect ratio",{fontSize:20})),d.content.addChild(new h.xvT("Footer, anchors: (0,0.8,1,1)",{fontSize:20})),e.stage.addChild(t)}function l(e){}function a(e){}function c(){return(0,n.jsx)(r.Z,{title:"Layout",stats:!1,init:d,tick:l,resize:a})}},9937:function(e,t,i){"use strict";let n,r;i.d(t,{Z:function(){return u}});var s=i(7437);i(591);var o=i(2265);i(3391);var h=i(1396),d=i.n(h);function l(e){let{children:t,title:i}=e;return(0,s.jsxs)("div",{className:"header-container",children:[(0,s.jsxs)("div",{className:"header-title flex flex-row justify-center items-center",children:[(0,s.jsx)("div",{className:"header-back-link text-lg",children:(0,s.jsx)(d(),{className:"p-2",href:"./",children:"<--"})}),i?(0,s.jsx)("h2",{className:"header-label grow pl-4 text-lg",children:i}):null]}),(0,s.jsx)("div",{className:"header-content",children:t})]})}var a=i(8439),c=i(5378);function u(e){let{title:t,header:i,stats:h,init:d,tick:u,resize:w}=e,f=(0,o.useRef)();return(0,o.useEffect)(()=>{let e;let t=f.current;if(t==n)return;n=t,t.innerHTML="",r&&r.destroy(),r=new a.MxU({background:"#000",resizeTo:t,antialias:!0}),t.append(r.view),d&&d(r),u&&r.ticker.add(()=>u(r)),h&&function(e){let t=(0,c.addStats)(document,e),i=a.vB5.shared;i.add(t.update,t,a.uFK.UTILITY)}(r);let i=!1;w&&r.renderer.on("resize",()=>{i||(e&&clearTimeout(e),r.view.style.display="none",e=setTimeout(()=>{var e=t.offsetWidth,n=t.offsetHeight;r.view.style.display="",(e<r.view.width||n<r.view.height)&&(i=!0,r.renderer.resize(e,n),i=!1),w(r)},200))})}),(0,s.jsxs)("main",{className:"flex min-h-screen flex-col items-center items-stretch",children:[(0,s.jsx)(l,{title:t,children:i}),(0,s.jsx)("div",{ref:f,className:"game-container flex flex-grow",children:"Game will be here"})]})}},6482:function(e,t,i){"use strict";i.d(t,{L:function(){return s}});var n=i(8439),r=i(2528);class s extends n.W20{get width(){return this._app.view.width}get height(){return this._app.view.height}getBounds(e,t){return new n.AeJ(0,0,this._app.view.width,this._app.view.height)}layoutChildren(e){for(let t of e.children)t instanceof r.A&&t.layout(),t instanceof n.W20&&this.layoutChildren(t)}layout(){clearTimeout(this._layoutTimeout),setTimeout(()=>this.layoutChildren(this),100)}onAdded(){this._app.renderer.addListener("resize",this._layoutListener),window.addEventListener("resize",this._layoutListener)}onRemoved(){this._app.renderer.removeListener("resize",this._layoutListener),window.removeEventListener("resize",this._layoutListener)}constructor(e){super(),this._app=e,this._layoutListener=this.layout.bind(this),this.on("added",this.onAdded.bind(this)),this.on("removed",this.onRemoved.bind(this))}}},2528:function(e,t,i){"use strict";i.d(t,{A:function(){return r}});var n=i(8439);class r extends n.W20{get content(){return this._content}get x(){return this.getBounds().x}get y(){return this.getBounds().y}get width(){return this._width}get height(){return this._height}getBounds(e,t){var i=this.parent.getBounds(),n=i.clone(),s=this._anchors.x*i.width,o=this._anchors.y*i.height;return n.x+=s,n.y+=o,n.width=this._anchors.width*i.width-s,n.height=this._anchors.height*i.height-o,null!=this._aspect&&(n=r.calculateAspectedBounds(n,this._aspect)),n}layout(){var e=this.getBounds();this._width=e.width,this._height=e.height,this._content.x=e.x,this._content.y=e.y,null!=this._colorSprite&&(this._colorSprite.x=e.x,this._colorSprite.y=e.y,this._colorSprite.width=e.width,this._colorSprite.height=e.height)}onAdded(){this.layout()}onRemoved(){}static calculateAspectedBounds(e,t){let i=e.clone(),{width:n,height:r}=i,s=n/r;if(s>t){let e=n/t;if(e>r){var o=r/e;i.width=n*o,i.height=e*o}else i.width=n,i.height=e}else{let e=r*t;if(e>r){var o=n/e;i.width=e*o,i.height=r*o}else i.width=e,i.height=r}return i.x+=(e.width-i.width)/2,i.y+=(e.height-i.height)/2,i}constructor(e){super(),this._anchors=e.anchors,this._aspect=e.aspect||null,this._color=e.color||null,this.on("added",this.onAdded.bind(this)),this.on("removed",this.onRemoved.bind(this)),this._colorSprite=null,this._color&&(this._colorSprite=new n.jyi,this._colorSprite.filters=[new n.wn$(void 0,"\n    precision mediump float;\n\n    varying vec2 vTextureCoord;\n    uniform sampler2D uSampler;\n    uniform vec4 uColor;\n\n    void main() {\n        // gl_FragColor = texture2D(uSampler, vTextureCoord);\n        gl_FragColor = uColor;\n    }\n",{uColor:this._color.toArray()})],this.addChild(this._colorSprite)),this._content=new n.W20,this.addChild(this._content)}}},4690:function(){},3391:function(){},591:function(){}},function(e){e.O(0,[176,756,971,596,744],function(){return e(e.s=2722)}),_N_E=e.O()}]);