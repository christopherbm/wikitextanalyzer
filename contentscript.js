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
		this.stopWordsFound = 0;
		
		this.stopWords = 
			['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for',
			'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by',
			'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one',
			'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about',
			'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no',
			'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some',
			'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
			'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our',
			'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any',
			'these', 'give', 'day', 'most', 'us'];
		this.swLength = this.stopWords.length;
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
 		
 		if( this.isStopWord(w) == false) {
 			var length = this.list.length;
 				for (var i = 0; i < length; i++) {
 				var word = this.list[i];
 				if ( word.checkMatch(w) ) {
 					return;
 				}
 			}
 		
 			var word = new Word(w);
 			this.list.push(word);	
 		}
 		return;
	}
	TextAnalyzer.prototype.isStopWord = function(w) {
		for (var i = 0; i < this.swLength; i++) {
			if (w === this.stopWords[i]) {
				this.stopWordsFound = this.stopWordsFound + 1;
				return true;
			}
		}
		return false;
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