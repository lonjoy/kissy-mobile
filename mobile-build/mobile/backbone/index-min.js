(function(){var l=this,A=l.Backbone,m=[],B=m.push,s=m.slice,C=m.splice,g;g="undefined"!==typeof exports?exports:l.Backbone={};g.VERSION="1.0.0";var e=l._;!e&&"undefined"!==typeof require&&(e=require("underscore"));g.$=l.jQuery||l.Zepto||l.ender||l.$;g.noConflict=function(){l.Backbone=A;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var h=g.Events={on:function(a,b,c){if(!p(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});(this._events[a]||(this._events[a]=[])).push({callback:b,context:c,
ctx:c||this});return this},once:function(a,b,c){if(!p(this,"once",a,[b,c])||!b)return this;var d=this,f=e.once(function(){d.off(a,f);b.apply(this,arguments)});f._callback=b;return this.on(a,f,c)},off:function(a,b,c){var d,f,t,g,j,u,k,h;if(!this._events||!p(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events={},this;g=a?[a]:e.keys(this._events);j=0;for(u=g.length;j<u;j++)if(a=g[j],t=this._events[a]){this._events[a]=d=[];if(b||c){k=0;for(h=t.length;k<h;k++)f=t[k],(b&&b!==f.callback&&b!==
f.callback._callback||c&&c!==f.context)&&d.push(f)}d.length||delete this._events[a]}return this},trigger:function(a){if(!this._events)return this;var b=s.call(arguments,1);if(!p(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;c&&v(c,b);d&&v(d,arguments);return this},stopListening:function(a,b,c){var d=this._listeners;if(!d)return this;var f=!b&&!c;"object"===typeof b&&(c=this);a&&((d={})[a._listenerId]=a);for(var e in d)d[e].off(b,c,this),f&&delete this._listeners[e];return this}},
w=/\s+/,p=function(a,b,c,d){if(!c)return!0;if("object"===typeof c){for(var f in c)a[b].apply(a,[f,c[f]].concat(d));return!1}if(w.test(c)){c=c.split(w);f=0;for(var e=c.length;f<e;f++)a[b].apply(a,[c[f]].concat(d));return!1}return!0},v=function(a,b){var c,d=-1,f=a.length,e=b[0],g=b[1],j=b[2];switch(b.length){case 0:for(;++d<f;)(c=a[d]).callback.call(c.ctx);break;case 1:for(;++d<f;)(c=a[d]).callback.call(c.ctx,e);break;case 2:for(;++d<f;)(c=a[d]).callback.call(c.ctx,e,g);break;case 3:for(;++d<f;)(c=
a[d]).callback.call(c.ctx,e,g,j);break;default:for(;++d<f;)(c=a[d]).callback.apply(c.ctx,b)}};e.each({listenTo:"on",listenToOnce:"once"},function(a,b){h[b]=function(b,d,f){var g=this._listeners||(this._listeners={}),o=b._listenerId||(b._listenerId=e.uniqueId("l"));g[o]=b;"object"===typeof d&&(f=this);b[a](d,f,this);return this}});h.bind=h.on;h.unbind=h.off;e.extend(g,h);var n=g.Model=function(a,b){var c,d=a||{};b||(b={});this.cid=e.uniqueId("c");this.attributes={};e.extend(this,e.pick(b,D));b.parse&&
(d=this.parse(d,b)||{});if(c=e.result(this,"defaults"))d=e.defaults({},d,c);this.set(d,b);this.changed={};this.initialize.apply(this,arguments)},D=["url","urlRoot","collection"];e.extend(n.prototype,h,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return e.clone(this.attributes)},sync:function(){return g.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return e.escape(this.get(a))},has:function(a){return null!=
this.get(a)},set:function(a,b,c){var d,f,g,o,j,h,k;if(null==a)return this;"object"===typeof a?(f=a,c=b):(f={})[a]=b;c||(c={});if(!this._validate(f,c))return!1;g=c.unset;o=c.silent;a=[];j=this._changing;this._changing=!0;j||(this._previousAttributes=e.clone(this.attributes),this.changed={});k=this.attributes;h=this._previousAttributes;this.idAttribute in f&&(this.id=f[this.idAttribute]);for(d in f)b=f[d],e.isEqual(k[d],b)||a.push(d),e.isEqual(h[d],b)?delete this.changed[d]:this.changed[d]=b,g?delete k[d]:
k[d]=b;if(!o){a.length&&(this._pending=!0);b=0;for(d=a.length;b<d;b++)this.trigger("change:"+a[b],this,k[a[b]],c)}if(j)return this;if(!o)for(;this._pending;)this._pending=!1,this.trigger("change",this,c);this._changing=this._pending=!1;return this},unset:function(a,b){return this.set(a,void 0,e.extend({},b,{unset:!0}))},clear:function(a){var b={},c;for(c in this.attributes)b[c]=void 0;return this.set(b,e.extend({},a,{unset:!0}))},hasChanged:function(a){return null==a?!e.isEmpty(this.changed):e.has(this.changed,
a)},changedAttributes:function(a){if(!a)return this.hasChanged()?e.clone(this.changed):!1;var b,c=!1,d=this._changing?this._previousAttributes:this.attributes,f;for(f in a)if(!e.isEqual(d[f],b=a[f]))(c||(c={}))[f]=b;return c},previous:function(a){return null==a||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return e.clone(this._previousAttributes)},fetch:function(a){a=a?e.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d){if(!b.set(b.parse(d,
a),a))return false;c&&c(b,d,a);b.trigger("sync",b,d,a)};q(this,a);return this.sync("read",this,a)},save:function(a,b,c){var d,f=this.attributes;null==a||"object"===typeof a?(d=a,c=b):(d={})[a]=b;if(d&&(!c||!c.wait)&&!this.set(d,c))return!1;c=e.extend({validate:!0},c);if(!this._validate(d,c))return!1;d&&c.wait&&(this.attributes=e.extend({},f,d));void 0===c.parse&&(c.parse=!0);var g=this,h=c.success;c.success=function(a){g.attributes=f;var b=g.parse(a,c);c.wait&&(b=e.extend(d||{},b));if(e.isObject(b)&&
!g.set(b,c))return false;h&&h(g,a,c);g.trigger("sync",g,a,c)};q(this,c);a=this.isNew()?"create":c.patch?"patch":"update";"patch"===a&&(c.attrs=d);a=this.sync(a,this,c);d&&c.wait&&(this.attributes=f);return a},destroy:function(a){var a=a?e.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};a.success=function(e){(a.wait||b.isNew())&&d();c&&c(b,e,a);b.isNew()||b.trigger("sync",b,e,a)};if(this.isNew())return a.success(),!1;q(this,a);var f=this.sync("delete",this,a);a.wait||
d();return f},url:function(){var a=e.result(this,"urlRoot")||e.result(this.collection,"url")||x();return this.isNew()?a:a+("/"===a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},isValid:function(a){return this._validate({},e.extend(a||{},{validate:!0}))},_validate:function(a,b){if(!b.validate||!this.validate)return!0;var a=e.extend({},this.attributes,a),c=this.validationError=
this.validate(a,b)||null;if(!c)return!0;this.trigger("invalid",this,c,e.extend(b||{},{validationError:c}));return!1}});e.each("keys,values,pairs,invert,pick,omit".split(","),function(a){n.prototype[a]=function(){var b=s.call(arguments);b.unshift(this.attributes);return e[a].apply(e,b)}});var r=g.Collection=function(a,b){b||(b={});b.url&&(this.url=b.url);b.model&&(this.model=b.model);void 0!==b.comparator&&(this.comparator=b.comparator);this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,
e.extend({silent:!0},b))},E={add:!0,remove:!0,merge:!0},F={add:!0,merge:!1,remove:!1};e.extend(r.prototype,h,{model:n,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return g.sync.apply(this,arguments)},add:function(a,b){return this.set(a,e.defaults(b||{},F))},remove:function(a,b){a=e.isArray(a)?a.slice():[a];b||(b={});var c,d,f,g;c=0;for(d=a.length;c<d;c++)if(g=this.get(a[c]))delete this._byId[g.id],delete this._byId[g.cid],f=this.indexOf(g),
this.models.splice(f,1),this.length--,b.silent||(b.index=f,g.trigger("remove",g,this,b)),this._removeReference(g);return this},set:function(a,b){b=e.defaults(b||{},E);b.parse&&(a=this.parse(a,b));e.isArray(a)||(a=a?[a]:[]);var c,d,f,g,h,j=b.at,l=this.comparator&&null==j&&!1!==b.sort,k=e.isString(this.comparator)?this.comparator:null,i=[],m=[],n={};c=0;for(d=a.length;c<d;c++)if(f=this._prepareModel(a[c],b))(g=this.get(f))?(b.remove&&(n[g.cid]=!0),b.merge&&(g.set(f.attributes,b),l&&!h&&g.hasChanged(k)&&
(h=!0))):b.add&&(i.push(f),f.on("all",this._onModelEvent,this),this._byId[f.cid]=f,null!=f.id&&(this._byId[f.id]=f));if(b.remove){c=0;for(d=this.length;c<d;++c)n[(f=this.models[c]).cid]||m.push(f);m.length&&this.remove(m,b)}i.length&&(l&&(h=!0),this.length+=i.length,null!=j?C.apply(this.models,[j,0].concat(i)):B.apply(this.models,i));h&&this.sort({silent:!0});if(b.silent)return this;c=0;for(d=i.length;c<d;c++)(f=i[c]).trigger("add",f,this,b);h&&this.trigger("sort",this,b);return this},reset:function(a,
b){b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);b.previousModels=this.models;this._reset();this.add(a,e.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,e.extend({at:this.length},b));return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,e.extend({at:0},b));return a},shift:function(a){var b=
this.at(0);this.remove(b,a);return b},slice:function(a,b){return this.models.slice(a,b)},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a.cid||a]},at:function(a){return this.models[a]},where:function(a,b){return e.isEmpty(a)?b?void 0:[]:this[b?"find":"filter"](function(b){for(var d in a)if(a[d]!==b.get(d))return!1;return!0})},findWhere:function(a){return this.where(a,!0)},sort:function(a){if(!this.comparator)throw Error("Cannot sort a set without a comparator");a||(a={});e.isString(this.comparator)||
1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(e.bind(this.comparator,this));a.silent||this.trigger("sort",this,a);return this},sortedIndex:function(a,b,c){b||(b=this.comparator);var d=e.isFunction(b)?b:function(a){return a.get(b)};return e.sortedIndex(this.models,a,d,c)},pluck:function(a){return e.invoke(this.models,"get",a)},fetch:function(a){a=a?e.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=a.success,c=this;a.success=function(d){c[a.reset?"reset":
"set"](d,a);b&&b(c,d,a);c.trigger("sync",c,d,a)};q(this,a);return this.sync("read",this,a)},create:function(a,b){b=b?e.clone(b):{};if(!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var c=this,d=b.success;b.success=function(e){b.wait&&c.add(a,b);d&&d(a,e,b)};a.save(null,b);return a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(a,b){if(a instanceof n)return a.collection||
(a.collection=this),a;b||(b={});b.collection=this;var c=new this.model(a,b);return!c._validate(a,b)?(this.trigger("invalid",this,a,b),!1):c},_removeReference:function(a){this===a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"===a||"remove"===a)&&c!==this||("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});
e.each("forEach,each,map,collect,reduce,foldl,inject,reduceRight,foldr,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,toArray,size,first,head,take,initial,rest,tail,drop,last,without,indexOf,shuffle,lastIndexOf,isEmpty,chain".split(","),function(a){r.prototype[a]=function(){var b=s.call(arguments);b.unshift(this.models);return e[a].apply(e,b)}});e.each(["groupBy","countBy","sortBy"],function(a){r.prototype[a]=function(b,c){var d=e.isFunction(b)?b:function(a){return a.get(b)};
return e[a](this.models,d,c)}});var m=g.View=function(a){this.cid=e.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},G=/^(\S+)\s*(.*)$/,H="model,collection,el,id,attributes,className,tagName,events".split(",");e.extend(m.prototype,h,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(a,
b){this.$el&&this.undelegateEvents();this.$el=a instanceof g.$?a:g.$(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(!a&&!(a=e.result(this,"events")))return this;this.undelegateEvents();for(var b in a){var c=a[b];e.isFunction(c)||(c=this[a[b]]);if(c){var d=b.match(G),f=d[1],d=d[2],c=e.bind(c,this),f=f+(".delegateEvents"+this.cid);if(""===d)this.$el.on(f,c);else this.$el.on(f,d,c)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+
this.cid);return this},_configure:function(a){this.options&&(a=e.extend({},e.result(this,"options"),a));e.extend(this,e.pick(a,H));this.options=a},_ensureElement:function(){if(this.el)this.setElement(e.result(this,"el"),!1);else{var a=e.extend({},e.result(this,"attributes"));this.id&&(a.id=e.result(this,"id"));this.className&&(a["class"]=e.result(this,"className"));this.setElement(g.$("<"+e.result(this,"tagName")+">").attr(a),!1)}}});g.sync=function(a,b,c){var d=I[a];e.defaults(c||(c={}),{emulateHTTP:g.emulateHTTP,
emulateJSON:g.emulateJSON});var f={type:d,dataType:"json"};c.url||(f.url=e.result(b,"url")||x());if(null==c.data&&b&&("create"===a||"update"===a||"patch"===a))f.contentType="application/json",f.data=JSON.stringify(c.attrs||b.toJSON(c));c.emulateJSON&&(f.contentType="application/x-www-form-urlencoded",f.data=f.data?{model:f.data}:{});if(c.emulateHTTP&&("PUT"===d||"DELETE"===d||"PATCH"===d)){f.type="POST";c.emulateJSON&&(f.data._method=d);var h=c.beforeSend;c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",
d);if(h)return h.apply(this,arguments)}}"GET"!==f.type&&!c.emulateJSON&&(f.processData=!1);if("PATCH"===f.type&&window.ActiveXObject&&(!window.external||!window.external.msActiveXFilteringEnabled))f.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")};a=c.xhr=g.ajax(e.extend(f,c));b.trigger("request",b,a,c);return a};var I={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};g.ajax=function(){return g.$.ajax.apply(g.$,arguments)};var y=g.Router=function(a){a||(a={});a.routes&&
(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},J=/\((.*?)\)/g,K=/(\(\?)?:\w+/g,L=/\*\w+/g,M=/[\-{}\[\]+?.,\\\^$|#\s]/g;e.extend(y.prototype,h,{initialize:function(){},route:function(a,b,c){e.isRegExp(a)||(a=this._routeToRegExp(a));e.isFunction(b)&&(c=b,b="");c||(c=this[b]);var d=this;g.history.route(a,function(e){e=d._extractParameters(a,e);c&&c.apply(d,e);d.trigger.apply(d,["route:"+b].concat(e));d.trigger("route",b,e);g.history.trigger("route",d,b,e)});return this},
navigate:function(a,b){g.history.navigate(a,b);return this},_bindRoutes:function(){if(this.routes){this.routes=e.result(this,"routes");for(var a,b=e.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])}},_routeToRegExp:function(a){a=a.replace(M,"\\$&").replace(J,"(?:$1)?").replace(K,function(a,c){return c?a:"([^/]+)"}).replace(L,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){var c=a.exec(b).slice(1);return e.map(c,function(a){return a?decodeURIComponent(a):null})}});
var i=g.History=function(){this.handlers=[];e.bindAll(this,"checkUrl");"undefined"!==typeof window&&(this.location=window.location,this.history=window.history)},z=/^[#\/]|\s+$/g,N=/^\/+|\/+$/g,O=/msie [\w.]+/,P=/\/$/;i.started=!1;e.extend(i.prototype,h,{interval:50,getHash:function(a){return(a=(a||this).location.href.match(/#(.*)$/))?a[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){var a=this.location.pathname,c=this.root.replace(P,"");a.indexOf(c)||
(a=a.substr(c.length))}else a=this.getHash();return a.replace(z,"")},start:function(a){if(i.started)throw Error("Backbone.history has already been started");i.started=!0;this.options=e.extend({},{root:"/"},this.options,a);this.root=this.options.root;this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||!this.history||!this.history.pushState);var a=this.getFragment(),b=document.documentMode,b=O.exec(navigator.userAgent.toLowerCase())&&
(!b||7>=b);this.root=("/"+this.root+"/").replace(N,"/");b&&this._wantsHashChange&&(this.iframe=g.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a));if(this._hasPushState)g.$(window).on("popstate",this.checkUrl);else if(this._wantsHashChange&&"onhashchange"in window&&!b)g.$(window).on("hashchange",this.checkUrl);else this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval));this.fragment=a;a=this.location;b=a.pathname.replace(/[^\/]$/,
"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&(this.fragment=this.getHash().replace(z,""),this.history.replaceState({},document.title,this.root+this.fragment+a.search));if(!this.options.silent)return this.loadUrl()},stop:function(){g.$(window).off("popstate",this.checkUrl).off("hashchange",
this.checkUrl);clearInterval(this._checkUrlInterval);i.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a===this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return e.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),
!0})},navigate:function(a,b){if(!i.started)return!1;if(!b||!0===b)b={trigger:b};a=this.getFragment(a||"");if(this.fragment!==a){this.fragment=a;var c=this.root+a;if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else if(this._wantsHashChange)this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace));else return this.location.assign(c);
b.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){c?(c=a.href.replace(/(javascript:|#).*$/,""),a.replace(c+"#"+b)):a.hash="#"+b}});g.history=new i;n.extend=r.extend=y.extend=m.extend=i.extend=function(a,b){var c=this,d;d=a&&e.has(a,"constructor")?a.constructor:function(){return c.apply(this,arguments)};e.extend(d,c,b);var f=function(){this.constructor=d};f.prototype=c.prototype;d.prototype=new f;a&&e.extend(d.prototype,a);d.__super__=c.prototype;return d};var x=function(){throw Error('A "url" property or function must be specified');
},q=function(a,b){var c=b.error;b.error=function(d){c&&c(a,d,b);a.trigger("error",a,d,b)}}}).call(this);KISSY.add("mobile/backbone/",function(){return Backbone});
