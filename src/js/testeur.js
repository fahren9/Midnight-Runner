var fontBag = [];

var testeur = {

	load: function() {


		for(var i = 728; i < fontBag.length; i++) {

		  WebFont.load({
		    google: {
		      families: [fontBag[i].family]
		    }
	  	});

			var h1 = document.createElement('h1'),
					h1Container = document.querySelector('.testeur'),
					p = document.createElement('p'),
					pContainer = document.querySelector('.testeur');

			h1Container.appendChild(h1).setAttribute('class', 'testeur--title p' + i);
			pContainer.appendChild(p).setAttribute('class', 'testeur--bodytext p' + i);

			var thatTitle = document.querySelector('.testeur--title.p' + i);
			var thatBodytext = document.querySelector('.testeur--bodytext.p' + i);

			thatTitle.style.fontFamily = fontBag[i].family;
			thatTitle.style.fontSize = fontBag[i].fontTitleSize;
			thatBodytext.style.fontFamily = fontBag[i].family;
			thatBodytext.style.fontSize = fontBag[i].fontBodySize;
			thatBodytext.style.lineHeight = fontBag[i].lineHeight;
			thatTitle.innerHTML = "Midnight Runner";
			thatBodytext.innerHTML = fontBag[i].id + ". We reached the city of Warhoon after some three days march and I was immediately cast into a dungeon and heavily chained to the floor and walls. Food was brought me at intervals but owing to the utter darkness of the place I do not know whether I lay there days, or weeks, or months.";

		}

	},

	init: function() {
		var fonts,
				jsonhttp = new XMLHttpRequest();
		jsonhttp.open("GET", 'src/json/families.json', true);
		jsonhttp.onreadystatechange = function() {
		 	if (jsonhttp.readyState == 4 && jsonhttp.status == 200) {
		  	fonts = JSON.parse(jsonhttp.responseText);
		  	for(var i = 0; i < fonts.length; i++) {
		  		fontBag[i] = fonts[i];
		  	}
				testeur.load();
		 	}
		};
		jsonhttp.send(null);
	}

}

window.onload = function(){
	testeur.init();
};