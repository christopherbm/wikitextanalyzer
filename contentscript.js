window.textanalyzer = (function () {
	
	function main() {
		console.log('inner content script');
		var ta = new TextAnalyzer();
		ta.processPage();
		console.log(ta);
	}
	
	function TextAnalyzer() {
		this.list = []; // word list
	}
	TextAnalyzer.prototype.processPage = function() {
		var p_list = document.getElementsByTagName('p');
		var length = p_list.length;
		for (var i = 0; i < length; i++) {
			var pit = p_list[i].innerText; // paragraph inner text
			this.processString( pit.toLowerCase() );
		}	
	}
	TextAnalyzer.prototype.processString = function(str) {		
		var sa = str.split(' '); // string array
 		var length = sa.length;
 		for (var i = 0; i < length; i++) {
 			var word = sa[i];
 			if (word.length > 0) {
 				this.processWord(word);
 			}
 		}
	}
	TextAnalyzer.prototype.processWord = function(w) {
 		var length = this.list.length;
 		for (var i = 0; i < length; i++) {
 			var word = this.list[i];
 			if ( word.checkMatch(w) ) {
 				return;
 			}
 		}
 		
 		var word = new Word(w);
 		this.list.push(word);
 		return
	}
	
	function Word(w) {
		this.word  = w.toLowerCase();
		this.count = 0;
 	}
 	Word.prototype.checkMatch = function(w) {
 		if( this.word === w.toLowerCase() ) {
 			this.count = this.count + 1;
 			return true;
 		}
 		return false;
	}
	
	main();
}());


//chrome.extension.sendRequest({}, function(response) {});