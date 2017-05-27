function require (file, callback) {
    var scripts = document.getElementsByTagName('script');
	
    var once = true;
    // DOM: Create the script element
    var script = document.createElement("script");
    script.async = true;
    // set the type attribute
    script.type = "application/javascript";
    // make the script element load file
    script.src = file;
    // finally insert the element to the body element in order to load the script
    //document.body.appendChild(script);
    
    script.onload = script.onreadystatechange = function () {
  		if (once && (!script.readyState || /loaded|complete/.test(script.readyState))) {
  			once = false;
  			callback();
  		}
    };
	scripts[0].parentNode.insertBefore(script, scripts[0]);

}

