/** CountUp script
 * @link http://inorganik.github.io/countUp.js/
 * @version 1.3.1
 */
function countUp(a,b,c,d,e,f){for(var g=0,h=["webkit","moz","ms","o"],i=0;i<h.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[h[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[h[i]+"CancelAnimationFrame"]||window[h[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var c=(new Date).getTime(),d=Math.max(0,16-(c-g)),e=window.setTimeout(function(){a(c+d)},d);return g=c+d,e}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)}),this.options=f||{useEasing:!0,useGrouping:!0,separator:",",decimal:"."},""==this.options.separator&&(this.options.useGrouping=!1),null==this.options.prefix&&(this.options.prefix=""),null==this.options.suffix&&(this.options.suffix="");var j=this;this.d="string"==typeof a?document.getElementById(a):a,this.startVal=Number(b),this.endVal=Number(c),this.countDown=this.startVal>this.endVal?!0:!1,this.startTime=null,this.timestamp=null,this.remaining=null,this.frameVal=this.startVal,this.rAF=null,this.decimals=Math.max(0,d||0),this.dec=Math.pow(10,this.decimals),this.duration=1e3*e||2e3,this.version=function(){return"1.3.1"},this.printValue=function(a){if(!j.d)return;var b=isNaN(a)?"--":j.formatNumber(a);"INPUT"==j.d.tagName?this.d.value=b:this.d.innerHTML=b},this.easeOutExpo=function(a,b,c,d){return 1024*c*(-Math.pow(2,-10*a/d)+1)/1023+b},this.count=function(a){null===j.startTime&&(j.startTime=a),j.timestamp=a;var b=a-j.startTime;if(j.remaining=j.duration-b,j.options.useEasing)if(j.countDown){var c=j.easeOutExpo(b,0,j.startVal-j.endVal,j.duration);j.frameVal=j.startVal-c}else j.frameVal=j.easeOutExpo(b,j.startVal,j.endVal-j.startVal,j.duration);else if(j.countDown){var c=(j.startVal-j.endVal)*(b/j.duration);j.frameVal=j.startVal-c}else j.frameVal=j.startVal+(j.endVal-j.startVal)*(b/j.duration);j.frameVal=j.countDown?j.frameVal<j.endVal?j.endVal:j.frameVal:j.frameVal>j.endVal?j.endVal:j.frameVal,j.frameVal=Math.round(j.frameVal*j.dec)/j.dec,j.printValue(j.frameVal),b<j.duration?j.rAF=requestAnimationFrame(j.count):null!=j.callback&&j.callback()},this.start=function(a){return j.callback=a,isNaN(j.endVal)||isNaN(j.startVal)?(console.log("countUp error: startVal or endVal is not a number"),j.printValue()):j.rAF=requestAnimationFrame(j.count),!1},this.stop=function(){cancelAnimationFrame(j.rAF)},this.reset=function(){j.startTime=null,j.startVal=b,cancelAnimationFrame(j.rAF),j.printValue(j.startVal)},this.resume=function(){j.stop(),j.startTime=null,j.duration=j.remaining,j.startVal=j.frameVal,requestAnimationFrame(j.count)},this.formatNumber=function(a){a=a.toFixed(j.decimals),a+="";var b,c,d,e;if(b=a.split("."),c=b[0],d=b.length>1?j.options.decimal+b[1]:"",e=/(\d+)(\d{3})/,j.options.useGrouping)for(;e.test(c);)c=c.replace(e,"$1"+j.options.separator+"$2");return j.options.prefix+c+d+j.options.suffix},j.printValue(j.startVal)}

(function ($) {

	function builder_progress_bar_init(e,el,type) {
		var items = $( '.module.module-progressbar', el );

		if( el && el.hasClass( 'module-progressbar' ) && el.hasClass( 'module' ) ) {
			items = items.add( el );
		}
		
		items = items.find( '.tb-progress-bar' );

		function builder_progress_bar() {
			items.each(function(){
				var $this = $( this );

				$this.waypoint( function() {
					var bar = $this.find( '.tb-progress-bar-bg' );
					
					bar.width( bar.data( 'percent' ) + '%' );

					if( $this.find( '.tb-progress-tooltip' ).length ) {
						var $countup = $this.find( '.tb-progress-tooltip' ),
							id = $countup.prop( 'id' ),
							to = $countup.data( 'to' ),
							decimals = $countup.data( 'decimals' ),
							suffix = $countup.data( 'suffix' );

						if( to ) {
							new countUp( id, 0, to, decimals, 3, { useEasing : true, decimal : '.', suffix: suffix } ).start();
						} else {
							$countup.html( suffix );
						}
					}
				}, {
					offset: '100%',
					triggerOnce: true
				} );
			} );
			}
			
			if(items.length>0){
				if( 'undefined' === typeof $.fn.waypoint ) {
					Themify.LoadAsync( themify_vars.url+'/js/waypoints.min.js', builder_progress_bar, null, null, function(){
							return ( 'undefined' !== typeof $.fn.waypoint );
					} );
				} else {
					builder_progress_bar();
				}
			}
	}
	if ( Themify.is_builder_active ) {
		$( 'body' ).on( 'builder_load_module_partial', builder_progress_bar_init );
		Themify.is_builder_loaded && builder_progress_bar_init();
	} else{
		builder_progress_bar_init();
	}
}( jQuery ) );