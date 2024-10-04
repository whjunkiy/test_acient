// Text Magnifier JS
// Added October 5th, 2020
// Source: https://codepen.io/alexburton/pen/RwRbayj

	function getFontSize(elem) {
		var fontSize = window.getComputedStyle(elem, null).getPropertyValue('font-size');
		return fontSize;
	}

	function fontConfigElem(elem) {
		var fontSize = getFontSize(elem);
		var fontSizeNum = parseInt(fontSize.split('px')[0]);
		if(!elem.hasAttribute('data-font-anchor')) {
			elem.setAttribute('data-font-anchor', fontSizeNum);
		}
		return {fontSize: fontSize, fontSizeNum: fontSizeNum};
	}

	document.querySelectorAll('body *').forEach(elem => {
		fontConfigElem(elem);
	});

	document.getElementById('font-size-range').addEventListener('change', function(e) {
		e.preventDefault();
		console.log({this: this, value: this.value});

		var fontVal = parseInt(this.value);

		document.querySelectorAll('body *').forEach(elem => {
		  console.log({elem: elem, dataFontAnchor: elem.getAttribute('data-font-anchor')});
			var fce = fontConfigElem(elem),
					fontSize = fce.fontSize,
					fontSizeNum = fce.fontSizeNum;

			var fontSizeAnchor = parseInt(elem.getAttribute('data-font-anchor'));
			elem.setAttribute('data-font-val', fontVal);

			if(!elem.classList.contains('no-change') && !elem.classList.contains('nav-link')) {
				elem.style.fontSize = (fontSizeAnchor + fontVal - 5).toString() + 'px';
			}
		});
	});
