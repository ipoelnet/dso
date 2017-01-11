(function(jQuery) {
function fullScreen(state)
{
    var e, func, doc;
    if (!this.length) return this;
    e = (this[0]);
    if (e.ownerDocument)
    {
        doc = e.ownerDocument;
    }
    else
    {
        doc = e;
        e = doc.documentElement;
    }
    if (state == null)
    {
        if (!((doc["exitFullscreen"])
            || (doc["webkitExitFullscreen"])
            || (doc["webkitCancelFullScreen"])
            || (doc["msExitFullscreen"])
            || (doc["mozCancelFullScreen"])))
        {
            return null;
        }
		
        state = !!doc["fullscreenElement"]
            || !!doc["msFullscreenElement"]
            || !!doc["webkitIsFullScreen"]
            || !!doc["mozFullScreen"];
        if (!state) return state;
        
		
        return (doc["fullscreenElement"])
            || (doc["webkitFullscreenElement"])
            || (doc["webkitCurrentFullScreenElement"])
            || (doc["msFullscreenElement"])
            || (doc["mozFullScreenElement"])
            || state;
    }
    	
    if (state)
    {
        func = (e["requestFullscreen"])
            || (e["webkitRequestFullscreen"])
            || (e["webkitRequestFullScreen"])
            || (e["msRequestFullscreen"])
            || (e["mozRequestFullScreen"]);
        if (func) 
        {
            func.call(e);
        }
        return this;
    }
    else
    {
        func = (doc["exitFullscreen"])
            || (doc["webkitExitFullscreen"])
            || (doc["webkitCancelFullScreen"])
            || (doc["msExitFullscreen"])
            || (doc["mozCancelFullScreen"]);
        if (func) func.call(doc);
        return this;
    }
}

function toggleFullScreen()
{
    return (fullScreen.call(this, 
        !fullScreen.call(this)));
}

function fullScreenChangeHandler(event)
{
    jQuery(document).trigger(new jQuery.Event("fullscreenchange"));
}

function fullScreenErrorHandler(event)
{
    jQuery(document).trigger(new jQuery.Event("fullscreenerror"));
}

function installFullScreenHandlers()
{
    var e, change, error;
    e = document;
    if (e["webkitCancelFullScreen"])
    {
        change = "webkitfullscreenchange";
        error = "webkitfullscreenerror";
    }
    else if (e["msExitFullscreen"])
    {
        change = "MSFullscreenChange";
        error = "MSFullscreenError";
    }
    else if (e["mozCancelFullScreen"])
    {
        change = "mozfullscreenchange";
        error = "mozfullscreenerror";
    }
    else 
    {
        change = "fullscreenchange";
        error = "fullscreenerror";
    }

    jQuery(document).bind(change, fullScreenChangeHandler);
    jQuery(document).bind(error, fullScreenErrorHandler);
}

jQuery.fn["fullScreen"] = fullScreen;
jQuery.fn["toggleFullScreen"] = toggleFullScreen;
installFullScreenHandlers();

})(jQuery);