var mRunner = {

	title: 				document.querySelector('.title'),
	bodyText: 		document.querySelector('.bodyText'),
	titleDesc: 		document.querySelector('.title .name'),
	bodyTextDesc: document.querySelector('.bodyText .name'),

	keepTitle: document.querySelector('.title').addEventListener('click', function(){
		var stay = mRunner.title.classList;
		if(stay.contains('stay') == true) {
			stay.remove('stay');
		} else {
			stay.add('stay');
		}
	}),

	keepBodyText: document.querySelector('.bodyText').addEventListener('click', function(){
		var stay = mRunner.bodyText.classList;
		if(stay.contains('stay') == true) {
			stay.remove('stay');
		} else {
			stay.add('stay');
		}
	}),

	refresh: document.addEventListener('keypress', function(e){
		if(mRunner.title.classList.contains('stay') == true && mRunner.bodyText.classList.contains('stay') == true) {
  		return;	
  	}
		if(e.keyCode == 32 || e.keyCode == 13) {
			document.querySelector("html").className = '';
			mRunner.loadFonts();
		}
	}),

	createAttr: 	function() {
		mRunner.title.setAttribute('attr-pos', '');
		mRunner.bodyText.setAttribute('attr-pos', '');
	},

	loadFonts: 	function() {
		var fonts 	= {},
				xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", 'src/json/families.json', true);
		xmlhttp.onreadystatechange = function() {
		 	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		  	fonts = JSON.parse(xmlhttp.responseText);
		  	var i = mRunner.title.getAttribute('attr-pos');
		  	var j = mRunner.bodyText.getAttribute('attr-pos');
		  	if(mRunner.title.classList.contains('stay') == false) {
					i = Math.floor(Math.random()*727);
			  	mRunner.title.setAttribute('attr-pos', i);
		  	}
		  	if(mRunner.bodyText.classList.contains('stay') == false) {
					j = Math.floor(Math.random()*727);
					mRunner.bodyText.setAttribute('attr-pos', j);
		  	}

			  WebFont.load({
			    google: {
			      families: [fonts[i].family, fonts[j].family]
			    }
		  	});
				var emConversion = mRunner.emtopx(fonts[i].fontTitleSize, fonts[j].fontBodySize);
				mRunner.title.style.fontFamily = fonts[i].family;
				mRunner.bodyText.style.fontFamily = fonts[j].family;
				mRunner.titleDesc.innerHTML = '<a href="https://www.google.com/fonts/specimen/'
														+ fonts[i].family
														+ '" target="_blank" alt="'
														+ fonts[i].family
														+ ' on Google Font">'
														+ fonts[i].family
														+ '</a><br>'
														+ emConversion[0]
														+ 'px';
				mRunner.bodyTextDesc.innerHTML = '<a href="https://www.google.com/fonts/specimen/'
														+ fonts[j].family
														+ '" target="_blank" alt="'
														+ fonts[j].family
														+ ' on Google Font">'
														+ fonts[j].family
														+ '</a><br>'
														+ emConversion[1]
														+ 'px';
				mRunner.title.classList.add('active');
				mRunner.bodyText.classList.add('active');
		 	}
		};
		xmlhttp.send(null);	
	},

	emtopx: function(title, body) {
		title *= 16;
		body *= 16;
		return [title, body];
	}
	
};

mRunner.createAttr();
mRunner.loadFonts();