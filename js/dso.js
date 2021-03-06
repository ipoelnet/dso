﻿//resize box
function box_rsz(id){
	var _hw=$('#dsoheader').width();
	var _hwa=(_hw/2)-12;
	if(_hwa<480){_hwa=480;}
	$(id).width(_hwa);
	/*$(window).resize(function(e){
		box_rsz(id);
		e.preventDefault();
	});*/
}
function box_rsz_v2(j,id){
	//j=jml
	var w=$('#dsoheader').width();//width
	var m; // total margin
	if(j==2){m=12;}else{m=j*4;}
	var v=(w/j)-m; // total w per box
	var d=(972/j)-m; //default size
	if(v<d){v=d;}
	$(id).width(v);
	$('#userdisplay').val(v);
	/*$(window).resize(function(e){
		box_rsz_v2(j,id);
		e.preventDefault();
	});*/
}
function box_display(id,lineh){ //boxdisplay, acuan height display
	var sh=$(lineh).height();
	var lh=sh-7;
	$(id).css({"background-color":"#e9ebeb"});
	$(id+' input').css({
	"width":"100%",
	"line-height":lh+"px",
	"background-color":"transparent",
	"border":"1px solid #e9ebeb",
	"font-size":"75px",
	"text-align":"right",
	"color":"#000",
	"font-family":"'Arial Narrow'",
	"margin":"-1px 0 0 2px",
	"border-radius":"0"});
}
function box_display_v2(id,lineh){ //boxdisplay, acuan height display
	var hw=$('#dsoheader').width();//width
	var aw=$(lineh).width(); //width acuan
	var sh=$(lineh).height(); //height acuan
	var lh=sh-7;
	var lw=hw-(aw+35);
	$(id).width(lw);
	$(id).css({"background-color":"#e9ebeb"});
	$(id+' input').css({
	"width":"100%",
	"line-height":lh+"px",
	"background-color":"#e9ebeb",
	"border":"1px solid #e9ebeb",
	"font-size":"75px",
	"text-align":"right",
	"font-family":"'Arial Narrow'",
	"margin":"-1px 0 0 2px",
	"border-radius":"0"});
}
function box_b_width(id,lineh){ //box, acuan w
	var hw=$('#dsoheader').width();//width
	var aw=$(lineh).width(); //width acuan minus
	var lw=hw-(aw+24);
	$(id).width(lw);
}
function dso_width(id,dev,wmin){
	var win =$(window);
	var winw=win.width();
	var setw=dev;
	if (winw>1000) {setw=winw-wmin;}
	//$('#xx').html(winw);
	$(id).width(setw);
	$(window).resize(function(){
		dso_width(id,dev,wmin);
	});
}

var dso_realtime=function(id){
	var interval = setInterval(function() {
		var mydate=new Date();
		var h=mydate.getHours(); //Hours
		var m=mydate.getMinutes();//Minutes
		var s=mydate.getSeconds();//Seconds
		var daten=n2(h)+':'+n2(m)+':'+n2(s);
		$(id).css({"margin-left":"2px"}).prop('disabled', true);
		$(id).val(daten);
	}, 1000);	
}
function n2(n){
    return n > 9 ? "" + n: "0" + n;
}
var CURRENT_URL = window.location.href.split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer'),
    $LEFT_COL = $('.left_col'),
    $RIGHT_COL = $('.dso-display'),
    $NAV_MENU = $('.nav_menu'),
    $FOOTER = $('footer');
// Sidebar
$(document).ready(function() {
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height());

        var bodyHeight = $BODY.outerHeight(),
            footerHeight = $BODY.hasClass('footer_fixed') ? 0 : $FOOTER.height(),
            leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        contentHeight -= $NAV_MENU.height() + footerHeight;

        $RIGHT_COL.css('min-height', contentHeight);
    };

    $SIDEBAR_MENU.find('a').click(function(ev) {
        var $li = $(this).parent();
        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                //setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }
            $li.addClass('active');
            $('ul:first', $li).slideDown(function() {
                //setContentHeight();
            });
        }
    });
    $MENU_TOGGLE.click(function() {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide();
            $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show();
            $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm');
        //setContentHeight();
    });
    $(window).smartresize(function(){  
        //setContentHeight();
    });
    //setContentHeight();
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
});
/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    var debounce = function (func, threshold, execAsap) {
      var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100); 
        };
    };
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

