var fontBag = [];

var mRunner = {
	title: 				 document.querySelector('.viewer .title'),
	bodyText: 		 document.querySelector('.viewer .bodyText'),
	titleDesc: 		 document.querySelector('.viewer .title .name'),
	bodyTextDesc:  document.querySelector('.viewer .bodyText .name'),

	clearHTML: function() {
		document.querySelector('html').className = '';
	},

	createAttr: function(i, j) {
		mRunner.title.setAttribute('attr-pos', i);
		mRunner.bodyText.setAttribute('attr-pos', j);
	},

	init: function() {
		var fonts;
		var jsonhttp = new XMLHttpRequest();
		jsonhttp.open("GET", 'src/json/families.json', true);
		jsonhttp.onreadystatechange = function() {
		 	if (jsonhttp.readyState == 4 && jsonhttp.status == 200) {
		  	fonts = JSON.parse(jsonhttp.responseText);
		  	for(var i = 0; i < fonts.length; i++) {
		  		fontBag[i] = fonts[i];
		  	}
		 	}
		};
		jsonhttp.send(null);
	},
		
	initFont: function(i, j) {
		var seenT = 0;
		var seenBT = 0;
  	if(!i && !j) {
	  	i = mRunner.title.getAttribute('attr-pos');
	  	j = mRunner.bodyText.getAttribute('attr-pos');	
	  	if(!mRunner.title.classList.contains('stay')) {
	  		do {
					i = Math.floor(Math.random()*727);
			  	mRunner.title.setAttribute('attr-pos', i);
	  		} while(fontBag[i].fontTitleSize == 0 || fontBag[i].seenT == 1);
	  	}
	  	if(!mRunner.bodyText.classList.contains('stay')) {
	  		do {
					j = Math.floor(Math.random()*727);
					mRunner.bodyText.setAttribute('attr-pos', j);
	  		} while(fontBag[j].fontBodySize == 0 || fontBag[j].seenBT == 1);
	  	}
  	}

  	// How many titles and body texts are already changed ?
  	for(var z = 0; z < fontBag.length; z++) {
			if(fontBag[z].seenT == 1)
				seenT += 1;
			if(fontBag[z].seenBT == 1)
				seenBT += 1;
  	}
  	console.log("Title done : " + seenT);
  	console.log("Body text done : " + seenBT);
  	// Delete the code above

	  WebFont.load({
	    google: {
	      families: [fontBag[i].family, fontBag[j].family]
	    }
  	});
		var emConversion = mRunner.emtopx(fontBag[i].fontTitleSize, fontBag[j].fontBodySize);
		mRunner.title.style.fontFamily = fontBag[i].family;
		mRunner.bodyText.style.fontFamily = fontBag[j].family;
		mRunner.title.style.fontSize = fontBag[i].fontTitleSize + "em";
		mRunner.bodyText.style.fontSize = fontBag[j].fontBodySize + "em";
		mRunner.bodyText.style.lineHeight = fontBag[j].lineHeight;
		mRunner.titleDesc.innerHTML = [
																		'<a href="https://www.google.com/fonts/specimen/',
																		fontBag[i].family,
																		'" target="_blank" alt="',
																		fontBag[i].family,
																		'on Google Font">',
																		fontBag[i].family,
																		'</a><br>Size: ',
																		emConversion[0],
																		'px<br>',
																//to delete after set
																		fontBag[i].seenT,
																		fontBag[i].seenBT
																	].join('');


		mRunner.bodyTextDesc.innerHTML = [
																				'<a href="https://www.google.com/fonts/specimen/',
																				fontBag[j].family,
																				'" target="_blank" alt="',
																				fontBag[j].family,
																				'on Google Font">',
																				fontBag[j].family,
																				'</a><br>Size: ',
																				emConversion[1],
																				'px<br>Line height: ',
																				Math.round(emConversion[1]*fontBag[j].lineHeight),
																				'px<br>',
																		//to delete after set
																				fontBag[j].seenT,
																				fontBag[j].seenBT
																			].join('');

		mRunner.fontInfo("title", fontBag[i].category, fontBag[i].popularity, fontBag[i].voxatypi, fontBag[i].variants);
		mRunner.fontInfo("bodytext", fontBag[j].category, fontBag[j].popularity, fontBag[j].voxatypi, fontBag[j].variants);
		mRunner.title.classList.add('active');
		mRunner.bodyText.classList.add('active');
	},

	keepTitle: function(){
		var stay = mRunner.title.classList;
		if(stay.contains('stay'))
			stay.remove('stay');
		else
			stay.add('stay');
	},

	keepBodyText: function(){
		var stay = mRunner.bodyText.classList;
		if(stay.contains('stay'))
			stay.remove('stay');
		else
			stay.add('stay');
	},

	fontInfo: function(type, category, popularity, voxatypi, variants) {
		for(var i = 0; i < variants.length; i++) {
			switch(variants[i]) {
				case "100":
					variants[i] = "Thin";
					break;
				case "100italic":
					variants[i] = "Thin italic";
					break;
				case "200":
					variants[i] = "Extra-light";
					break;
				case "200italic":
					variants[i] = "Extra-light italic";
					break;
				case "300":
					variants[i] = "Light";
					break;
				case "300italic":
					variants[i] = "Light italic";
					break;
				case "400":
					variants[i] = "Normal";
					break;
				case "400italic":
					variants[i] = "Italic";
					break;
				case "regular":
					variants[i] = "Normal";
					break;
				case "italic":
					variants[i] = "Italic";
					break;
				case "500":
					variants[i] = "Medium";
					break;
				case "500italic":
					variants[i] = "Medium italic";
					break;
				case "600":
					variants[i] = "Semi-bold";
					break;
				case "600italic":
					variants[i] = "Semi-bold italic";
					break;
				case "700":
					variants[i] = "Bold";
					break;
				case "700italic":
					variants[i] = "Bold italic";
					break;
				case "800":
					variants[i] = "Extra-bold";
					break;
				case "800italic":
					variants[i] = "Extra-bold italic";
					break;
				case "900":
					variants[i] = "Ultra-bold";
					break;
				case "900italic":
					variants[i] = "Ultra-bold italic";
					break;
			}
		}
		if(type == "title") {
			document.querySelector('.fontinfo .title .category .content')
				.innerHTML = category;
			document.querySelector('.fontinfo .title .popularity .content')
				.innerHTML = popularity;
			document.querySelector('.fontinfo .title .voxatypi .content')
				.innerHTML = voxatypi;
			document.querySelector('.fontinfo .title .variants .content')
				.innerHTML = variants.join(', ');
		} else if(type == "bodytext") {
			document.querySelector('.fontinfo .bodyText .category .content')
				.innerHTML = category;
			document.querySelector('.fontinfo .bodyText .popularity .content')
				.innerHTML = popularity;
			document.querySelector('.fontinfo .bodyText .voxatypi .content')
				.innerHTML = voxatypi;
			document.querySelector('.fontinfo .bodyText .variants .content')
				.innerHTML = variants.join(', ');
		}
	},

	refresh: function(){
		if(!mRunner.title.classList.contains('stay'))
			mRunner.title.classList.remove('active');
		if(!mRunner.bodyText.classList.contains('stay'))
			mRunner.bodyText.classList.remove('active');
		mRunner.clearHTML();
		mRunner.init();
	},

	reverser: function() {
		var reverser = [
			mRunner.title.getAttribute('attr-pos'),
			mRunner.bodyText.getAttribute('attr-pos')
		];
		mRunner.clearHTML();
		mRunner.createAttr(reverser[1], reverser[0]);
		mRunner.loadJSON(reverser[1], reverser[0]);
	},

	keyes: function(e) {
		if(e.keyCode == 32) {
			if(mRunner.title.classList.contains('stay') && mRunner.bodyText.classList.contains('stay'))
  			return;	
			mRunner.refresh();
		}
	},

	emtopx: function(title, body) {
		title *= 16;
		body *= 16;
		return [Math.round(title), Math.round(body)];
	}
	
};


