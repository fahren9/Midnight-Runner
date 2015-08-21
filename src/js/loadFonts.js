var mRunner = {
	title: 				 document.querySelector('.viewer .title'),
	bodyText: 		 document.querySelector('.viewer .bodyText'),
	titleDesc: 		 document.querySelector('.viewer .title .name'),
	bodyTextDesc:  document.querySelector('.viewer .bodyText .name'),
	clearHTML: 		 document.querySelector("html").className = '',

	createAttr: function(i, j) {
		mRunner.title.setAttribute('attr-pos', i);
		mRunner.bodyText.setAttribute('attr-pos', j);
	},

	init: function() {
		mRunner.loadJSON();
	},
		
	loadJSON: function(i, j) {
		  	var seenT = 0;
		  	var seenBT = 0;
		var fonts = {},
				jsonhttp = new XMLHttpRequest();
		jsonhttp.open("GET", 'src/json/families.json', true);
		jsonhttp.onreadystatechange = function() {
		 	if (jsonhttp.readyState == 4 && jsonhttp.status == 200) {
		  	fonts = JSON.parse(jsonhttp.responseText);
		  	if(!i && !j) {
			  	i = mRunner.title.getAttribute('attr-pos');
			  	j = mRunner.bodyText.getAttribute('attr-pos');	
			  	if(!mRunner.title.classList.contains('stay')) {
			  		do {
							i = Math.floor(Math.random()*727);
					  	mRunner.title.setAttribute('attr-pos', i);
			  		} while(fonts[i].fontTitleSize == 0 || fonts[i].seenT == 1);
			  	}
			  	if(!mRunner.bodyText.classList.contains('stay')) {
			  		do {
							j = Math.floor(Math.random()*727);
							mRunner.bodyText.setAttribute('attr-pos', j);
			  		} while(fonts[j].fontBodySize == 0 || fonts[j].seenBT == 1);
			  	}
		  	}

		  	// How many titles and body texts are already changed ?
		  	for(var z = 0; z < fonts.length; z++) {
					if(fonts[z].seenT == 1) {
						seenT += 1;
					}
					if(fonts[z].seenBT == 1) {
						seenBT += 1;
					}
		  	}
		  	console.log("Title done : " + seenT + " — Body text done : " + seenBT);
		  	// Delete the code above

			  WebFont.load({
			    google: {
			      families: [fonts[i].family, fonts[j].family]
			    }
		  	});
				var emConversion = mRunner.emtopx(fonts[i].fontTitleSize, fonts[j].fontBodySize);
				mRunner.title.style.fontFamily = fonts[i].family;
				mRunner.bodyText.style.fontFamily = fonts[j].family;
				mRunner.title.style.fontSize = fonts[i].fontTitleSize + "em";
				mRunner.bodyText.style.fontSize = fonts[j].fontBodySize + "em";
				mRunner.titleDesc.innerHTML = '<a href="https://www.google.com/fonts/specimen/'
														+ fonts[i].family
														+ '" target="_blank" alt="'
														+ fonts[i].family
														+ ' on Google Font">'
														+ fonts[i].family
														+ '</a><br>'
														+ emConversion[0]
														+ 'px '
													//to delete after set
														+ fonts[i].seenT + fonts[i].seenBT;
				mRunner.bodyTextDesc.innerHTML = '<a href="https://www.google.com/fonts/specimen/'
														+ fonts[j].family
														+ '" target="_blank" alt="'
														+ fonts[j].family
														+ ' on Google Font">'
														+ fonts[j].family
														+ '</a><br>'
														+ emConversion[1]
														+ 'px '
													//to delete after set
														+ fonts[j].seenT + fonts[j].seenBT;
				mRunner.title.classList.add('active');
				mRunner.bodyText.classList.add('active');
		 	}
		};
		jsonhttp.send(null);	
	},

	keepTitle: function(){
		var stay = mRunner.title.classList;
		if(stay.contains('stay')) {
			stay.remove('stay');
		} else {
			stay.add('stay');
		}
	},

	keepBodyText: function(){
		var stay = mRunner.bodyText.classList;
		if(stay.contains('stay')) {
			stay.remove('stay');
		} else {
			stay.add('stay');
		}
	},

	refresh: function(e){
		if(mRunner.title.classList.contains('stay') && mRunner.bodyText.classList.contains('stay')) {
  		return;	
  	}
		if(e.keyCode == 13) {
			if(!mRunner.title.classList.contains('stay')) {
				mRunner.title.classList.remove('active');
  		}
			if(!mRunner.bodyText.classList.contains('stay')) {
				mRunner.bodyText.classList.remove('active');
  		}
			document.querySelector("html").className = '';
			mRunner.init();
		}
	},

	emtopx: function(title, body) {
		title *= 16;
		body *= 16;
		return [title, body];
	}
	
};


var pocket = {
	openShortcut: document.addEventListener('keypress', function(e){
		if(e.keyCode == 32) {
			pocket.open();
		}
	}),

	savePocket: document.addEventListener('keypress', function(e){
		if (e.keyCode == 49 || e.keyCode == 50 || e.keyCode == 51 || e.keyCode == 52 || e.keyCode == 53){
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
					if(!document.querySelector('.storage .container').classList.contains('open')) {
						pocket.openContainer();
					}
					
			  }
			};
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
	//open = fouiller -> open the pocket container
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
						mRunner.clearHTML;
						mRunner.createAttr(fonts.posTitle, mRunner.bodyText.getAttribute('attr-pos'));
						mRunner.loadJSON(fonts.posTitle, mRunner.bodyText.getAttribute('attr-pos'));
		  		} else if(mRunner.title.classList.contains('stay') && !mRunner.bodyText.classList.contains('stay')) {
						mRunner.bodyText.classList.remove('active');
						mRunner.clearHTML;
						mRunner.createAttr(mRunner.title.getAttribute('attr-pos'), fonts.posBodyText);
						mRunner.loadJSON(mRunner.title.getAttribute('attr-pos'), fonts.posBodyText);
		  		} else if(!mRunner.title.classList.contains('stay') && !mRunner.bodyText.classList.contains('stay')) {
						mRunner.title.classList.remove('active');
						mRunner.bodyText.classList.remove('active');
						mRunner.clearHTML;
						mRunner.createAttr(fonts.posTitle, fonts.posBodyText);
						mRunner.loadJSON(fonts.posTitle, fonts.posBodyText);
		  		}
				}
			}
		}
	}

};

window.onload = function(){
	clickTitle: 	 document.querySelector('.viewer .title').addEventListener('click', mRunner.keepTitle);
	clickBodyText: document.querySelector('.viewer .bodyText').addEventListener('click', mRunner.keepBodyText);
	handleRefresh: document.addEventListener('keypress', mRunner.refresh);
	pocket.init();
	pocket.load();
	mRunner.createAttr('', '');
	mRunner.init();
};