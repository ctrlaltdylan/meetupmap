(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{163:function(e,t,n){e.exports=n(398)},168:function(e,t,n){},170:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},171:function(e,t,n){},200:function(e,t){},202:function(e,t){},234:function(e,t){},235:function(e,t){},302:function(e,t){},398:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),l=n(52),i=n.n(l),c=(n(168),n(63)),r=n(64),s=n(66),u=n(65),m=n(67),p=n(53),v=(n(170),n(171),n(68)),d=Object(v.GoogleApiWrapper)({apiKey:"AIzaSyCrpqRuiRv4Oug4YJn1651fMG_5LJBH8dU"})(function(e){return o.a.createElement(v.Map,{google:e.google,zoom:10,onClick:e.onMapClick,initialCenter:{lat:47.620422,lng:-122.349358}},e.events.length>0?e.events.filter(function(e){return e.venue}).map(function(t){return o.a.createElement(v.Marker,{key:t.id,position:{lat:t.venue.lat,lng:t.venue.lon},onClick:function(n){e.onMarkerClick(t.id)}})}):"")}),f=n(162),h=n.n(f),g=n(37),E=n.n(g),k=n(69),y=n.n(k),C=(o.a.Component,{width:"100%",height:"100%"}),M=function(e){return o.a.createElement("a",{key:e.id,href:e.link,target:"_self"},o.a.createElement("div",{className:"event"},o.a.createElement("h3",{className:"event-title"},e.name),o.a.createElement("p",{className:"event-group"},"hosted by ",e.group.name),o.a.createElement("p",null,o.a.createElement("span",null,e.local_date," at ",e.local_time)),e.venue?o.a.createElement("p",null,"hosted at ",e.venue.name):""))},w=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).retrieveMeetups=function(e){var t={url:"https://meetupmap.herokuapp.com/meetups"};e&&e.lat&&e.lng&&(t.url=t.url+"?"+E.a.stringify({lat:e.lat,lon:e.lng})),h()(t,function(e,t,n){console.log("error:",e),console.log("statusCode:",t&&t.statusCode),console.log("body:",n),n=JSON.parse(n),this.setState({events:n.events,city:n.city,loading:!1,address:""})}.bind(Object(p.a)(Object(p.a)(n))))},n.onLocationSelect=function(e){var t=e.lat,a=e.lng;n.setState({lat:t,lng:a},function(){n.retrieveMeetups(n.state)})},n.onMarkerClick=function(e){var t=n.state.events.filter(function(t){return t.id==e})[0];n.setState({selectedEvent:t})},n.onMapClick=function(){n.setState({selectedEvent:!1})},n.state={loading:!0,city:{},events:[],selectedEvent:!1},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.retrieveMeetups()}},{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("aside",null,o.a.createElement("section",{className:"heading"},o.a.createElement("h2",null,"Seattle Tech Meetups"),o.a.createElement("span",null,"finally in map view!")),o.a.createElement("section",{class:"events-container"},this.state.events.length>0?this.state.selectedEvent?o.a.createElement(M,this.state.selectedEvent):this.state.events.map(function(e){return o.a.createElement(M,e)}):"")),o.a.createElement("section",null,o.a.createElement(d,{style:C,events:this.state.events,city:this.state.city,onMarkerClick:this.onMarkerClick,onMapClick:this.onMapClick})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[163,2,1]]]);
//# sourceMappingURL=main.d9a6eefc.chunk.js.map