/*var pocket = {
	openShortcut: document.addEventListener('keyup', function(e){
		if(e.keyCode == 13)
			pocket.open();
	}),

	savePocket: document.addEventListener('keyup', function(e){
		if (e.keyCode == 49 || e.keyCode == 50 || e.keyCode == 51 || e.keyCode == 52 || e.keyCode == 53) {
			var pocketNumb = '';
			switch(e.keyCode) {
				case 49:
					pocketNumb = 1;
					break;
				case 50:
					pocketNumb = 2;
					break;
				case 51:
					pocketNumb = 3;
					break;
				case 52:
					pocketNumb = 4;
					break;
				case 53:
					pocketNumb = 5;
					break;
			}
			var jsonhttp = new XMLHttpRequest();
			jsonhttp.open("GET", 'src/json/families.json', true);
			jsonhttp.onreadystatechange = function() {
			 	if (jsonhttp.readyState == 4 && jsonhttp.status == 200) {
			  	fonts = JSON.parse(jsonhttp.responseText);
					var span = document.createElement('span'),
							container = document.querySelector('.pocket.p' + pocketNumb);
					container.appendChild(span).setAttribute('class', 'content');
					var content = document.querySelector('.pocket.p' + pocketNumb + ' .content')
					content.innerHTML = '<span class="title">'
														+	fonts[mRunner.title.getAttribute('attr-pos')].family
														+ '</span><br><span class="bodyText">'
														+ fonts[mRunner.bodyText.getAttribute('attr-pos')].family
														+ '</span>';
					var pocket = {
						posTitle: 		mRunner.title.getAttribute('attr-pos'),
						title: 				fonts[mRunner.title.getAttribute('attr-pos')].family,
						posBodyText: 	mRunner.bodyText.getAttribute('attr-pos'),
						bodyText: 		fonts[mRunner.bodyText.getAttribute('attr-pos')].family
					};
					localStorage.setItem('pocket' + pocketNumb, JSON.stringify(pocket));
			  }
			};
			if(!document.querySelector('.storage .container .pocket').classList.contains('open'))
				pocket.open();
			jsonhttp.send(null);
		}
	}),

	init: function() {
		var pockets = document.querySelectorAll('.pocket');
		for(var i = 0; i < pockets.length+1; i++) {
			var fonts = JSON.parse(localStorage.getItem('pocket' + i));
			if(localStorage.getItem('pocket' + i)) {
				var span = document.createElement('span');
				var container = document.querySelector('.p' + i);
				container.appendChild(span).setAttribute('class', 'content');
				var content = document.querySelector('.p' + i + ' .content');
				content.innerHTML = '<span class="title">'
													+	fonts.title
													+ '</span><br><span class="bodyText">'
													+ fonts.bodyText
													+ '</span>';
			}	
		}
	},
	//open the pocket container
	open: function() {
		var pockets = document.querySelectorAll('.storage .container .pocket'),
				viewer = document.querySelector('.viewer'),
				offsetY = viewer.offsetHeight;
		for(var i = 0; i < pockets.length; i++) {
			if(!pockets[i].classList.contains('open')) {
				pockets[i].classList.add('open');
				viewer.style.height = (offsetY-100) + 'px';
				viewer.style["-webkit-transition"]	= 'all 0.5s';
				viewer.style["-moz-transition"] 		= 'all 0.5s';
				viewer.style["-o-transition"]				= 'all 0.5s';
				viewer.style.transition 						= 'all 0.5s';
			} else if(pockets[i].classList.contains('open')) {
				pockets[i].classList.remove('open');
				viewer.style.height = '100%';
				viewer.classList.remove('min');
			}
		}
	},

	load: function() {
		var pockets = document.querySelectorAll('.pocket');
		for(var i = 0; i < pockets.length; i++) {
			pockets[i].onclick = function(e) {
				var pocketDetect = this.getAttribute('data-pocket'),
						fonts = JSON.parse(localStorage.getItem('pocket' + pocketDetect));
				if(fonts.posTitle != mRunner.title.getAttribute('attr-pos') || fonts.posBodyText != mRunner.bodyText.getAttribute('attr-pos')) {
					if(!mRunner.title.classList.contains('stay') && mRunner.bodyText.classList.contains('stay')) {
						mRunner.title.classList.remove('active');
						mRunner.clearHTML();
						mRunner.createAttr(fonts.posTitle, mRunner.bodyText.getAttribute('attr-pos'));
						mRunner.loadJSON(fonts.posTitle, mRunner.bodyText.getAttribute('attr-pos'));
		  		} else if(mRunner.title.classList.contains('stay') && !mRunner.bodyText.classList.contains('stay')) {
						mRunner.bodyText.classList.remove('active');
						mRunner.clearHTML();
						mRunner.createAttr(mRunner.title.getAttribute('attr-pos'), fonts.posBodyText);
						mRunner.loadJSON(mRunner.title.getAttribute('attr-pos'), fonts.posBodyText);
		  		} else if(!mRunner.title.classList.contains('stay') && !mRunner.bodyText.classList.contains('stay')) {
						mRunner.title.classList.remove('active');
						mRunner.bodyText.classList.remove('active');
						mRunner.clearHTML();
						mRunner.createAttr(fonts.posTitle, fonts.posBodyText);
						mRunner.loadJSON(fonts.posTitle, fonts.posBodyText);
		  		}
				}
			};
		}
	}

};*/

