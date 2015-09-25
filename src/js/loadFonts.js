'use strict';
// version authentification
var vAuth = 201509221430;
// font repo
var fontBag = [];

var viewer = {
	title: 				 document.querySelector('.fontzone--title'),
	bodyText: 		 document.querySelector('.fontzone--bodytext'),
	titleDesc: 		 document.querySelector('.fontzone--title--name'),
	bodyTextDesc:  document.querySelector('.fontzone--bodytext--name'),

	clearHTML: function() {
		document.querySelector('html').className = '';
	},

	createAttr: function(i, j) {
		viewer.title.setAttribute('attr-pos', i);
		viewer.bodyText.setAttribute('attr-pos', j);
	},
		
	openBag: function(i, j) {
		if(!i && !j) {
	  	i = viewer.title.getAttribute('attr-pos');
	  	j = viewer.bodyText.getAttribute('attr-pos');	
	  	if(!viewer.title.classList.contains('stay')) {
	  		do {
					i = Math.floor(Math.random()*727);
			  	viewer.title.setAttribute('attr-pos', i);
	  		} while(fontBag[i].fontTitleSize == 0);
	  	}
	  	if(!viewer.bodyText.classList.contains('stay')) {
	  		do {
					j = Math.floor(Math.random()*727);
					viewer.bodyText.setAttribute('attr-pos', j);
	  		} while(fontBag[j].fontBodySize == 0);
	  	}
  	}
  	/* How many titles and body texts are already changed ?
		var seenT 	= 0;
		var seenBT  = 0;
  	for(var z = 0; z < fontBag.length; z++) {
			if(fontBag[z].seenT == 1)
				seenT += 1;
			if(fontBag[z].seenBT == 1)
				seenBT += 1;
  	}
  	console.log("Title done : " + seenT);
  	console.log("Body text done : " + seenBT);
  	* Delete the code above */

	  WebFont.load({
	    google: {
	      families: [fontBag[i].family, fontBag[j].family]
	    }
  	});

		var emConversion = viewer.emtopx(fontBag[i].fontTitleSize, fontBag[j].fontBodySize);

		viewer.title.style.fontFamily = fontBag[i].family;
		viewer.bodyText.style.fontFamily = fontBag[j].family;
		viewer.title.style.fontSize = fontBag[i].fontTitleSize + "em";
		viewer.bodyText.style.fontSize = fontBag[j].fontBodySize + "em";
		viewer.bodyText.style.lineHeight = fontBag[j].lineHeight;

		viewer.titleDesc.innerHTML =
		[
			'<a href="https://www.google.com/fonts/specimen/',
			fontBag[i].family,
			'" target="_blank" alt="',
			fontBag[i].family,
			'on Google Font">',
			fontBag[i].family,
			'</a><br>Size: ',
			emConversion[0],
			'px<br>'
		].join('');

		viewer.bodyTextDesc.innerHTML = 
		[
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
			'px<br>'
		].join('');

		viewer.fontInfo("title", fontBag[i].category, fontBag[i].popularity, fontBag[i].voxatypi, fontBag[i].variants);
		viewer.fontInfo("bodytext", fontBag[j].category, fontBag[j].popularity, fontBag[j].voxatypi, fontBag[j].variants);
		viewer.title.classList.add('active');
		viewer.bodyText.classList.add('active');
	},

	historic: function(action) {
		var undo = [],
				redo = [];
		if(!localStorage.getItem('toUndo')) {
			localStorage.setItem('toUndo', '');
			localStorage.setItem('toRedo', '');
		} else {
			undo = JSON.parse(localStorage.getItem('toUndo'));
			redo = JSON.parse(localStorage.getItem('toRedo'));	
		}
		if(action == 'save') {
			redo = [];
			var actualPairing = {
				posTitle: 		viewer.title.getAttribute('attr-pos'),
				title: 				fontBag[viewer.title.getAttribute('attr-pos')].family,
				posBodyText: 	viewer.bodyText.getAttribute('attr-pos'),
				bodyText: 		fontBag[viewer.bodyText.getAttribute('attr-pos')].family
			};
			undo.push(actualPairing);
			localStorage.setItem('toUndo', JSON.stringify(undo));
			localStorage.setItem('toRedo', JSON.stringify(redo));
		} else if(action == 'undo') {
			var index = undo.length - 1;
			if(index > 0) {
				viewer.clearHTML();
				viewer.openBag(undo[index - 1].posTitle, undo[index - 1].posBodyText);
				redo.push(undo[index]);
				undo.pop();
				localStorage.setItem('toUndo', JSON.stringify(undo));
				localStorage.setItem('toRedo', JSON.stringify(redo));
			}
		} else if(action == 'redo') {
			var index = redo.length - 1;
			if(index > -1) {
				viewer.clearHTML();
				viewer.openBag(redo[index].posTitle, redo[index].posBodyText);
				undo.push(redo[index]);
				redo.pop();
				localStorage.setItem('toUndo', JSON.stringify(undo));
				localStorage.setItem('toRedo', JSON.stringify(redo));
			}
		}
		if(undo[1]) {
			document.querySelector('.edition--undo').classList.add('active');
		} else {
			document.querySelector('.edition--undo').className = 'edition--undo';
		}
		if(redo[0]) {
			document.querySelector('.edition--redo').classList.add('active');
		} else {
			document.querySelector('.edition--redo').className = 'edition--redo';
		}
	},

	noSmooth: function(e){
		e.preventDefault();
		var title = document.querySelector('.fontzone--title--content').classList;
		var bodytext = document.querySelector('.fontzone--bodytext--content').classList;
		if(title.contains('nosmooth')) {
			title.remove('nosmooth');
			bodytext.remove('nosmooth');
			document.querySelector('.edition--nosmooth').classList.remove('active');
		} else {
			title.add('nosmooth');
			bodytext.add('nosmooth');
			document.querySelector('.edition--nosmooth').classList.add('active');
		}
		document.activeElement.blur();
	},

	keepTitle: function(){
		var title = viewer.title.classList;
		if(title.contains('stay'))
			title.remove('stay');
		else
			title.add('stay');
	},

	keepBodyText: function(){
		var bodyText = viewer.bodyText.classList;
		if(bodyText.contains('stay'))
			bodyText.remove('stay');
		else
			bodyText.add('stay');
	},

	fontInfo: function(type, category, popularity, voxatypi, variants) {
		var data = {
			"100"				: "Thin",
			"100italic" : "Thin italic",
			"200"				: "Extra-light",
			"200italic" : "Extra-light italic",
			"300"				: "Light",
			"300italic" : "Light italic",
			"400"				: "Normal",
			"400italic" : "Italic",
			"regular"		: "Normal",
			"italic"		: "Italic",
			"500"				: "Medium",
			"500italic" : "Medium italic",
			"600"				: "Semi-bold",
			"600italic" : "Semi-bold italic",
			"700"				: "Bold",
			"700italic" : "Bold italic",
			"800"				: "Extra-bold",
			"800italic" : "Extra-bold italic",
			"900"				: "Ultra-bold",
			"900italic" : "Ultra-bold italic"
		};

		var eachVariant = [];

		for(var i = 0; i < variants.length; i++) {
			eachVariant[i] = data[variants[i]];
		}

		if(type == "title") {
			document.querySelector('.fontinfo--title--category--content')
				.innerHTML = category;
			document.querySelector('.fontinfo--title--popularity--content')
				.innerHTML = popularity;
			document.querySelector('.fontinfo--title--voxatypi--content')
				.innerHTML = voxatypi;
			document.querySelector('.fontinfo--title--variants--content')
				.innerHTML = eachVariant.join(', ');
		} else if(type == "bodytext") {
			document.querySelector('.fontinfo--bodytext--category--content')
				.innerHTML = category;
			document.querySelector('.fontinfo--bodytext--popularity--content')
				.innerHTML = popularity;
			document.querySelector('.fontinfo--bodytext--voxatypi--content')
				.innerHTML = voxatypi;
			document.querySelector('.fontinfo--bodytext--variants--content')
				.innerHTML = eachVariant.join(', ');
		}
	},

	refresh: function(){
		if(!viewer.title.classList.contains('stay'))
			viewer.title.classList.remove('active');
		if(!viewer.bodyText.classList.contains('stay'))
			viewer.bodyText.classList.remove('active');
		viewer.clearHTML();
		viewer.openBag('','');
		viewer.historic('save');
	},

	switch: function() {
		var altern = [
			viewer.title.getAttribute('attr-pos'),
			viewer.bodyText.getAttribute('attr-pos')
		];
		viewer.clearHTML();
		viewer.createAttr(altern[1], altern[0]);
		viewer.openBag(altern[1], altern[0]);
		viewer.historic('save');
	},

	emtopx: function(title, body) {
		title *= 16;
		body *= 16;
		return [Math.round(title), Math.round(body)];
	},

	init: function() {
		// (!) TO DELETE AT LAUNCH
		if(!localStorage.getItem('vAuth') === vAuth) {
			fontBag = JSON.parse(localStorage.getItem('fontBag'));
			viewer.openBag();
		} else {
			var fonts,
					jsonhttp = new XMLHttpRequest();
			jsonhttp.open("GET", 'src/json/families.json', true);
			jsonhttp.onreadystatechange = function() {
			 	if (jsonhttp.readyState == 4 && jsonhttp.status == 200) {
			  	fonts = JSON.parse(jsonhttp.responseText);
			  	for(var i = 0; i < fonts.length; i++) {
			  		fontBag[i] = fonts[i];
			  	}
					localStorage.setItem('fontBag', JSON.stringify(fontBag));
					localStorage.setItem('vAuth', JSON.stringify(vAuth));
					viewer.openBag();
					viewer.historic('save');
			 	}
			};
			jsonhttp.send(null);	
		}
	}
	
};


