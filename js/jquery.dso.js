function cLog(t=null) {
    console.log(t);
	return;
}
function attr(trname=null,atr=false){
	if(trname!=null){
		if (typeof atr !== typeof undefined && atr !== false && atr!='') {
			return trname+'="'+atr+'"';
		}else{
			return '';
		}
	}
}
function tonumformat(va,format){
	var str = "" + va,
	pad = format,
	ans = pad.substring(0, pad.length - str.length) + str;
	return ans;
}
function regexDate(input) {
	var a= input.match(/^(0?[1-9]|[12][0-9]|3[01])[./-](0?[1-9]|1[012])[./-]\d{4}$/);
	if(Array.isArray(a)){
		a=a[0];
	}else{
		a=null;
	}
	return a;
}


function ERR(jqXHR=null,exception=null){
	var msg = '';
	if (jqXHR.status === 0) {
		msg = dsolang.ERR_0;
	} else if (jqXHR.status == 404) {
		msg = dsolang.ERR_400;
	} else if (jqXHR.status == 500) {
		msg = dsolang.ERR_500;
	} else if (exception === 'parsererror') {
		msg = dsolang.ERR_PARSE;
	} else if (exception === 'timeout') {
		msg = dsolang.ERR_TIMEOUT;
	} else if (exception === 'abort') {
		msg = dsolang.ERR_ABORT;
	} else {
		msg = dsolang.ERR_UNCAUGHT + jqXHR.responseText;
	}
	return msg;
}
function js_alert(theme,text){
	var x=document.getElementById('alert');
	if(x){
		setTimeout(function (){
			x.remove();
		}, 250);
	}
	return '<div class="alert alert-'+theme+' alert-dismissable fade in" id="alert">'
	+'<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'
		+text
	+'</div>';
}

function inTanggal(tanggal){
	var dateAr = tanggal.split('-');
	var newDate = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
	return newDate;
}
function toTanggal(tanggal){
	var dateAr = tanggal.split('/');
	var newDate = dateAr[0] + '.' + dateAr[1] + '.' + dateAr[2];
	return newDate;
}
function nowTanggal(){
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = (day)+"."+(month)+"."+now.getFullYear();
	return today;
}

function validForm(form){
	var error = 0;
	$(form+" [valid='true']").each(function(){
		var value = $(this).val();
		if(!value){
			$(this).css({"background-color":"#ffccca"});
			error++;
		}
	});
	return error;
}
/************************************************************/
;(function($){
	function attrs(el){
		var rDataAttr = /^i\-(\w+)$/;
		var attrs = {};
		$.each(el.attributes,function(index,attr){
		  if(rDataAttr.test(attr.nodeName)){
			attrs[rDataAttr.exec(attr.nodeName)[1]] = attr.value;
		  }
		});
		return attrs;
	}
})(jQuery)
;(function($){
	$.inputColor=function(target,opt){
		var plug	=this,
			$elm	=$(target),
			defaults={
				bgdef	:'',
				bgfocus	:''
			}
		var _init=function(){
			plug.opt=$.extend({},defaults,opt);
			$elm.on('focus',function(){
				$elm.css({"background-color":"#bbefff","border-radius":"0px"})
				//console.log('focused');
			}).on('blur',function(){
				$elm.css({"background-color":"#fff","border-radius":"3px"})
				//console.log('blur');
			})
			
		}
		_init();
	}
	
	$.fn.dsoiFocus=function(opt){
		return this.each(function(){
			if($(this).data('dsoiFocus')==undefined){
				var plug	= new $.inputColor(this,opt);
				$(this).data('dsoiFocus',plug);
			}
		});
	}
	
	$.fn.NumericOnly =function(){
		return this.each(function()
		{
			$(this).keydown(function(e){
				var key = e.charCode || e.keyCode || 0;
				// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
				// home, end, period, and numpad decimal
				return (
					key == 8 || 
					key == 9 ||
					key == 13 ||
					key == 46 ||
					key == 110 ||
					key == 190 ||
					(key >= 35 && key <= 40) ||
					(key >= 48 && key <= 57) ||
					(key >= 96 && key <= 105));
			});
		});
	};
	
	$.fn.dsoNode=function(set){
		var dev	={
			classname	:'',
			varname		:'',
			target		:'',
			data		:''
		};
		var opt		= $.extend(dev,set),
			elm		= $(this),
			target	= elm;
		if(opt.target){
			target	=opt.target;
		}
		
		$('.'+opt.classn).remove();	
		
		$('<script>')
		.attr('type', 'text/javascript')
		.attr('class', opt.classname)
		.text('var '+opt.varname+'='+opt.data)
		.appendTo(target);
	};
})(jQuery)