var action = {
	openAbout: function(e) {
		e.preventDefault();
		if(!document.querySelector('.about').classList.contains('open'))
			document.querySelector('.about').classList.add('open');
	},

	closeAbout: function(e) {
		e.preventDefault();
		if(document.querySelector('.about').classList.contains('open'))
			document.querySelector('.about').classList.remove('open');
	},

	editLeft: function(e) {
		e.preventDefault();
		if(!document.querySelector('.viewer .container').classList.contains('left')) {
			document.querySelector('.viewer .container').className = 'container left';
			document.querySelector('.edit-left').classList.add('active');
			document.querySelector('.edit-center').classList.remove('active');
		}
	},

	editCenter: function(e) {
		e.preventDefault();
		if(!document.querySelector('.viewer .container').classList.contains('center')) {
			document.querySelector('.viewer .container').className = 'container center';
			document.querySelector('.edit-center').classList.add('active');
			document.querySelector('.edit-left').classList.remove('active');
		}
	},

	showInfoTitle: function() {
		if(!document.querySelector('.fontinfo .title').classList.contains('active'))
			document.querySelector('.fontinfo .title').classList.add('active');
		else
			document.querySelector('.fontinfo .title').classList.remove('active');
	},

	showInfoBodyText: function() {
		if(!document.querySelector('.fontinfo .bodyText').classList.contains('active'))
			document.querySelector('.fontinfo .bodyText').classList.add('active');
		else
			document.querySelector('.fontinfo .bodyText').classList.remove('active');
	},

	reverser: function(e) {
		e.preventDefault;
		mRunner.reverser;
	},

	keyes: function(e) {
		if(e.keyCode == 27) {
			if(document.querySelector('.about').classList.contains('open'))
				document.querySelector('.about').classList.remove('open');
			else if (document.querySelector('.storage .container .pocket').classList.contains('open'))
				pocket.open();
		} else if(e.keyCode == 65) {
			if(!document.querySelector('.about').classList.contains('open'))
				document.querySelector('.about').classList.add('open');
			else if(document.querySelector('.about').classList.contains('open'))
				document.querySelector('.about').classList.remove('open');
		} else if(e.keyCode == 82) {
			mRunner.reverser();
		}
	}
};

