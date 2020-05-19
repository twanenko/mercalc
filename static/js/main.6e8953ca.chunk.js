(this["webpackJsonpmercalc-redux"]=this["webpackJsonpmercalc-redux"]||[]).push([[0],{103:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(9),l=a.n(c),o=(a(91),a(147)),i=a(166),u=a(152),m=a(161),d=a(50),s=a(49),f=a(51),g=a(52),p=a(160),b=a(162),E=a(24),v=a(105),j=a(67),y=a.n(j),h=a(14),O=a(56),x=a.n(O),S=a(69),k=a(33),w=Object(k.b)("prayer/fetchSeed",function(){var e=Object(S.a)(x.a.mark((function e(t){var a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return a=e.sent,e.next=5,a.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),C=Object(k.c)({name:"prayer",initialState:{seeds:null,seedStatus:"\u30b7\u30fc\u30c9\u60c5\u5831\u3092\u8aad\u307f\u8fbc\u307f\u4e2d",timer:"",myGuildName:"",guild:[{name:"yellow",title:"\u5de6\u4e0a(\u9ec4)",prayed:0,modified:""},{name:"red",title:"\u53f3\u4e0a(\u8d64)",prayed:0,modified:""},{name:"gate",title:"\u30b2\u30fc\u30c8(\u9580)",prayed:0,modified:""},{name:"blue",title:"\u5de6\u4e0b(\u9752)",prayed:0,modified:""},{name:"green",title:"\u53f3\u4e0b(\u7dd1)",prayed:0,modified:""}]},reducers:{getTimer:function(e,t){e.timer=t.payload},getMyGuildName:function(e,t){e.myGuildName=t.payload},updatePrayed:function(e,t){var a=t.payload,n=a.name,r=a.seed,c=a.hp,l=a.scale;if(r){var o=e.guild.find((function(e){return e.name===n}));if(o){var i=c/l,u=r.hp,m=Math.round(100*(i/u-1)),d=m>0?m:0;o.prayed=d,o.modified="@".concat(e.timer)}}}},extraReducers:function(e){e.addCase(w.fulfilled,(function(e,t){e.seeds=t.payload})),e.addCase(w.rejected,(function(e,t){e.seedStatus="\u30b7\u30fc\u30c9\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f"}))}}),N=C.actions,G=N.getTimer,B=N.getMyGuildName,M=N.updatePrayed,H=C,I=Object(o.a)((function(e){return Object(i.a)({root:{fontSize:"calc(20px + 2vmin)",backgroundColor:"#717c91",color:"white"}})})),W=function(){var e=I(),t=Object(h.b)(),a=Object(n.useState)(0),c=Object(E.a)(a,2),l=c[0],o=c[1];Object(n.useEffect)((function(){var e=(new Date).getTime(),t=["https://ntp-a1.nict.go.jp/cgi-bin/json","https://ntp-b1.nict.go.jp/cgi-bin/json"][Math.floor(2*Math.random())];fetch("".concat(t,"?").concat(e/1e3)).then((function(e){return e.json()})).then((function(t){o(1e3*t.st+(e-1e3*t.it)/2-e)}))}),[]);var i=Object(n.useState)(""),u=Object(E.a)(i,2),m=u[0],d=u[1];return Object(n.useEffect)((function(){var e=setInterval((function(){return d(y()((new Date).getTime()+l).format("HH\u6642 mm\u5206 ss.SS\u79d2"))}),10);return function(){return clearInterval(e)}}),[l]),Object(n.useEffect)((function(){var e=m.match(/\d{2}\u5206/g),a=e?e[0]:"";t(G(a))}),[m,t]),r.a.createElement(v.a,{className:e.root,elevation:5},r.a.createElement("p",null,"\u73fe\u5728\u6642\u523b(JST): ",m))},L=a(4),R=a(164),T=a(167),D=a(151),z=a(153),A=a(106),Y=function(e){var t=e.title,a=e.name,n=e.color,c=Object(L.a)({root:{color:n.radio,"&$checked":{color:n.checked}},checked:{}})((function(e){return r.a.createElement(R.a,e)}));return r.a.createElement(D.a,{value:a,label:t,control:r.a.createElement(c,null)})},J={radioY:{title:"\u5de6\u4e0a(\u9ec4)",name:"yellow",color:{radio:u.a[400],checked:u.a[600]}},radioR:{title:"\u53f3\u4e0a(\u8d64)",name:"red",color:{radio:d.a[400],checked:d.a[600]}},radioB:{title:"\u5de6\u4e0b(\u9752)",name:"blue",color:{radio:f.a[400],checked:f.a[600]}},radioG:{title:"\u53f3\u4e0b(\u7dd1)",name:"green",color:{radio:g.a[400],checked:g.a[600]}}},P=function(){var e=Object(h.b)();return r.a.createElement("div",null,r.a.createElement(z.a,{component:"fieldset"},r.a.createElement(A.a,{component:"legend",style:{color:"white"}},"\u81ea\u5206\u306e\u30ae\u30eb\u30c9"),r.a.createElement(T.a,{row:!0,"aria-label":"my-guild",name:"my-guild",onChange:function(t){e(B(t.target.value))}},r.a.createElement(Y,J.radioY),r.a.createElement(Y,J.radioR),r.a.createElement(Y,J.radioB),r.a.createElement(Y,J.radioG))))},K=a(154),$=a(168),_=a(150),q=a(155),F=a(72),Q=a.n(F),V=a(156),U=a(70),X=a.n(U),Z=Object(o.a)((function(e){return Object(i.a)({root:{padding:"0 0 1em"},text:{borderColor:"white",color:"white"}})})),ee=function(){var e=Z(),t=Object(h.c)((function(e){return e.prayer.myGuildName})),a=Object(h.c)((function(e){return e.prayer.guild})),c=Object(n.useState)(""),l=Object(E.a)(c,2),o=l[0],i=l[1];Object(n.useEffect)((function(){var e=function(e){var n=a.find((function(t){return t.name===e}));if(!n)return"";if(t===e)return"";var r=n.title,c=n.prayed.toLocaleString(),l=n.modified;return"".concat(r,":").concat(c,"%").concat(l," ")};i("".concat(e("yellow")).concat(e("red")).concat(e("gate")).concat(e("blue")).concat(e("green")))}),[a,t]);var u=Object(n.useState)(!1),m=Object(E.a)(u,2),d=m[0],s=m[1];return r.a.createElement("div",{className:e.root},r.a.createElement(z.a,{variant:"outlined",fullWidth:!0},r.a.createElement(K.a,{htmlFor:"summery",className:e.text},"\u30b3\u30d4\u30da\u7528"),r.a.createElement($.a,{className:e.text,id:"summery",margin:"dense",type:"text",value:o,startAdornment:r.a.createElement(q.a,{position:"start"},r.a.createElement(V.a,{arrow:!0,open:d,onClose:function(){s(!1)},disableHoverListener:!0,placement:"top",title:"copied"},r.a.createElement(X.a,{text:o},r.a.createElement(_.a,{disabled:""===o,onClick:function(){s(!0)}},r.a.createElement(Q.a,{className:e.text})))))})))},te=a(158),ae=a(159),ne=a(163),re=a(169),ce=a(157),le=a(165),oe=[{value:"1",label:"1\u4f53\u76ee"},{value:"1.2",label:"2\u4f53\u76ee"},{value:"1.4",label:"3\u4f53\u76ee"},{value:"1.6",label:"4\u4f53\u76ee"},{value:"1.8",label:"5\u4f53\u76ee"}],ie=function(e){var t=e.name,a=e.guildStyle,c=Object(o.a)((function(e){return Object(i.a)({card:{backgroundColor:a.backgroundColor,color:a.color,padding:e.spacing(2)}})}))(),l=Object(h.c)((function(e){return e.prayer.seeds})),u=Object(h.c)((function(e){return e.prayer.guild.find((function(e){return e.name===t}))})),m=Object(h.b)(),d=Object(ce.a)({stringify:function(e){var t=e.name.replace(/[\u30a1-\u30f6]/g,(function(e){var t=e.charCodeAt(0)-96;return String.fromCharCode(t)}));return"".concat(e.name,"_").concat(t)}}),s=Object(n.useState)(null),f=Object(E.a)(s,2),g=f[0],b=f[1],v=Object(n.useState)(0),j=Object(E.a)(v,2),y=j[0],O=j[1],x=Object(n.useState)(1),S=Object(E.a)(x,2),k=S[0],w=S[1];return Object(n.useEffect)((function(){m(M({name:t,seed:g,hp:y,scale:k}))}),[m,y,t,k,g]),r.a.createElement(te.a,{className:c.card},r.a.createElement(ae.a,null,null===u||void 0===u?void 0:u.title,": ",null===u||void 0===u?void 0:u.prayed.toLocaleString(),"%",null===u||void 0===u?void 0:u.modified,l?r.a.createElement(le.a,{options:l,getOptionLabel:function(e){return e.name},getOptionSelected:function(e,t){return e.name===t.name},filterOptions:d,autoSelect:!0,onChange:function(e,t){b(t)},renderInput:function(e){return r.a.createElement(ne.a,Object.assign({},e,{label:"\u30b7\u30fc\u30c9\u540d",variant:"outlined",margin:"dense"}))}}):r.a.createElement("div",null,r.a.createElement("p",null,"\u30b7\u30fc\u30c9\u60c5\u5831\u3092\u8aad\u307f\u8fbc\u307f\u4e2d")),r.a.createElement(p.a,{container:!0,spacing:2},r.a.createElement(p.a,{item:!0,xs:!0},r.a.createElement(ne.a,{label:"\u30b7\u30fc\u30c9\u4f53\u529b",onChange:function(e){O(+e.target.value)},fullWidth:!0,variant:"outlined",margin:"dense"})),r.a.createElement(p.a,{item:!0,xs:4},r.a.createElement(ne.a,{select:!0,variant:"outlined",margin:"dense",fullWidth:!0,label:"Wave",value:k.toLocaleString(),onChange:function(e){w(+e.target.value)}},oe.map((function(e){return r.a.createElement(re.a,{key:e.value,value:e.value},e.label)})))))))},ue=a(20),me=Object(ue.c)({prayer:H.reducer}),de=Object(k.a)({reducer:me}),se=de,fe=Object(o.a)((function(e){return Object(i.a)({app:{backgroundColor:"#282c34",color:"white"},appHeader:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:"calc(10px + 2vmin)"},appMain:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",fontSize:"calc(10px + 2vmin)"},container:{flexGrow:1}})})),ge={guildY:{name:"yellow",guildStyle:{backgroundColor:u.a[100],color:m.a[600]}},guildR:{name:"red",guildStyle:{backgroundColor:d.a[100],color:d.a[900]}},gate:{name:"gate",guildStyle:{backgroundColor:s.a[200],color:s.a[900]}},guildB:{name:"blue",guildStyle:{backgroundColor:f.a[100],color:f.a[900]}},guildG:{name:"green",guildStyle:{backgroundColor:g.a[100],color:g.a[900]}}},pe=function(){var e=fe(),t=Object(h.b)();return Object(n.useEffect)((function(){t(w("https://script.google.com/macros/s/AKfycbyt5WB_eEoamADwxePfKQxk3umq5khBbCeaIdRnLOTCeVHzkj0/exec"))}),[t]),r.a.createElement("div",{className:e.app},r.a.createElement("div",{className:e.appHeader},r.a.createElement("p",null,"\u30e1\u30eb\u30b9\u30c8\u304a\u7948\u308a\u8a08\u7b97\u6a5f")),r.a.createElement("main",{className:e.appMain},r.a.createElement(b.a,{className:e.container},r.a.createElement(W,null),r.a.createElement(P,null),r.a.createElement(ee,null),r.a.createElement(p.a,{container:!0,spacing:3},r.a.createElement(p.a,{item:!0,xs:12,sm:5},r.a.createElement(ie,ge.guildY)),r.a.createElement(p.a,{item:!0,xs:!1,sm:2}),r.a.createElement(p.a,{item:!0,xs:12,sm:5},r.a.createElement(ie,ge.guildR))),r.a.createElement(p.a,{container:!0,spacing:3},r.a.createElement(p.a,{item:!0,xs:!1,sm:3}),r.a.createElement(p.a,{item:!0,xs:12,sm:6},r.a.createElement(ie,ge.gate)),r.a.createElement(p.a,{item:!0,xs:!1,sm:3})),r.a.createElement(p.a,{container:!0,spacing:3},r.a.createElement(p.a,{item:!0,xs:12,sm:5},r.a.createElement(ie,ge.guildB)),r.a.createElement(p.a,{item:!0,xs:!1,sm:2}),r.a.createElement(p.a,{item:!0,xs:12,sm:5},r.a.createElement(ie,ge.guildG)))),r.a.createElement("span",null,"tw: @twanenko")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h.a,{store:se},r.a.createElement(pe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,a){e.exports=a(103)},91:function(e,t,a){}},[[86,1,2]]]);
//# sourceMappingURL=main.6e8953ca.chunk.js.map