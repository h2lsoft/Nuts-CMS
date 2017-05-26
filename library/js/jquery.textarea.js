/*! jquery.taboverride v4.0.0 | https://github.com/wjbryant/jquery.taboverride
Copyright (c) 2013 Bill Bryant | http://opensource.org/licenses/mit */

/*! taboverride v4.0.3 | https://github.com/wjbryant/taboverride
(c) 2015 Bill Bryant | http://opensource.org/licenses/mit */
!function(a){"use strict";var b;"object"==typeof exports?a(exports):"function"==typeof define&&define.amd?define(["exports"],a):(b=window.tabOverride={},a(b))}(function(a){"use strict";function b(a,b){var c,d,e,f=["alt","ctrl","meta","shift"],g=a.length,h=!0;for(c=0;g>c;c+=1)if(!b[a[c]]){h=!1;break}if(h)for(c=0;c<f.length;c+=1){if(e=f[c]+"Key",b[e])if(g){for(h=!1,d=0;g>d;d+=1)if(e===a[d]){h=!0;break}}else h=!1;if(!h)break}return h}function c(a,c){return a===q&&b(s,c)}function d(a,c){return a===r&&b(t,c)}function e(a,b){return function(c,d){var e,f="";if(arguments.length){if("number"==typeof c&&(a(c),b.length=0,d&&d.length))for(e=0;e<d.length;e+=1)b.push(d[e]+"Key");return this}for(e=0;e<b.length;e+=1)f+=b[e].slice(0,-3)+"+";return f+a()}}function f(a){a=a||event;var b,e,f,g,h,i,j,k,l,s,t,w,x,y,z,A,B,C,D=a.currentTarget||a.srcElement,E=a.keyCode,F="character";if((!D.nodeName||"textarea"===D.nodeName.toLowerCase())&&(E===q||E===r||13===E&&u)){if(v=!1,f=D.value,k=D.scrollTop,"number"==typeof D.selectionStart)l=D.selectionStart,s=D.selectionEnd,t=f.slice(l,s);else{if(!o.selection)return;g=o.selection.createRange(),t=g.text,h=g.duplicate(),h.moveToElementText(D),h.setEndPoint("EndToEnd",g),s=h.text.length,l=s-t.length,n>1?(i=f.slice(0,l).split(m).length-1,j=t.split(m).length-1):i=j=0}if(E===q||E===r)if(b=p,e=b.length,y=0,z=0,A=0,l!==s&&-1!==t.indexOf("\n"))if(w=0===l||"\n"===f.charAt(l-1)?l:f.lastIndexOf("\n",l-1)+1,s===f.length||"\n"===f.charAt(s)?x=s:"\n"===f.charAt(s-1)?x=s-1:(x=f.indexOf("\n",s),-1===x&&(x=f.length)),c(E,a))y=1,D.value=f.slice(0,w)+b+f.slice(w,x).replace(/\n/g,function(){return y+=1,"\n"+b})+f.slice(x),g?(g.collapse(),g.moveEnd(F,s+y*e-j-i),g.moveStart(F,l+e-i),g.select()):(D.selectionStart=l+e,D.selectionEnd=s+y*e,D.scrollTop=k);else{if(!d(E,a))return;0===f.slice(w).indexOf(b)&&(w===l?t=t.slice(e):A=e,z=e),D.value=f.slice(0,w)+f.slice(w+A,l)+t.replace(new RegExp("\n"+b,"g"),function(){return y+=1,"\n"})+f.slice(s),g?(g.collapse(),g.moveEnd(F,s-z-y*e-j-i),g.moveStart(F,l-A-i),g.select()):(D.selectionStart=l-A,D.selectionEnd=s-z-y*e)}else if(c(E,a))g?(g.text=b,g.select()):(D.value=f.slice(0,l)+b+f.slice(s),D.selectionEnd=D.selectionStart=l+e,D.scrollTop=k);else{if(!d(E,a))return;0===f.slice(l-e).indexOf(b)&&(D.value=f.slice(0,l-e)+f.slice(l),g?(g.move(F,l-e-i),g.select()):(D.selectionEnd=D.selectionStart=l-e,D.scrollTop=k))}else if(u){if(0===l||"\n"===f.charAt(l-1))return void(v=!0);if(w=f.lastIndexOf("\n",l-1)+1,x=f.indexOf("\n",l),-1===x&&(x=f.length),B=f.slice(w,x).match(/^[ \t]*/)[0],C=B.length,w+C>l)return void(v=!0);g?(g.text="\n"+B,g.select()):(D.value=f.slice(0,l)+"\n"+B+f.slice(s),D.selectionEnd=D.selectionStart=l+n+C,D.scrollTop=k)}return a.preventDefault?void a.preventDefault():(a.returnValue=!1,!1)}}function g(a){a=a||event;var b=a.keyCode;if(c(b,a)||d(b,a)||13===b&&u&&!v){if(!a.preventDefault)return a.returnValue=!1,!1;a.preventDefault()}}function h(a,b){var c,d=x[a]||[],e=d.length;for(c=0;e>c;c+=1)d[c].apply(null,b)}function i(a){function b(b){for(c=0;f>c;c+=1)b(a[c].type,a[c].handler)}var c,d,e,f=a.length;return o.addEventListener?(d=function(a){b(function(b,c){a.removeEventListener(b,c,!1)})},e=function(a){d(a),b(function(b,c){a.addEventListener(b,c,!1)})}):o.attachEvent&&(d=function(a){b(function(b,c){a.detachEvent("on"+b,c)})},e=function(a){d(a),b(function(b,c){a.attachEvent("on"+b,c)})}),{add:e,remove:d}}function j(a){h("addListeners",[a]),l.add(a)}function k(a){h("removeListeners",[a]),l.remove(a)}var l,m,n,o=window.document,p="\t",q=9,r=9,s=[],t=["shiftKey"],u=!0,v=!1,w=o.createElement("textarea"),x={};l=i([{type:"keydown",handler:f},{type:"keypress",handler:g}]),w.value="\n",m=w.value,n=m.length,w=null,a.utils={executeExtensions:h,isValidModifierKeyCombo:b,createListeners:i,addListeners:j,removeListeners:k},a.handlers={keydown:f,keypress:g},a.addExtension=function(a,b){return a&&"string"==typeof a&&"function"==typeof b&&(x[a]||(x[a]=[]),x[a].push(b)),this},a.set=function(a,b){var c,d,e,f,g,i,l;if(a)for(c=arguments.length<2||b,d=a,e=d.length,"number"!=typeof e&&(d=[d],e=1),c?(f=j,g="true"):(f=k,g=""),i=0;e>i;i+=1)l=d[i],l&&l.nodeName&&"textarea"===l.nodeName.toLowerCase()&&(h("set",[l,c]),l.setAttribute("data-taboverride-enabled",g),f(l));return this},a.tabSize=function(a){var b;if(arguments.length){if(a&&"number"==typeof a&&a>0)for(p="",b=0;a>b;b+=1)p+=" ";else p="\t";return this}return"\t"===p?0:p.length},a.autoIndent=function(a){return arguments.length?(u=a?!0:!1,this):u},a.tabKey=e(function(a){return arguments.length?void(q=a):q},s),a.untabKey=e(function(a){return arguments.length?void(r=a):r},t)});
//# sourceMappingURL=taboverride.min.js.map

