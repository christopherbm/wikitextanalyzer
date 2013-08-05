window.textanalyzer = (function () {
	
	function main() {
		console.log('inner content script');
		var ta = new TextAnalyzer();
		ta.processPage();
		console.log(ta);
	}
	
	function TextAnalyzer() {
		this.list = []; // Word list
		this.totalElementsSelected;
		this.totalWordsProcessed = 0;
	}
	TextAnalyzer.prototype.processPage = function() {
		var p_list = document.getElementsByTagName('p');
		this.totalElementsSelected = p_list.length;
		
		var length = this.totalElementsSelected;
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
 		this.totalWordsProcessed = this.totalWordsProcessed + 1;
 		
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