var pocket = {
	storage: function(pocketNumb) {
		var self = this,
				span = document.createElement('span'),
				container = document.querySelector('.storage--pocket.p' + pocketNumb);
		container.appendChild(span).setAttribute('class', 'storage--pocket--content');
		var content = document.querySelector('.storage--pocket.p' + pocketNumb + ' .storage--pocket--content')
		content.innerHTML = [
													'<span class="storage--pocket--content--title">',
													fontBag[viewer.title.getAttribute('attr-pos')].family,
													'</span><br><span class="storage--pocket--content--bodytext">',
													fontBag[viewer.bodyText.getAttribute('attr-pos')].family,
													'</span>'
												].join('');
		var pocket = {
			posTitle: 		viewer.title.getAttribute('attr-pos'),
			title: 				fontBag[viewer.title.getAttribute('attr-pos')].family,
			posBodyText: 	viewer.bodyText.getAttribute('attr-pos'),
			bodyText: 		fontBag[viewer.bodyText.getAttribute('attr-pos')].family
		};
		localStorage.setItem('pocket' + pocketNumb, JSON.stringify(pocket));
		if(!document.querySelector('.p' + pocketNumb).classList.contains('open')) {
			self.open();
		}
	},

	//open the pocket container
	open: function() {
		var pockets = document.querySelectorAll('.storage--pocket'),
				viewer  = document.querySelector('.viewer'),
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
		var pockets = document.querySelectorAll('.storage--pocket');
		for(var i = 0; i < pockets.length; i++) {
			pockets[i].onclick = function(e) {
				var pocketDetect = this.getAttribute('data-pocket'),
						fonts = JSON.parse(localStorage.getItem('pocket' + pocketDetect));
				if(fonts.posTitle != viewer.title.getAttribute('attr-pos') || fonts.posBodyText != viewer.bodyText.getAttribute('attr-pos')) {
					if(!viewer.title.classList.contains('stay') && viewer.bodyText.classList.contains('stay')) {
						viewer.title.classList.remove('active');
						viewer.clearHTML();
						viewer.createAttr(fonts.posTitle, viewer.bodyText.getAttribute('attr-pos'));
						viewer.openBag(fonts.posTitle, viewer.bodyText.getAttribute('attr-pos'));
						viewer.historic('save');
		  		} else if(viewer.title.classList.contains('stay') && !viewer.bodyText.classList.contains('stay')) {
						viewer.bodyText.classList.remove('active');
						viewer.clearHTML();
						viewer.createAttr(viewer.title.getAttribute('attr-pos'), fonts.posBodyText);
						viewer.openBag(viewer.title.getAttribute('attr-pos'), fonts.posBodyText);
						viewer.historic('save');
		  		} else if(!viewer.title.classList.contains('stay') && !viewer.bodyText.classList.contains('stay')) {
						viewer.title.classList.remove('active');
						viewer.bodyText.classList.remove('active');
						viewer.clearHTML();
						viewer.createAttr(fonts.posTitle, fonts.posBodyText);
						viewer.openBag(fonts.posTitle, fonts.posBodyText);
						viewer.historic('save');
		  		}
				}
			};
		}
	},

	keyes: function(e) {
		if(e.keyCode == 32) {
			pocket.open();
		} else if(e.keyCode == 49 || e.keyCode == 50 || e.keyCode == 51 || e.keyCode == 52 || e.keyCode == 53) {
			var pocketNumb;
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
			pocket.storage(pocketNumb);
		}
	},

	init: function() {
		var pockets = document.querySelectorAll('.storage--pocket');
		for(var i = 0; i < pockets.length+1; i++) {
			var fonts = JSON.parse(localStorage.getItem('pocket' + i));
			if(localStorage.getItem('pocket' + i)) {
				var span = document.createElement('span');
				var container = document.querySelector('.p' + i);
				container.appendChild(span).setAttribute('class', 'storage--pocket--content');
				var content = document.querySelector('.p' + i + ' .storage--pocket--content');
				content.innerHTML = [
															'<span class="storage--pocket--content--title">',
															fonts.title,
															'</span><br><span class="storage--pocket--content--bodytext">',
															fonts.bodyText,
															'</span>'
														].join('');
			}	
		}
	}
};

