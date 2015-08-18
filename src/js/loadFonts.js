var mRunner = {

	title: 				document.querySelector('.viewer .title'),
	bodyText: 		document.querySelector('.viewer .bodyText'),
	titleDesc: 		document.querySelector('.viewer .title .name'),
	bodyTextDesc: document.querySelector('.viewer .bodyText .name'),

	keepTitle: document.querySelector('.viewer .title').addEventListener('click', function(){
		var stay = mRunner.title.classList;
		if(stay.contains('stay') == true) {
			stay.remove('stay');
		} else {
			stay.add('stay');
		}
	}),

	keepBodyText: document.querySelector('.viewer .bodyText').addEventListener('click', function(){
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
		if(e.keyCode == 13) {
			if(mRunner.title.classList.contains('stay') == false) {
				mRunner.title.classList.remove('active');
  		}
			if(mRunner.bodyText.classList.contains('stay') == false) {
				mRunner.bodyText.classList.remove('active');
  		}
			document.querySelector("html").className = '';
			mRunner.loadFonts();
		}
	}),

	createAttr: function(i, j) {
		mRunner.title.setAttribute('attr-pos', i);
		mRunner.bodyText.setAttribute('attr-pos', j);
	},

	loadFonts: function() {
		mRunner.loadJSON();
	},
		
	loadJSON: function(i, j) {
		var fonts = {};
		var jsonhttp = new XMLHttpRequest();
		jsonhttp.open("GET", 'src/json/families.json', true);
		jsonhttp.onreadystatechange = function() {
		 	if (jsonhttp.readyState == 4 && jsonhttp.status == 200) {
		  	fonts = JSON.parse(jsonhttp.responseText);
		  	if(!i && !j) {
			  	i = mRunner.title.getAttribute('attr-pos');
			  	j = mRunner.bodyText.getAttribute('attr-pos');	
			  	if(mRunner.title.classList.contains('stay') == false) {
						i = Math.floor(Math.random()*727);
				  	mRunner.title.setAttribute('attr-pos', i);
			  	}
			  	if(mRunner.bodyText.classList.contains('stay') == false) {
						j = Math.floor(Math.random()*727);
						mRunner.bodyText.setAttribute('attr-pos', j);
			  	}
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
		jsonhttp.send(null);	
	},

	emtopx: function(title, body) {
		title *= 16;
		body *= 16;
		return [title, body];
	}
	
};

var storage = {
	openShortcut: document.addEventListener('keypress', function(e){
		if(e.keyCode == 32) {
			storage.openContainer();
		}
	}),

	inPocket: document.addEventListener('keypress', function(e){
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
					var span = document.createElement('span');
					var container = document.querySelector('.pocket.p' + pocketNumb);
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
						storage.openContainer();	
					}
					
			  }
			};
			jsonhttp.send(null);
		}
	}),

	openContainer: function() {
		var viewer = document.querySelector('.viewer');
		var stoContainer = document.querySelector('.storage .container');
		if(stoContainer.classList.contains('open') == false) {
			stoContainer.classList.add('open');
			var offsetY = viewer.offsetHeight;
			viewer.style.height = (offsetY-100) + 'px';
			viewer.style["-webkit-transition"]	= 'all 0.5s';
			viewer.style["-moz-transition"] 		= 'all 0.5s';
			viewer.style["-o-transition"]				= 'all 0.5s';
			viewer.style.transition 						= 'all 0.5s';
		} else if(stoContainer.classList.contains('open') == true) {
			stoContainer.classList.remove('open');
			viewer.style.height = '100%';
			viewer.classList.remove('min');
		}
	}
};

window.onload = function() {
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
};

var pockets = document.querySelectorAll('.pocket');
for(var i = 0; i < pockets.length; i++) {
	pockets[i].onclick = function(e) {
		var pocketDetect = this.getAttribute('data-pocket');
		var fonts = JSON.parse(localStorage.getItem('pocket' + pocketDetect));
		if(fonts.posTitle != mRunner.title.getAttribute('attr-pos') || fonts.posBodyText != mRunner.bodyText.getAttribute('attr-pos')) {
			mRunner.createAttr(fonts.posTitle, fonts.posBodyText);
			mRunner.loadJSON(fonts.posTitle, fonts.posBodyText);
		}
	}
}

mRunner.createAttr('', '');
mRunner.loadFonts();