window.onload = function(){
	clickCloseAbout:  document.querySelector('.about .close').addEventListener('click', action.closeAbout);
	clickOpenAbout: 	document.querySelector('.btn-about').addEventListener('click', action.openAbout);
	clickTitle: 	 		document.querySelector('.viewer .title').addEventListener('click', mRunner.keepTitle);
	clickBodyText: 		document.querySelector('.viewer .bodyText').addEventListener('click', mRunner.keepBodyText);
	clickLeft: 				document.querySelector('.edit-left').addEventListener('click', action.editLeft);
	clickCenter: 			document.querySelector('.edit-center').addEventListener('click', action.editCenter);
	clickReverse: 		document.querySelector('.reverse').addEventListener('click', mRunner.reverser);
	hoverTitle: 			mRunner.title.addEventListener('mouseover', action.showInfoTitle);
	outTitle: 				mRunner.title.addEventListener('mouseout', action.showInfoTitle);
	hoverBodyText: 		mRunner.bodyText.addEventListener('mouseover', action.showInfoBodyText);
	outBodyText: 			mRunner.bodyText.addEventListener('mouseout', action.showInfoBodyText);
	keyRefresh: 			document.addEventListener('keyup', mRunner.keyes);
	keyClose: 	 			document.addEventListener('keyup', action.keyes);
	keyAbout: 	 			document.addEventListener('keyup', action.keyes);
	keyReverse: 			document.addEventListener('keyup', action.keyes);
	//pocket.init();
	//pocket.load();
	mRunner.createAttr('', '');
	mRunner.init();
	mRunner.initFont('','');
};