var action = {
	openAbout: function(e) {
		e.preventDefault();
		if(!document.querySelector('.about').classList.contains('open'))
			document.querySelector('.about').classList.add('open');
		document.activeElement.blur();
	},

	closeAbout: function(e) {
		e.preventDefault();
		if(document.querySelector('.about').classList.contains('open'))
			document.querySelector('.about').classList.remove('open');
	},

	editLeft: function(e) {
		e.preventDefault();
		if(!document.querySelector('.fontzone').classList.contains('left')) {
			document.querySelector('.fontzone').className = 'fontzone left';
			document.querySelector('.edition--edit-left').classList.add('active');
			document.querySelector('.edition--edit-center').classList.remove('active');
		}
	},

	editCenter: function(e) {
		e.preventDefault();
		if(!document.querySelector('.fontzone').classList.contains('center')) {
			document.querySelector('.fontzone').className = 'fontzone center';
			document.querySelector('.edition--edit-center').classList.add('active');
			document.querySelector('.edition--edit-left').classList.remove('active');
		}
	},

	undo: function(e) {
		e.preventDefault();
		viewer.historic('undo');
		document.activeElement.blur();
	},

	redo: function(e) {
		e.preventDefault();
		viewer.historic('redo');
		document.activeElement.blur();
	},

	showInfoTitle: function(e) {
		if(e.type == 'mouseover')
			document.querySelector('.fontinfo--title').classList.add('active');
		else if (e.type == 'mouseout')
			document.querySelector('.fontinfo--title').classList.remove('active');
	},

	showInfoBodyText: function(e) {
		if(e.type == 'mouseover')
			document.querySelector('.fontinfo--bodytext').classList.add('active');
		else if (e.type == 'mouseout')
			document.querySelector('.fontinfo--bodytext').classList.remove('active');
	},

	switch: function(e) {
		e.preventDefault;
		viewer.switch;
	},

	keyes: function(e) {
		if(e.keyCode == 27) {
			if(document.querySelector('.about').classList.contains('open'))
				document.querySelector('.about').classList.remove('open');
			else if (document.querySelector('.storage--pocket').classList.contains('open'))
				pocket.open();
		} else if(e.keyCode == 65) {
			if(!document.querySelector('.about').classList.contains('open'))
				document.querySelector('.about').classList.add('open');
			else if(document.querySelector('.about').classList.contains('open'))
				document.querySelector('.about').classList.remove('open');
		} else if(e.keyCode == 82) {
			viewer.refresh();
		} else if(e.keyCode == 83) {
			viewer.switch();
		}
	}
};