;(function($){
	/**
		t	= Tambah
		e	= Edit
		h	= Hapus
		d	= Duplikat
		a	= Adjusment
	**/
    $.fn.dsoTableButton = function(set) {
		var dev	={
			btn:''
		};
		var opt		= $.extend(dev,set);
		var elm		= $(this);
		var cbtn;
		var tambah	= button("tbbj-tambah","Tambah Data","plus","",'create'),
			edit	= button("tbbj-edit","Edit Data","pencil","disabled",'update'),
			adjs	= button("tbbj-adjs","Adjusment Stock","flash","disabled",'adjs'),
			hapus	= button("tbbj-hapus","Hapus Data","minus","disabled",'delete'),
			duplikat= button("tbbj-duplikat","Duplikat Data","duplicate","disabled",'duplicate');
		
		switch (opt.btn){
			case	'a': 
				cbtn	= tambah+edit+hapus+duplikat+adjs;
			break;
			default		: 
				cbtn	= tambah+edit+hapus+duplikat;
			break;
		}
        elm.append(function() {
            return cbtn;
        });
        return this;
    };
	function button(id,title,gicon,aktif,bevent){
		return '<button type="button" class="btn btn-default btn-sm dso-adm" id="'+id+'" style="margin:-1px 0 0 4px;" dso="tips" title="'+title+'" '+aktif+' i-event="'+bevent+'"><span class="glyphicon glyphicon-'+gicon+'" aria-hidden="true"></span></button>';
	};
}(jQuery))

;(function($){	
	$.fn.dsoTableAction = function(options) {
		var $ = jQuery;
		$.each(this,function(){
			var dev	={
				url		:'',
				type	:'POST',
				data	: {},
				event	: "click",
				success	: function(){},
				error  	: function(){},
				before 	: function(){}
			};
			
			options = $.extend(dev,options);
			//var data = getDataAttributes(this);
			
			var event 		= options.event,
				$display	= $("#popupadm");
			$(this).on(event,function(){
				var	$el	= $(this),
					$id	= $el.attr("id"),			
					$did= $(".rowselected").val();	//data id
				
				if(options.before){
					options.before.call(this);
				}
				
				$.ajax({
					url		: options.url+'?&dsoaksi='+$id+'&dataprimary='+$did,
					type	: options.type,
					data	: options.data,
					beforeSend	:function(){$('body').faLoading();},
					success	: function(data){
						$('body').faLoadingStop();
						$display.html(data).modal({backdrop: 'static',keyboard: true});
					},
					error	: function(data){
						$('body').faLoadingStop();
						$display.html(js_data_err(data)).modal({backdrop: 'static',keyboard: true});
					}
				});
			});
		});
		return this;
	};
	// tambah data baru umum
	// $(..).aProsesData(opt)
	$.fn.aProsesData=function(opt){
		$.each(this,function(){
			var dev	={
				action	:'',
				url		:'',
				type	:'POST',
				event	:"click",
				data	:{},
				frmid	:$(".modal-dialog form").attr("id"), // @val popupadm id = dst_frm_A
				dtsid	:dsoId.dts_id,
				focusid	:'',
				before	:function(){},
				done	:function(){}
			};
			opt 		= $.extend(dev,opt);
			var event 	= opt.event,
				focusid	= $('#'+opt.focusid);
			$(this).on(event,function(){
				var valid 	=validForm('#'+opt.frmid),
					btn		=$(this),
					data	=$('#'+opt.frmid).serialize();
					btn.button("loading");
					if(opt.action=='delete'){
						data = opt.data;
					}
					if(opt.before){
						opt.before.call(this);
					}
					//cLog(data);
				if(valid===0 && opt.frmid){
					$.ajax({
						url		: opt.url,
						type	: opt.type,
						data 	: data,
						success	: function(data){
							//cLog(data);
							var refreshtabel = $('#'+opt.dtsid).dataTable();
								refreshtabel.fnClearTable();
							btn.button("reset");
							if(data=='1'){
								$(js_alert("success",dsolang.DSO_SAVED)).insertAfter('#'+opt.frmid);
								if(opt.done){
									opt.done.call(this);
								}
							}else{
								$(js_alert('danger','Data <strong>'+focusid.val()+'</strong> gagal di proses')).insertAfter('#'+opt.frmid);
							}
						},
						error: function (jqXHR, exception) {
							var msg = cLog(' ERR :'+ERR(jqXHR, exception));
							$(js_alert('danger',msg)).insertAfter('#'+opt.frmid);
						}
					});
				}else{
					$(js_alert('danger',dsolang.ERR_VALIDATE)).insertAfter('#'+opt.frmid);
					btn.button("reset");
				}
			});
		});
		return this;
	};
/**
	@param load data JSON (pemicu)
	
*/
	$.fn.loadVar=function(opt){
		$.each(this,function(){
			var dev	={
				url		:'',
				type	:'POST',
				event	:"blur",
				success	:function(){},
				done	:function(){},
				format	:'000000',
				field	:'',
				frmid	: $(".modal-dialog form"),
				varjson	:''
			};
				opt		= $.extend(dev,opt);
			var event 	= opt.event;
			$(this).on(event,function(){
				var	el	=$(this),
					va	=el.val();
				if(!va){
					va=1;
					el.val(va);
				}	
				var	str = "" + va,
					pad = opt.format,
					ans = pad.substring(0, pad.length - str.length) + str;
					el.val(ans);
				var q	=ans+'.';
				//console.log(q);
				$.ajax({
					url		: opt.url,
					type	: opt.type,
					data 	: {dataprimary:q,fieldprimary:opt.field},
					success	: function(data){
						//cLog(' LOG :'+data);
						$('.'+opt.varjson).remove();
						
						$('<script>')
						.attr('type', 'text/javascript')
						.attr('class', opt.varjson)
						.text('var '+opt.varjson+'='+data)
						.appendTo(opt.frmid);
						
						if(opt.success){
							opt.success.call(this);
						}
					},
					error: function (jqXHR, exception) {
						//cLog(' ERR :'+ERR(jqXHR, exception));
					}
				});
				
			});
		});
		return this;
	};
}(jQuery))

