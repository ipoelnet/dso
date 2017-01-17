var dsolang={ERR_0:'Tidak ada koneksi.\n Periksa Jaringan.',ERR_404:'Halaman yang di minta tidak ditemukan. [404]',ERR_500:'Internal Server Error [500].',ERR_PARSE:'Gagal melakukan parse JSON.',ERR_TIMEOUT:'Time out error.',ERR_ABORT:'Permintaan Ajax dibatalkan.',ERR_UNCAUGHT:'Error tidak diketahui.\n',DSO_SAVED:'Data berhasil di proses',ERR_VALIDATE:'Yang bertanda merah harus di-isi',CTN_EMPTY:'Tidak ada data'
};var dsoId={dts_id:'dtsTable',dts_frm:'dtsFrm',dst_frm_A:'dtsFrmA',dst_frm_B:'dtsFrmB',dst_frm_C:'dtsFrmC',dst_frm_D:'dtsFrmD',dst_frm_E:'dtsFrmE',modal:'#popupadm',modalA:'#popupadma',modalB:'#popupadmb',modalC:'#popupadmc'
};var dsoReady=(function(){var readyList,DOMContentLoaded,class2type={};class2type["[object Boolean]"]="boolean";class2type["[object Number]"]="number";class2type["[object String]"]="string";class2type["[object Function]"]="function";class2type["[object Array]"]="array";class2type["[object Date]"]="date";class2type["[object RegExp]"]="regexp";class2type["[object Object]"]="object";var ReadyObj={isReady:false,readyWait:1,holdReady:function(hold){if(hold){ReadyObj.readyWait++;}
else{ReadyObj.ready(true);}},ready:function(wait){if((wait===true&&!--ReadyObj.readyWait)||(wait!==true&&!ReadyObj.isReady)){if(!document.body){return setTimeout(ReadyObj.ready,1);}
ReadyObj.isReady=true;if(wait!==true&&--ReadyObj.readyWait>0){return;}
readyList.resolveWith(document,[ReadyObj]);}},bindReady:function(){if(readyList){return;}
readyList=ReadyObj._Deferred();if(document.readyState==="complete"){return setTimeout(ReadyObj.ready,1);}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",ReadyObj.ready,false);}
else if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",ReadyObj.ready);var toplevel=false;try{toplevel=window.frameElement==null;}
catch(e){}
if(document.documentElement.doScroll&&toplevel){doScrollCheck();}}},_Deferred:function(){var callbacks=[],fired,firing,cancelled,deferred={done:function(){if(!cancelled){var args=arguments,i,length,elem,type,_fired;if(fired){_fired=fired;fired=0;}
for(i=0,length=args.length;i<length;i++){elem=args[i];type=ReadyObj.type(elem);if(type==="array"){deferred.done.apply(deferred,elem);}
else if(type==="function"){callbacks.push(elem);}}
if(_fired){deferred.resolveWith(_fired[0],_fired[1]);}}
return this;},resolveWith:function(context,args){if(!cancelled&&!fired&&!firing){args=args||[];firing=1;try{while(callbacks[0]){callbacks.shift().apply(context,args);}}
finally{fired=[context,args];firing=0;}}
return this;},resolve:function(){deferred.resolveWith(this,arguments);return this;},isResolved:function(){return!!(firing||fired);},cancel:function(){cancelled=1;callbacks=[];return this;}};return deferred;},type:function(obj){return obj==null? 
 String(obj):class2type[Object.prototype.toString.call(obj)]||"object";}};function doScrollCheck(){if(ReadyObj.isReady){return;}
try{document.documentElement.doScroll("left");}
catch(e){setTimeout(doScrollCheck,1);return;}
ReadyObj.ready();};if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);ReadyObj.ready();};}
else if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);ReadyObj.ready();}};}
function ready(fn){ReadyObj.bindReady();var type=ReadyObj.type(fn);readyList.done(fn);};return ready;})();(function(funcName,baseObj){"use strict";funcName=funcName||"docReady";baseObj=baseObj||window;var readyList=[];var readyFired=!1;var readyEventHandlersInstalled=!1;function ready(){if(!readyFired){readyFired=!0;for(var i=0;i<readyList.length;i++){readyList[i].fn.call(window,readyList[i].ctx)}
readyList=[]}};function readyStateChange(){if(document.readyState==="complete"){ready()}};baseObj[funcName]=function(callback,context){if(readyFired){setTimeout(function(){callback(context)},1);return}
else{readyList.push({fn:callback,ctx:context})}
if(document.readyState==="complete"||(!document.attachEvent&&document.readyState==="interactive")){setTimeout(ready,1)}
else if(!readyEventHandlersInstalled){if(document.addEventListener){document.addEventListener("DOMContentLoaded",ready,!1);window.addEventListener("load",ready,!1)}
else{document.attachEvent("onreadystatechange",readyStateChange);window.attachEvent("onload",ready)}
readyEventHandlersInstalled=!0}};})("docReady",window);dsoScript=(function(doc){var env,head,pending={},pollCount=0,queue={css:[],js:[]},styleSheets=doc.styleSheets;function createNode(name,attrs){var node=doc.createElement(name),attr;for(attr in attrs){if(attrs.hasOwnProperty(attr)){node.setAttribute(attr,attrs[attr]);}}
return node;};function finish(type){var p=pending[type],callback,urls;if(p){callback=p.callback;urls=p.urls;urls.shift();pollCount=0;if(!urls.length){callback&&callback.call(p.context,p.obj);pending[type]=null;queue[type].length&&load(type);}}};function getEnv(){var ua=navigator.userAgent;env={async:doc.createElement('script').async===true};(env.webkit=/AppleWebKit\//.test(ua))||(env.ie=/MSIE|Trident/.test(ua))||(env.opera=/Opera/.test(ua))||(env.gecko=/Gecko\//.test(ua))||(env.unknown=true);};function load(type,urls,tagid,classname,callback,obj,context){var _finish=function(){finish(type);},isCSS=type==='css',nodes=[],i,len,node,p,pendingUrls,url;env||getEnv();if(urls){urls=typeof urls==='string'?[urls]:urls.concat();if(isCSS||env.async||env.gecko||env.opera){queue[type].push({urls:urls,callback:callback,obj:obj,context:context});}
else{for(i=0,len=urls.length;i<len;++i){queue[type].push({urls:[urls[i]],callback:i===len-1? callback:null,obj:obj,context:context});}}}
if(pending[type]||!(p=pending[type]=queue[type].shift())){return;}
if(tagid=='head'){head||(head=doc.head||doc.getElementsByTagName('head')[0]);}
else if(tagid=='body'){head||(head=doc.head||doc.getElementsByTagName('body')[0]);}
else{head=document.getElementById(tagid);}
pendingUrls=p.urls.concat();for(i=0,len=pendingUrls.length;i<len;++i){url=pendingUrls[i];if(isCSS){node=env.gecko? createNode('style'):createNode('link',{href:url,rel:'stylesheet'});}
else{node=createNode('script',{src:url});node.async=false;}
node.className=classname;node.setAttribute('charset','utf-8');if(env.ie&&!isCSS&&'onreadystatechange' in node&&!('draggable' in node)){node.onreadystatechange=function(){if(/loaded|complete/.test(node.readyState)){node.onreadystatechange=null;_finish();}};}
else if(isCSS&&(env.gecko||env.webkit)){if(env.webkit){p.urls[i]=node.href;pollWebKit();}
else{node.innerHTML='@import "'+url+'";';pollGecko(node);}}
else{node.onload=node.onerror=_finish;}
nodes.push(node);}
for(i=0,len=nodes.length;i<len;++i){head.appendChild(nodes[i]);}};function pollGecko(node){var hasRules;try{hasRules=!!node.sheet.cssRules;}
catch(ex){pollCount+=1;if(pollCount<200){setTimeout(function(){pollGecko(node);},50);}
else{hasRules&&finish('css');}
return;}
finish('css');};function pollWebKit(){var css=pending.css,i;if(css){i=styleSheets.length;while(--i>=0){if(styleSheets[i].href===css.urls[0]){finish('css');break;}}
pollCount+=1;if(css){if(pollCount<200){setTimeout(pollWebKit,50);}
else{finish('css');}}}};return{css:function(urls,tagid,classname,callback,obj,context){load('css',urls,tagid,classname,callback,obj,context);},js:function(urls,tagid,classname,callback,obj,context){load('js',urls,tagid,classname,callback,obj,context);}};})(window.document);function datasoft(id,th){this.id=id;this.th=th;};datasoft.prototype={constructor:datasoft,create:function(){var a='<table id="'+this.id+'" class="bg-white table table-striped table-bordered tdanger" cellspacing="0" width="100%">'+'<thead>'+'<tr>';for(i=0,len=this.th.length;i<len;++i){a+='<th>'+this.th[i]+'</th>';};a+='</tr></thead></table><input type="hidden" class="rowselected" name="selected">';return a;},createNode:function(name,attrs){var node=document.createElement(name),attr;for(attr in attrs){if(attrs.hasOwnProperty(attr)){node.setAttribute(attr,attrs[attr]);}}
return node;}};dso=(function(doc){return{dtsmain:function(elm,id,th){var a=new datasoft(id,th).create(),b=doc.getElementsByTagName(elm)[0];if(!b){b=doc.getElementsById(elm)[0];}
b.innerHTML=a;}}})(window.document);