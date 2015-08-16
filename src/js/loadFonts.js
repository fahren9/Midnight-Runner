var mRunner = (function (){

	'use strict';

	var title 				= document.querySelector('.title'),
			bodyText 			= document.querySelector('.bodyText'),
			titleDesc 		= document.querySelector('.title .name'),
			bodyTextDesc 	= document.querySelector('.bodyText .name');

	var fonts = {};

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", 'src/json/families.json', true);
	xmlhttp.onreadystatechange = function () {
	 	if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
	  	fonts = JSON.parse(xmlhttp.responseText);

			var i = Math.floor(Math.random()*727);
			var j = Math.floor(Math.random()*727);
			
		  WebFont.load({
		    google: {
		      families: [fonts[i].family, fonts[j].family]
		    }
	  	});

			title.style.fontFamily = fonts[i].family;
			bodyText.style.fontFamily = fonts[j].family;

			var emConversion = emtopx(fonts[i].fontTitleSize, fonts[j].fontBodySize);

			titleDesc.innerHTML = '<a href="https://www.google.com/fonts/specimen/'
													+ fonts[i].family
													+ '" target="_blank" alt="'
													+ fonts[i].family
													+ ' on Google Font">'
													+ fonts[i].family
													+ '</a><br>'
													+ emConversion[0]
													+ 'px';
			bodyTextDesc.innerHTML = '<a href="https://www.google.com/fonts/specimen/'
													+ fonts[j].family
													+ '" target="_blank" alt="'
													+ fonts[j].family
													+ ' on Google Font">'
													+ fonts[j].family
													+ '</a><br>'
													+ emConversion[1]
													+ 'px';

			title.classList.add('active');
			bodyText.classList.add('active');
	 	}
	};
	xmlhttp.send(null);

});

function emtopx(title, body) {
	title *= 16;
	body *= 16;
	return [title, body];
}

mRunner();