function dsoTableResize(){
	var win	= $(window),
		h	= win.height(),
		w	= win.width(),
		m	= $('.dso-menu-normal').height(), 	// dso menu normalshow if w > 768
		f	= $('.dsoffoter').height(),			//dso footer size
		df	= $('.dsodtfilter').height(),
		dp	= $('.dsodtpage').height(),
		ds	= $('.dataTables_scroll').height(),
		dh	= 26, //datatable height
		dot	= 60, //other	
		min	= m+f+df+dp+dh+dot,
		jml	= 0;
	$(window).on('resize', function(){
		h = $(window).height();
	});
	
	if($(".tbinfostart").length){
		var is	=$(".tbinfostart").html(),
			ie	=$(".tbinfoend").html(),
			it	=$(".tbinfototal").html();
		jml=parseFloat(ie)-parseFloat(is);
	}
	var sy	= h-min;
	if(w>768 && jml>10 && $(".table-resize").length){
		//$('.dataTables_scrollBody').height(sy);
		//$('.dataTables_scroll').css({"margin-right":"-14px"});
	}else{
		//$('.dataTables_scrollBody').height(300);
		//$('.dataTables_scroll').css({"margin-right":"0"});
	}
	//console.log('h'+h+',m '+m+',docHeight '+docHeight);
}
function keykombinasi(){
	var elements = [
		"insert","home","end","pageup","pagedown",
		"f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12",
		"Ctrl+a","Ctrl+b","Ctrl+c","Ctrl+d","Ctrl+e","Ctrl+f","Ctrl+g","Ctrl+h","Ctrl+i","Ctrl+j","Ctrl+k","Ctrl+l","Ctrl+m",
		"Ctrl+n","Ctrl+o","Ctrl+p","Ctrl+q","Ctrl+r","Ctrl+s","Ctrl+t","Ctrl+u","Ctrl+v","Ctrl+w","Ctrl+x","Ctrl+y","Ctrl+z",
		"Shift+a","Shift+b","Shift+c","Shift+d","Shift+e","Shift+f","Shift+g","Shift+h","Shift+i","Shift+j","Shift+k","Shift+l",
		"Shift+m","Shift+n","Shift+o","Shift+p","Shift+q","Shift+r","Shift+s","Shift+t","Shift+u","Shift+v","Shift+w","Shift+x",
		"Shift+y","Shift+z",
		"Alt+a","Alt+b","Alt+c","Alt+d","Alt+e","Alt+f","Alt+g","Alt+h","Alt+i","Alt+j","Alt+k","Alt+l",
		"Alt+m","Alt+n","Alt+o","Alt+p","Alt+q","Alt+r","Alt+s","Alt+t","Alt+u","Alt+v","Alt+w","Alt+x","Alt+y","Alt+z",
		"Ctrl+esc","Ctrl+tab","Ctrl+space","Ctrl+return","Ctrl+backspace","Ctrl+scroll","Ctrl+capslock","Ctrl+numlock",
		"Ctrl+insert","Ctrl+home","Ctrl+del","Ctrl+end","Ctrl+pageup","Ctrl+pagedown","Ctrl+left","Ctrl+up","Ctrl+right",
		"Ctrl+down",
		"Ctrl+f1","Ctrl+f2","Ctrl+f3","Ctrl+f4","Ctrl+f5","Ctrl+f6","Ctrl+f7","Ctrl+f8","Ctrl+f9","Ctrl+f10","Ctrl+f11","Ctrl+f12",
		"Shift+esc","Shift+tab","Shift+space","Shift+return","Shift+backspace","Shift+scroll","Shift+capslock","Shift+numlock",
		"Shift+insert","Shift+home","Shift+del","Shift+end","Shift+pageup","Shift+pagedown","Shift+left","Shift+up",
		"Shift+right","Shift+down",
		"Shift+f1","Shift+f2","Shift+f3","Shift+f4","Shift+f5","Shift+f6","Shift+f7","Shift+f8","Shift+f9","Shift+f10","Shift+f11","Shift+f12",
		"Alt+esc","Alt+tab","Alt+space","Alt+return","Alt+backspace","Alt+scroll","Alt+capslock","Alt+numlock",
		"Alt+insert","Alt+home","Alt+del","Alt+end","Alt+pageup","Alt+pagedown","Alt+left","Alt+up","Alt+right","Alt+down",
		"Alt+f1","Alt+f2","Alt+f3","Alt+f4","Alt+f5","Alt+f6","Alt+f7","Alt+f8","Alt+f9","Alt+f10","Alt+f11","Alt+f12"
	];
	
	// the fetching...
	$.each(elements, function(i, e){ // i is element index. e is element as text.
	   var newElement = ( /[\+]+/.test(elements[i]) ) ? elements[i].replace("+","_") : elements[i];
	   // Binding keys
	   $(document).bind('keydown', elements[i], function assets(e) {
		   if(document.getElementById('_'+newElement) != null) {
			   $('#_'+ newElement).trigger("click");
			   e.preventDefault();
			   return false;
		   }  
	   });
	});
	$(document).bind('keydown', 'return', function assets(e) {
		   //alert('enter');
		   e.preventDefault();
			return false;
	   });
}
function dsoInput(form){
	$(form+' input[type="text"]').each(function(){
		var $input=$(this);
		$input.on('focus',function(){
			$input.css({"background-color":"#bbefff","border-radius":"0px"})
		}).on('blur',function(){
			$input.css({"background-color":"#fff","border-radius":"3px"})
		});
	});
	return false;
}
function enterastab(){
	$(document).keydown(function(e) {
		var self = $(':focus'),
			form = self.parents('form:eq(0)'),
			focusable;
		focusable = form.find('input,a,select,button,textarea,div[contenteditable=true]').filter(':visible');

		function enterKey() {
			if (e.which === 13 && !self.is('textarea,div[contenteditable=true]')) {
				if ($.inArray(self, focusable) && (!self.is('a,button'))) {
					e.preventDefault();
				}
				focusable.eq(focusable.index(self) + (e.shiftKey ? -1 : 1)).focus();
				return !1;
			}
			if (e.which === 40 && !self.is('textarea,div[contenteditable=true]')) {
				if ($.inArray(self, focusable) && (!self.is('a,button'))) {
					e.preventDefault();
				}
				focusable.eq(focusable.index(self) + 1).focus();
				return !1;
			}
			if (e.which === 38 && !self.is('textarea,div[contenteditable=true]')) {
				if ($.inArray(self, focusable) && (!self.is('a,button'))) {
					e.preventDefault();
				}
				focusable.eq(focusable.index(self) - 1).focus();
				return !1;
			}
		}
		if (e.shiftKey) {
			enterKey();
		} else {
			enterKey();
		}
	});
}