/**
 * @fileOverview Tab Override jQuery plugin
 * @author       Bill Bryant
 * @version      4.0.0
 */

/*global exports, require, define, jQuery, tabOverride */

/**
 * The jQuery plugin namespace
 *
 * @external "jQuery.fn"
 */

// Use CommonJS or AMD if available
(function ( factory ) {
	"use strict";

	if ( typeof exports === "object" && typeof require === "function" ) {
		// Node.js/CommonJS
		factory( require( "jquery" ), require( "taboverride" ) );
	} else if ( typeof define === "function" && define.amd ) {
		// AMD - Register as an anonymous module
		// Files must be concatenated using an AMD-aware tool such as r.js
		define( [ "jquery", "taboverride" ], factory );
	} else {
		// No module format - Use global variables instead
		factory( jQuery, tabOverride );
	}
}(function ( $, tabOverride ) {
	"use strict";

	var $fnTabOverride;

	/**
	 * Helper function to remove the delegated listeners. This is only used in
	 * the removeDelegatedListeners and addDelegatedListeners functions.
	 *
	 * @see external:"jQuery.fn".tabOverride.utils.removeDelegatedListeners
	 * @private
	 */
	function removeDelegatedListenersHelper( $container, selector ) {
		$container.off({
			"keydown.tabOverride": tabOverride.handlers.keydown,
			"keypress.tabOverride": tabOverride.handlers.keypress
		}, selector );
	}

	/**
	 * Removes the Tab Override event listeners on the container element
	 * using jQuery delegated events.
	 *
	 * Hooks: removeDelegatedListeners - passed the jQuery object for the
	 * container element(s) and the selector string
	 *
	 * @param {Object} $container  the jQuery object for the container element
	 * @param {string} selector    the selector string to use for the delegated events
	 *
	 * @method external:"jQuery.fn".tabOverride.utils.removeDelegatedListeners
	 */
	function removeDelegatedListeners( $container, selector ) {
		tabOverride.utils.executeExtensions( "removeDelegatedListeners", [ $container, selector ] );
		removeDelegatedListenersHelper( $container, selector );
	}

	/**
	 * Adds the Tab Override event listeners to the container element using
	 * jQuery delegated events.
	 *
	 * Hooks: addDelegatedListeners - passed the jQuery object for the
	 * container element(s) and the selector string
	 *
	 * @param {Object} $container  the jQuery object for the container element
	 * @param {string} selector    the selector string to use for the delegated events
	 *
	 * @method external:"jQuery.fn".tabOverride.utils.addDelegatedListeners
	 */
	function addDelegatedListeners( $container, selector ) {
		tabOverride.utils.executeExtensions( "addDelegatedListeners", [ $container, selector ] );
		removeDelegatedListenersHelper( $container, selector );
		$container.on({
			"keydown.tabOverride": tabOverride.handlers.keydown,
			"keypress.tabOverride": tabOverride.handlers.keypress
		}, selector );
	}

	/**
	 * The tabOverride method namespace
	 *
	 * @namespace external:"jQuery.fn".tabOverride
	 */

	/**
	 * Enables/disables Tab Override. If enabled, tabs (or spaces) will be
	 * inserted in the selected textarea elements when the tab key is pressed.
	 *
	 * Hooks: setDelegated - fired when delegated events are used, passed the
	 * jQuery object for the container element(s), the selector string, and a
	 * boolean indicating whether Tab Override was enabled or disabled.
	 *
	 * @param  {boolean} [enable=true]  whether Tab Override should be enabled
	 *                                  for the element(s)
	 * @param  {string}  [selector]     the selector string for delegated events
	 * @return {Object}                 the jQuery object
	 *
	 * @method external:"jQuery.fn".tabOverride(2)
	 */
	$fnTabOverride = $.fn.tabOverride = function ( enable, selector ) {

		var enablePlugin = !arguments.length || enable,
			isDelegated = typeof selector === "string",
			$container;

		if ( isDelegated ) {
			$container = this;

			tabOverride.utils.executeExtensions( "setDelegated", [ $container, selector, enable ] );

			if ( enablePlugin ) {
				addDelegatedListeners( $container, selector );
			} else {
				removeDelegatedListeners( $container, selector );
			}
		} else {
			// The jQuery object acts as an array of elements, so it can be passed
			// to tabOverride.set()
			tabOverride.set( this, enablePlugin );
		}

		// Return the jQuery object
		return this;
	};

	/**
	 * Namespace for utility methods
	 *
	 * @namespace external:"jQuery.fn".tabOverride.utils
	 */
	$fnTabOverride.utils = {
		addDelegatedListeners: addDelegatedListeners,
		removeDelegatedListeners: removeDelegatedListeners
	};

	/**
	 * Gets or sets the tab size for all elements that have Tab Override enabled.
	 * 0 represents the tab character.
	 *
	 * @param  {number}          [size]  the tab size
	 * @return {number|Function}         the tab size or the tabOverride function
	 *
	 * @method external:"jQuery.fn".tabOverride.tabSize
	 */
	$fnTabOverride.tabSize = tabOverride.tabSize;

	/**
	 * Gets or sets the auto indent setting. True if each line should be
	 * automatically indented (default = false).
	 *
	 * @param  {boolean}          [enable]  whether auto indent should be enabled
	 * @return {boolean|Function}           whether auto indent is enabled or the
	 *                                      tabOverride function
	 *
	 * @method external:"jQuery.fn".tabOverride.autoIndent
	 */
	$fnTabOverride.autoIndent = tabOverride.autoIndent;

	/**
	 * Gets or sets the tab key combination.
	 *
	 * @param  {number}          keyCode             the key code of the key to use for tab
	 * @param  {string[]}        [modifierKeyNames]  the modifier key names - valid names are
	 *                                               'alt', 'ctrl', 'meta', and 'shift'
	 * @return {string|Function}                     the current tab key combination or the
	 *                                               tabOverride function
	 *
	 * @method external:"jQuery.fn".tabOverride.tabKey
	 */
	$fnTabOverride.tabKey = tabOverride.tabKey;

	/**
	 * Gets or sets the untab key combination.
	 *
	 * @param  {number}          keyCode             the key code of the key to use for untab
	 * @param  {string[]}        [modifierKeyNames]  the modifier key names - valid names are
	 *                                               'alt', 'ctrl', 'meta', and 'shift'
	 * @return {string|Function}                     the current untab key combination or the
	 *                                               tabOverride function
	 *
	 * @method external:"jQuery.fn".tabOverride.untabKey
	 */
	$fnTabOverride.untabKey = tabOverride.untabKey;
}));