;(function($){
	$.fn.dsoLoadPage=function(options){
		var $ 	 		= jQuery,
			$loadspin 	= $('.dso-display'),
			$appdisplay	= $('#dsoDisplay'),
			$appmodal	= $('#popupadm');
		var dev	={
			url		:"",
			event	:"click",
			id		: false,
			callback: function(){}
		};
		var opt		= $.extend(dev,options),
			event	= opt.event,
			url		= opt.url;
		$(this).on(event,function(){
			var $el = $(this),
				$elid=$(this).attr('id');
			if(opt.callback){
				opt.callback.call(this);
			}
			if(opt.id){
				//set exp 7 days
				Cookies.set('dso-go', $elid, { expires: 7 });
				url=$elid.replace('_','/');
				url='/'+url;
			}
			$loadspin.faLoading();
			$.get(url, function(data,status){
				if (status == 'success'){
					if(data==404){
						$appmodal.html(js_data_err(data)).modal({backdrop: 'static',keyboard: true});
					}else{
						$appdisplay.html(data);						
					}
					$loadspin.faLoadingStop();
				}else{
					$appmodal.html(js_data_err('System error...')).modal({backdrop: 'static',keyboard: true});
					$loadspin.faLoadingStop();
				}
			});
		});
		return this;
	};
})(jQuery)


;(function($){	
	$.fn.dsoDate=function(options){
		$(this).on('blur',function(){
			var el 	= $(this),
				id	= $(this).attr('id'),
				val	= $(this).val();
			//console.log(date(val)+' => '+val);
			if(regexDate(val)!=null && val.length>2){
				el.css({"background-color":"#fff"})
			}else{
				el.css({"background-color":"#ffccca"})
			}
		});
		return this;
	};
})(jQuery)
/** faLoading **/
!function(a) {
    a.faLoadingDefaultIcon = "fa-cog",
	a.fn.extend({
		faLoading: function(i) {
			return (void 0 === i || -1 == i.indexOf("fa-")) && (i = a.faLoadingDefaultIcon),
				a(this).each(function() {
					var n = a(this);
					n.css("position");
					n.append('<div class="fa-loading-wrapper"><div class="fa-loading-bg">&nbsp;</div><div class="fa-loading-icon-wrapper">   <i class="fa ' + i + ' fa-spin fa-loading-icon"></i></div></div>')
				})
		},
		faLoadingAdd: function(i) {
			return a("<div>").faLoading(i).appendTo(a(this))
		},
		faLoadingStop: function() {
			return a(this).each(function() {
				a(this).find("div.fa-loading-wrapper").remove()
			})
		}
	})
}(jQuery);

/** render elemnt **/
;(function($){
	$.extend({
		elementRender:function(){
			$('date').each(function(){
				//$( this ).replaceWith( "<div>" + $( this ).text() + "</div>" );
				var a=attrs(this),
					n='<input type="text" class="form-control text-center date" '+attr('name',a.name)+' '+attr('id',a.id)+' '+attr('value',a.val)+' autocomplete="off" placeholder"dd.mm.yyyy">',
					d='';
				if (typeof a.div !== typeof undefined && a.div !== false) {
					d+='<div '+attr('class',a.div)+'>'+n+'</div>';
					return $( this ).replaceWith(d);
				}else{
					return $( this ).replaceWith(n);
				}
			});
			
			$('input[type="text"]').each(function(){
				var e=$(this);
				if(e.hasClass("date")){
					e.attr({'placeholder':'dd.mm.yyyy'});
				}
				if(e.hasClass("number")){
					e.attr({'placeholder':'00.00'});
				}
				if(e.hasClass("kodebarang")){
					e.attr({'placeholder':'00.0000'});
				}
				if(e.hasClass("regcom")){
					e.attr({'placeholder':'000.000000.0'});
				}
			});
			
			//set formatter and ready to us
			$.fn.formatter.addInptType('B', /[0-1]/);
			
			$('input[type="text"]').dsoiFocus();
			$('.number').number(true,2);	
			$('.regcom').formatter({'pattern': '{{999}}.{{999999}}.{{9}}'});
			$('.kodebarang').formatter({'pattern': '{{99}}.{{9999}}'});
			$('.date').formatter({'pattern': '{{99}}.{{99}}.{{9999}}'}).dsoDate();
			$('.numeric').NumericOnly();
			$('.ppn').formatter({'pattern': '{{B}}'});
		}
	});
})(jQuery)
