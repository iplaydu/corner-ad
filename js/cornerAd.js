	var cornerAdBigLoaded = false;
	
	function printCornerAd(config){
		var toPrint 	= '',
			attrStr 	= '',
			thumbPath	= '',
			imgPath		= '';
		
		if(config['thumbPath']){
			thumbPath = config['thumbPath'];
			delete config['thumbPath'];
		}
		
		if(config['imgPath']){
			imgPath = config['imgPath'];
			delete config['imgPath'];
			thumbPath = (thumbPath.length == 0) ? imgPath : thumbPath;
		}
		
		for(attr in config){
			attrStr += attr+'='+escape(config[attr])+'&';
		}
		
		var swfLocation = corner_ad['url']+'/js/cornerAd.swf';		
        
		// Big corner 
		toPrint +='<div id="bigCorner" style="z-index:100000;position:absolute;left:0px; top:0px;">';
        if (navigator.appName.indexOf("Microsoft") == -1) {
            toPrint +='<embed name="cornerAd" allowscriptaccess="always" src="'+swfLocation+'?'+attrStr+'imgPath='+imgPath+'&isBig=true" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="500" height="500"></embed>';
		}else{
            toPrint +='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="500" height="500" id="cornerAd" align="middle">\
                <param name="movie" value="'+swfLocation+'?'+attrStr+'imgPath='+imgPath+'&isBig=true" />\
                <param name="quality" value="high" />\
                <param name="play" value="true" />\
                <param name="loop" value="true" />\
                <param name="wmode" value="transparent" />\
                <param name="scale" value="exactfit" />\
                <param name="menu" value="true" />\
                <param name="devicefont" value="false" />\
                <param name="salign" value="" />\
                <param name="allowScriptAccess" value="sameDomain" />\
            </object>';
        }    
		toPrint +='</div>';
		
		// Short corner 
		toPrint +='<div id="shortCorner" style="z-index:99999;position:absolute;left:0px; top:0px;">';
        if (navigator.appName.indexOf("Microsoft") == -1) {
            toPrint +='<embed allowscriptaccess="always" src="'+swfLocation+'?'+attrStr+'imgPath='+thumbPath+'" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100" height="100"></embed>';
        }else{
            toPrint +='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="100" height="100" align="middle">\
                <param name="movie" value="'+swfLocation+'?'+attrStr+'imgPath='+thumbPath+'" />\
                <param name="quality" value="high" />\
                <param name="play" value="true" />\
                <param name="loop" value="true" />\
                <param name="wmode" value="transparent" />\
                <param name="scale" value="exactfit" />\
                <param name="menu" value="true" />\
                <param name="devicefont" value="false" />\
                <param name="salign" value="" />\
                <param name="allowScriptAccess" value="sameDomain" />\
            </object>';
        }    
		toPrint +='</div>';
		
		var body = document.getElementsByTagName('BODY');
		if(body.length > 0){
			var cornerContainer = document.createElement('DIV'), divs;
			body[0].appendChild(cornerContainer);
			divs = document.getElementsByTagName('DIV');
			divs[divs.length - 1].innerHTML += toPrint;
		}
	}
	
	function changeAddCornerSize(setBig, fromBig){
			if(fromBig){
				cornerAdBigLoaded = true;
				if(setBig)
					setBig = false;
			}
			if(!cornerAdBigLoaded){
				setTimeout(function(){changeAddCornerSize(setBig, fromBig);}, 500);
			}else{
				var bigMovie 		= document.getElementById('bigCorner'),
					shortMovie 	= document.getElementById('shortCorner'),
					ad;
			
				if(bigMovie && shortMovie){
					if(setBig){
						bigMovie.style.top = '0px';
						shortMovie.style.top = '-1000px';
						
                        if (navigator.appName.indexOf("Microsoft") != -1) {
                            ad = window['cornerAd'];
                        } else {
                            ad = document['cornerAd'];
                        }
						
                        if(ad){
                            ad.nextStep();
                        }
					}else{
						bigMovie.style.top = '-1000px';
						shortMovie.style.top = '0px';
					}	
				}
			}	
	}