(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),o=(t(20),t(4)),l=t(2),i=function(e){var n=e.person,t=e.deleteHandler;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:t},"delete"))},m=function(e){var n=e.persons,t=e.deleteHandler;return r.a.createElement("ul",null,n.map((function(e){return r.a.createElement(i,{key:e.id,person:e,deleteHandler:function(){return t(e.id)}})})))},d=function(e){return r.a.createElement("form",{onSubmit:e.submitHandler},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.nameValue,onChange:e.nameHandler})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.numberValue,onChange:e.numberHandler})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=function(e){var n=e.searchQuery,t=e.searchQueryHandler;return r.a.createElement("div",null,"Filter by name: ",r.a.createElement("input",{value:n,onChange:t}))},s=(t(21),function(e){var n=e.message;return null===n.text?null:r.a.createElement("div",{className:"message ".concat(n.type)},n.text)}),h=t(3),b=t.n(h),p="/api/persons",v=function(){return b.a.get(p).then((function(e){return e.data}))},E=function(e){return b.a.post(p,e).then((function(e){return e.data}))},y=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},g=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),h=i[0],b=i[1],p=Object(a.useState)(""),g=Object(l.a)(p,2),j=g[0],O=g[1],H=Object(a.useState)(""),k=Object(l.a)(H,2),x=k[0],S=k[1],C=Object(a.useState)({text:null,type:""}),Q=Object(l.a)(C,2),T=Q[0],V=Q[1],D=t.filter((function(e){return e.name.toLowerCase().includes(x.toLowerCase())}));Object(a.useEffect)((function(){v().then((function(e){return u(e)}))}),[]);var A=function(e,n){var a=t.find((function(n){return n.id===e}));if(window.confirm("".concat(a.name," is already added to the phonebook,")+"replace the old number with a new one?")){var r=Object(o.a)(Object(o.a)({},a),{},{number:n});y(e,r).then((function(n){u(t.map((function(t){return t.id!==e?t:n}))),V({text:"Updated number of ".concat(n.name," to '").concat(n.number,"'"),type:""}),setTimeout((function(){return I()}),3e3)})).catch((function(e){return B(e,a)})),b(""),O("")}},B=function(e,n){V({text:"Information of ".concat(n.name," was already deleted from the server."),type:"error"}),setTimeout((function(){return I()}),5e3),u(t.filter((function(e){return e.id!==n.id})))},I=function(){return V({text:null,type:""})};return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(s,{message:T}),r.a.createElement("div",null,r.a.createElement("h2",null,"Search"),r.a.createElement(f,{searchQuery:x,searchQueryHandler:function(e){S(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("h2",null,"Add Contact"),r.a.createElement(d,{nameValue:h,numberValue:j,nameHandler:function(e){b(e.target.value)},numberHandler:function(e){O(e.target.value)},submitHandler:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));n?A(n.id,j):(E({name:h,number:j}).then((function(e){u(t.concat(e)),V({text:"Added ".concat(e.name),type:""}),setTimeout((function(){return I()}),3e3)})),b(""),O(""))}})),r.a.createElement("div",null,r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:D,deleteHandler:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&w(e).then((function(){u(t.filter((function(n){return n.id!==e}))),V({text:"Deleted ".concat(n.name),type:""}),setTimeout((function(){return I()}),3e3)})).catch((function(e){return B(e,n)}))}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.95925086.chunk.js.map