function js_data_err(err){
	return '<div class="modal-dialog modal-sm"><div class="modal-content"><div class="color-line"></div><div class="modal-header text-center">'
	+'<h4 class="modal-title">Informasi</h4></div>'
	+'<div class="modal-body">'
	+'<span class="label label-warning">Error : '+err+'</span> <br>Mohon maaf, saat ini system tidak dapat melakukan permohonan anda'
	+'</div><div class="modal-footer">'
	+'<button type="button" class="btn btn-outline btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-off" aria-hidden="true" dso="tips" title="close"></span></button></div></div>';
}
function js_modal(title,isi,cls='sm'){
	return '<div class="modal-dialog modal-'+cls+'"><div class="modal-content"><div class="color-line"></div><div class="modal-header text-center">'
	+'<h4 class="modal-title">'+title+'</h4></div>'
	+'<div class="modal-body">'
	+isi+'</div><div class="modal-footer">'
	+'<button type="button" class="btn btn-outline btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-off" aria-hidden="true" dso="tips" title="close"></span></button></div></div>';
}
dsoScriptLoaderDisplay = (function (doc) {
  var env,
  head,
  pending = {},
  pollCount = 0,
  queue = {css: [], js: []},
  styleSheets = doc.styleSheets;

  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;
    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }
    return node;
  }

  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE|Trident/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      urls = typeof urls === 'string' ? [urls] : urls.concat();

      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    //head || (head = doc.head || doc.getElementsByTagName('head')[0]);
	head=document.getElementById('dsoDisplay');
    pendingUrls = p.urls.concat();

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'ds';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS && 'onreadystatechange' in node && !('draggable' in node)) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        if (env.webkit) {
          p.urls[i] = node.href;
          pollWebKit();
        } else {
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }
  function pollGecko(node) {
    var hasRules;

    try {
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        hasRules && finish('css');
      }

      return;
    }

    finish('css');
  }

  function pollWebKit() {
    var css = pending.css, i;

    if (css) {
      i = styleSheets.length;

      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          finish('css');
        }
      }
    }
  }

  return {

    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },

    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(this.document);

var mnData=[{"id":"data_keanggotaan","text":"Keanggotaan"},{"id":"data_rekanan","text":"Rekanan"},{"id":"data_barang-jasa","text":"Barang / Jasa"},{"id":"data_detail-barang-jasa","text":"Deatail Barang / Jasa"}];