(function(e){function t(t){for(var r,o,i=t[0],c=t[1],s=t[2],l=0,d=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(d.length)d.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-115d6c41":"04b7d340","chunk-24212af6":"03756a27","chunk-2d12e1bb":"ed4366e3","chunk-599f334b":"4b81ba00","chunk-6755de53":"7b54966e","chunk-720317a1":"1e1841f7","chunk-7373c9f6":"fab164fc","chunk-795be29e":"3ac08502","chunk-98bac026":"44eb5442","chunk-a34fd2fc":"3d8ace32","chunk-9a4a4284":"90cbb826","chunk-e52319f6":"0b3d1f7f"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-2d12e1bb":1,"chunk-599f334b":1,"chunk-98bac026":1,"chunk-a34fd2fc":1,"chunk-e52319f6":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-115d6c41":"31d6cfe0","chunk-24212af6":"31d6cfe0","chunk-2d12e1bb":"256075ee","chunk-599f334b":"fa4804dd","chunk-6755de53":"31d6cfe0","chunk-720317a1":"31d6cfe0","chunk-7373c9f6":"31d6cfe0","chunk-795be29e":"31d6cfe0","chunk-98bac026":"547a5f6a","chunk-a34fd2fc":"be9ef713","chunk-9a4a4284":"31d6cfe0","chunk-e52319f6":"1e4d0e4a"}[e]+".css",a=c.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var s=u[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){s=d[i],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],p.parentNode.removeChild(p),n(u)},p.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=i(e);var d=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(p);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var p=l;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"4d71":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],u=n("2877"),i={},c=Object(u["a"])(i,o,a,!1,null,null,null),s=c.exports,l=(n("d3b7"),n("8c4f")),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("el-container",{staticStyle:{height:"100%",border:"1px solid #eee"}},[n("el-aside",{staticClass:"aside",staticStyle:{"background-color":"rgb(238, 241, 246)"}},[n("el-menu",{attrs:{router:""}},[n("el-submenu",{attrs:{index:"1"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-message"}),e._v("分类管理 ")]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("分类")]),n("el-menu-item",{attrs:{index:"/categories/create"}},[e._v("新建分类")]),n("el-menu-item",{attrs:{index:"/categories/list"}},[e._v("分类列表")])],2)],2),n("el-submenu",{attrs:{index:"2"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-wallet"}),e._v("物品管理 ")]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("物品")]),n("el-menu-item",{attrs:{index:"/goods/create"}},[e._v("新建物品")]),n("el-menu-item",{attrs:{index:"/goods/list"}},[e._v("物品列表")])],2)],2),n("el-submenu",{attrs:{index:"3"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-coffee-cup"}),e._v("广告管理 ")]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("广告")]),n("el-menu-item",{attrs:{index:"/ads/create"}},[e._v("新建广告")]),n("el-menu-item",{attrs:{index:"/ads/list"}},[e._v("广告列表")])],2)],2),n("el-submenu",{attrs:{index:"4"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-coffee-cup"}),e._v("用户管理 ")]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("用户")]),n("el-menu-item",{attrs:{index:"/users/create"}},[e._v("新建用户")]),n("el-menu-item",{attrs:{index:"/users/list"}},[e._v("用户列表")])],2)],2),n("el-submenu",{attrs:{index:"5"}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-magic-stick"}),e._v("订单管理 ")]),n("el-menu-item-group",[n("template",{slot:"title"},[e._v("订单")]),n("el-menu-item",{attrs:{index:"/orders/list"}},[e._v("订单")]),n("el-menu-item",{attrs:{index:"/orders/edit"}},[e._v("订单管理")])],2)],2)],1)],1),n("el-container",[n("el-header",{staticStyle:{"text-align":"right","font-size":"12px"}},[n("el-dropdown",[n("i",{staticClass:"el-icon-setting",staticStyle:{"margin-right":"15px"}}),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[e._v("查看")]),n("el-dropdown-item",[e._v("新增")]),n("el-dropdown-item",[e._v("删除")])],1)],1),n("router-link",{attrs:{to:"/login",tag:"span"}},[e._v(e._s(e.user.username))])],1),n("el-main",[n("router-view",{key:e.$route.path})],1)],1)],1)],1)},p=[],f={data:function(){return{user:{username:""}}},mounted:function(){this.user.username=localStorage.getItem("user"),console.log(this.user.username)}},h=f,m=(n("5d3c"),Object(u["a"])(h,d,p,!1,null,"22b9c4c4",null)),b=m.exports,g=function(){return n.e("chunk-6755de53").then(n.bind(null,"0ce0"))},v=function(){return Promise.all([n.e("chunk-7373c9f6"),n.e("chunk-795be29e")]).then(n.bind(null,"5a4b"))},k=function(){return Promise.all([n.e("chunk-7373c9f6"),n.e("chunk-a34fd2fc")]).then(n.bind(null,"97f6"))},_=function(){return n.e("chunk-24212af6").then(n.bind(null,"e46b"))},y=function(){return Promise.all([n.e("chunk-7373c9f6"),n.e("chunk-98bac026")]).then(n.bind(null,"f36d"))},x=function(){return n.e("chunk-115d6c41").then(n.bind(null,"ebd7"))},w=function(){return n.e("chunk-9a4a4284").then(n.bind(null,"b7c9"))},S=function(){return n.e("chunk-720317a1").then(n.bind(null,"74b3"))},C=function(){return n.e("chunk-e52319f6").then(n.bind(null,"578a"))},j=function(){return n.e("chunk-2d12e1bb").then(n.bind(null,"b059"))},O=function(){return n.e("chunk-599f334b").then(n.bind(null,"e8ce"))};r["default"].use(l["a"]);var P=[{path:"/",redirect:"/login"},{path:"/",name:"Main",component:b,children:[{path:"categories/create",component:v},{path:"categories/list",component:g},{path:"categories/edit/:id",component:v,props:!0},{path:"goods/create",component:k},{path:"goods/edit/:id",component:k,props:!0},{path:"goods/list",component:_},{path:"ads/create",component:y},{path:"ads/edit/:id",component:y,props:!0},{path:"ads/list",component:x},{path:"users/create",component:w},{path:"users/edit/:id",component:w,props:!0},{path:"users/list",component:S},{path:"orders/list",component:j},{path:"orders/edit",component:O}]},{path:"/login",component:C}],E=new l["a"]({routes:P}),T=E,A=n("2f62");r["default"].use(A["a"]);var L=new A["a"].Store({state:{token:""},mutations:{assignment:function(e,t){e.token=t}},actions:{},getters:{},module:{}}),$=L,M=n("5c96"),N=n.n(M),B=(n("0fae"),n("4d71"),n("bc3a")),q=n.n(B),I=q.a.create({baseURL:"http://localhost:3000/admin/",timeout:5e3});I.interceptors.request.use((function(e){var t=$.state.token||localStorage.getItem("token")||"";return t&&(e.headers.Authorization="Bearer "+t),e}),(function(e){return Promise.reject(e)})),I.interceptors.response.use((function(e){return console.log(e),e.data.status=e.status,e.data}),(function(e){if(!e.response)return console.log(e);var t=e.response.data.message;return t=t||"server err",r["default"].prototype.$message.error(t),401===e.response.status?T.push("/login"):void 0}));var z=I;r["default"].config.productionTip=!1,r["default"].use(N.a),r["default"].prototype.$http=z,r["default"].mixin({data:function(){return{backend:"/admin/upload"}}}),new r["default"]({router:T,store:$,render:function(e){return e(s)}}).$mount("#app")},"5d3c":function(e,t,n){"use strict";var r=n("60d5"),o=n.n(r);o.a},"60d5":function(e,t,n){}});
//# sourceMappingURL=app.8b45fb1a.js.map