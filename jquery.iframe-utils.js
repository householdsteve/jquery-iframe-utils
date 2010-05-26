/**
 * @author Stephane Roucheray 
 * @extends jquery
 * UPDATED FOR JQUERY 1.4.2 BY STEVEN MCCRUMB
 * CHANGED SELECTOR TO IFRAME SPECIFIC
 */
(function($){
$.fn.iframeResize = function(options){

		var settings = $.extend({}, $.fn.iframeResize.defaults, options);

		var frame = $(this);
		var body = frame.contents().find("body");
		
		frame.css("overflow", "hidden");
		
		if (settings.autoUpdate) {
			if ($.browser.msie) {
				frame.attr("scrolling", "auto");
				setInterval(function(){
					body.trigger("Resizer");
				}, 1000);
			}
			else {
				body.bind("DOMSubtreeModified", {
					frame: frame
				}, function(e){
					body.trigger("Resizer");
				});
			}
		}
	
		body.bind("Resizer", {frameObj:frame}, function(e){
			var body = $(this);
			e.data.frameObj.css("width",  settings.width  == "fill" ? "100%" : parseInt(settings.height));
			e.data.frameObj.css("height", settings.height == "auto" ? body.outerHeight(true) + settings.filler : parseInt(settings.height));	
		});

		body.trigger("Resizer");
	
}

$.fn.iframeResize.defaults = {
	width: "fill",
	height: "auto",
	filler: 30,
	autoUpdate : true
}

})(jQuery);

(function($){
$.fn.iframeCreate = function(options){
	var defaults = $.extend({}, $.fn.iframeCreate.defaults, options);
	var $i = $("<iframe>");
    
	var $obj = $(this);

	$obj.append($i);
    
	$i.attr(defaults.attr);

    $i.load(function() 
    {	
		$(this).iframeResize(defaults);
    });

	return this;
}

$.fn.iframeCreate.defaults = {
	attr: {}, // an object of attributes given in the iframe creation
	width: "fill", // defaults used in iframeResize
	height: "auto", // defaults used in iframeResize
	filler: 30, // defaults used in iframeResize
	autoUpdate : true // defaults used in iframeResize
}
	
})(jQuery);


(function($){
$.fn.iframeInlineResize = function(options){
	var defaults = $.extend({}, $.fn.iframeInlineResize.defaults, options);
	
	return this.each(function(i,v){
		var $obj = $(this);
		var $objParent = $(this).parent();
		var $oldInstance = $(this).remove();
		var $i = $("<iframe>");
		
		$objParent.append($i);
		$i.attr($.getAttributes($oldInstance));
		$i.load(function() 
	    {	
			$(this).iframeResize(defaults);
	    });
		
	});
	
}

$.fn.iframeInlineResize.defaults = {
	width: "fill", // defaults used in iframeResize
	height: "auto", // defaults used in iframeResize
	filler: 30, // defaults used in iframeResize
	autoUpdate : true // defaults used in iframeResize
}
	
})(jQuery);

// included the get attribute plugin found here:
// http://plugins.jquery.com/node/6530
// made by: mkmanning

jQuery.getAttributes=function(F,C){var F=((typeof F==="string")?jQuery(F)[0]:F[0]),D=0,F=F.attributes,B=F.length,E=["abort","blur","change","click","dblclick","error","focus","keydown","keypress","keyup","load","mousedown","mousemove","mouseout","mouseover","mouseup","reset","resize","select","submit","unload"],A={};for(D;D<B;D++){if(C||!C&&jQuery.inArray(F[D].nodeName.replace(/^on/,""),E)==-1){A[F[D].nodeName]=F[D].nodeValue}}return A}