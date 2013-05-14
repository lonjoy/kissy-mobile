(function(d,b){"function"===typeof define&&define.amd?define(["underscore","backbone"],function(c,a){return b(c||d._,a||d.Backbone)}):b(_,Backbone)})(this,function(d,b){function c(){return(65536*(1+Math.random())|0).toString(16).substring(1)}b.LocalStorage=window.Store=function(a){this.name=a;this.records=(a=this.localStorage().getItem(this.name))&&a.split(",")||[]};d.extend(b.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(a){a.id||
(a.id=c()+c()+"-"+c()+"-"+c()+"-"+c()+"-"+c()+c()+c(),a.set(a.idAttribute,a.id));this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a));this.records.push(a.id.toString());this.save();return this.find(a)},update:function(a){this.localStorage().setItem(this.name+"-"+a.id,JSON.stringify(a));d.include(this.records,a.id.toString())||this.records.push(a.id.toString());this.save();return this.find(a)},find:function(a){return this.jsonData(this.localStorage().getItem(this.name+"-"+a.id))},findAll:function(){return d(this.records).chain().map(function(a){return this.jsonData(this.localStorage().getItem(this.name+
"-"+a))},this).compact().value()},destroy:function(a){if(a.isNew())return!1;this.localStorage().removeItem(this.name+"-"+a.id);this.records=d.reject(this.records,function(b){return b===a.id.toString()});this.save();return a},localStorage:function(){return localStorage},jsonData:function(a){return a&&JSON.parse(a)}});b.LocalStorage.sync=window.Store.sync=b.localSync=function(a,b,e){var c=b.localStorage||b.collection.localStorage,f,d,g=$.Deferred&&$.Deferred();try{switch(a){case "read":f=void 0!=b.id?
c.find(b):c.findAll();break;case "create":f=c.create(b);break;case "update":f=c.update(b);break;case "delete":f=c.destroy(b)}}catch(h){d=h.code===DOMException.QUOTA_EXCEEDED_ERR&&0===window.localStorage.length?"Private browsing is unsupported":h.message}f?(b.trigger("sync",b,f,e),e&&e.success&&e.success(f),g&&g.resolve(f)):(d=d?d:"Record Not Found",e&&e.error&&e.error(d),g&&g.reject(d));e&&e.complete&&e.complete(f);return g&&g.promise()};b.ajaxSync=b.sync;b.getSyncMethod=function(a){return a.localStorage||
a.collection&&a.collection.localStorage?b.localSync:b.ajaxSync};b.sync=function(a,c,d){return b.getSyncMethod(c).apply(this,[a,c,d])};return b.LocalStorage});KISSY.add("mobile/backbone-localstorage/",function(){return Backbone.LocalStorage});