var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.

  [].forEach.call(draggables, function (draggable) {
    draggable.classList.remove('over');
  });
}

var draggables = document.querySelectorAll('.js-draggable');
[].forEach.call(draggables, function(draggable) {
  draggable.addEventListener('dragstart', handleDragStart, false);
  draggable.addEventListener('dragenter', handleDragEnter, false)
  draggable.addEventListener('dragover', handleDragOver, false);
  draggable.addEventListener('dragleave', handleDragLeave, false);
  draggable.addEventListener('drop', handleDrop, false);
  draggable.addEventListener('dragend', handleDragEnd, false);
});

window.onload = function(){
	clickCloseAbout:  document.querySelector('.about .close').addEventListener('click', action.closeAbout);
	clickOpenAbout: 	document.querySelector('.btn-about').addEventListener('click', action.openAbout);
	clickTitle: 	 		document.querySelector('.fontzone--title').addEventListener('click', viewer.keepTitle);
	clickBodyText: 		document.querySelector('.fontzone--bodytext').addEventListener('click', viewer.keepBodyText);
	clickLeft: 				document.querySelector('.edition--edit-left').addEventListener('click', action.editLeft);
	clickCenter: 			document.querySelector('.edition--edit-center').addEventListener('click', action.editCenter);
	clickNoSmooth: 		document.querySelector('.edition--nosmooth').addEventListener('click', viewer.noSmooth);
	clickUndo: 				document.querySelector('.edition--undo').addEventListener('click', action.undo);
	clickRedo: 				document.querySelector('.edition--redo').addEventListener('click', action.redo);
	clickReverse: 		document.querySelector('.reverse').addEventListener('click', viewer.switch);
	hoverTitle: 			viewer.title.addEventListener('mouseover', action.showInfoTitle);
	outTitle: 				viewer.title.addEventListener('mouseout', action.showInfoTitle);
	hoverBodyText: 		viewer.bodyText.addEventListener('mouseover', action.showInfoBodyText);
	outBodyText: 			viewer.bodyText.addEventListener('mouseout', action.showInfoBodyText);
	keyViewer: 				document.addEventListener('keyup', viewer.keyes);
	keyPocket: 	 			document.addEventListener('keyup', pocket.keyes);
	keyAction: 	 			document.addEventListener('keyup', action.keyes);
	pocket.init();
	pocket.load();
	viewer.createAttr('', '');
	viewer.init();
};