var mRunner = (function (){

	'use strict';

	var title = document.querySelector('.title');
	var content = document.querySelector('.content');

	var fonts = {};

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", 'src/json/fullFamily.json', true);
	xmlhttp.onreadystatechange = function () {
	 	if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
	  	fonts = JSON.parse(xmlhttp.responseText);

			var i = Math.floor(Math.random()*727);
			var j = Math.floor(Math.random()*727);

			/*if(fonts[i].category === "sans-serif") {

			} else {

			}*/
			
		  WebFont.load({
		    google: {
		      families: [fonts[i].family, fonts[j].family]
		    }
	  	});

			title.style.fontFamily = fonts[i].family;
			content.style.fontFamily = fonts[j].family;

			title.classList.add('active');
			content.classList.add('active');
	 	}
	};
	xmlhttp.send(null);

});

mRunner();