(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[279],{4922:function(e,t,i){Promise.resolve().then(i.bind(i,7528))},7528:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return c}});var n=i(7437);i(4213);var r=i(9937),s=i(8439);class o extends s.W20{get width(){return this._width}get height(){return this._height}getBounds(e,t){console.log("get bounds 2");var i=this.parent.getBounds(),n=i.clone(),r=this._anchors.x*i.width,s=this._anchors.y*i.height;return n.x+=r,n.y+=s,n.width=this._anchors.width*i.width-r,n.height=this._anchors.height*i.height-s,n}layout(){console.log("Do layout");var e=this.getBounds();null!=this._colorSprite&&(this._colorSprite.x=e.x,this._colorSprite.y=e.y,this._colorSprite.width=e.width,this._colorSprite.height=e.height)}onAdded(){this.layout()}onRemoved(){}constructor(e){super(),this._anchors=e.anchors,this._color=e.color||null,this.on("added",this.onAdded.bind(this)),this.on("removed",this.onRemoved.bind(this)),this._colorSprite=null,this._color&&(this._colorSprite=new s.jyi,this._colorSprite.filters=[new s.wn$(void 0,"\n    precision mediump float;\n\n    varying vec2 vTextureCoord;\n    uniform sampler2D uSampler;\n    uniform vec4 uColor;\n\n    void main() {\n        // gl_FragColor = texture2D(uSampler, vTextureCoord);\n        gl_FragColor = uColor;\n    }\n",{uColor:this._color.toArray()})],this.addChild(this._colorSprite))}}class h extends s.W20{get width(){return this._app.view.width}get height(){return this._app.view.height}getBounds(e,t){return console.log("get bounds"),new s.AeJ(0,0,this._app.view.width,this._app.view.height)}layoutChildren(e){for(let t of e.children)t instanceof o&&t.layout(),t instanceof s.W20&&this.layoutChildren(t)}layout(){this.layoutChildren(this)}onAdded(){this._app.renderer.addListener("resize",this._layoutListener),window.addEventListener("resize",this._layoutListener)}onRemoved(){this._app.renderer.removeListener("resize",this._layoutListener),window.removeEventListener("resize",this._layoutListener)}constructor(e){super(),this._app=e,this._layoutListener=this.layout.bind(this),this.on("added",this.onAdded.bind(this)),this.on("removed",this.onRemoved.bind(this))}}function l(e){let t=new h(e),i=new o({anchors:new s.AeJ(0,0,1,1),color:new s.Ilk([0,0,0,1])}),n=new o({anchors:new s.AeJ(0,0,1,.8),color:new s.Ilk("#030F19")}),r=new o({anchors:new s.AeJ(0,.8,1,1),color:new s.Ilk("#262830")});t.addChild(i),i.addChild(n),i.addChild(r),e.stage.addChild(t)}function d(e){}function a(e){}function c(){return(0,n.jsx)(r.Z,{title:"Carousel",stats:!1,init:l,tick:d,resize:a})}},9937:function(e,t,i){"use strict";let n,r;i.d(t,{Z:function(){return u}});var s=i(7437);i(591);var o=i(2265);i(3391);var h=i(1396),l=i.n(h);function d(e){let{children:t,title:i}=e;return(0,s.jsxs)("div",{className:"header-container",children:[(0,s.jsxs)("div",{className:"header-title flex flex-row justify-center items-center",children:[(0,s.jsx)("div",{className:"header-back-link text-lg",children:(0,s.jsx)(l(),{className:"p-2",href:"./",children:"<--"})}),i?(0,s.jsx)("h2",{className:"header-label grow pl-4 text-lg",children:i}):null]}),(0,s.jsx)("div",{className:"header-content",children:t})]})}var a=i(8439),c=i(5378);function u(e){let{title:t,header:i,stats:h,init:l,tick:u,resize:w}=e,f=(0,o.useRef)();return(0,o.useEffect)(()=>{let e;let t=f.current;if(t==n)return;n=t,t.innerHTML="",r&&r.destroy(),r=new a.MxU({background:"#000",resizeTo:t,antialias:!0}),t.append(r.view),l&&l(r),u&&r.ticker.add(()=>u(r)),h&&function(e){let t=(0,c.addStats)(document,e),i=a.vB5.shared;i.add(t.update,t,a.uFK.UTILITY)}(r);let i=!1;w&&r.renderer.on("resize",()=>{i||(e&&clearTimeout(e),r.view.style.display="none",e=setTimeout(()=>{var e=t.offsetWidth,n=t.offsetHeight;r.view.style.display="",(e<r.view.width||n<r.view.height)&&(i=!0,r.renderer.resize(e,n),i=!1),w(r)},200))})}),(0,s.jsxs)("main",{className:"flex min-h-screen flex-col items-center items-stretch",children:[(0,s.jsx)(d,{title:t,children:i}),(0,s.jsx)("div",{ref:f,className:"game-container flex flex-grow",children:"Game will be here"})]})}},4213:function(){},3391:function(){},591:function(){}},function(e){e.O(0,[176,756,971,596,744],function(){return e(e.s=4922)}),_N_E=e.O()}]);