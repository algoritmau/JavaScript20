const app = document.querySelector('.app');
const blockQuote = document.querySelector('.quote');
const quoteBody = document.querySelector('.quote__text');
const quoteAuthor = document.querySelector('.quote__author');
const buttonShareTwitter = document.querySelector('.button__share-twitter');
const buttonNewQuote = document.querySelector('.button__new-quote');
const loader = document.querySelector('.lds-ripple');

// Fetch quote from API
async function getQuote() {
	// Show loader
	loader.classList.remove('hidden');
	app.classList.add('hidden');

	const proxyURL = 'https://cors-anywhere.herokuapp.com/'; // Proxy to call public APIs
	const endpoint =
		'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(`${proxyURL}${endpoint}`);
		const quote = await response.json();
		renderQuote(quote);
	} catch (error) {
		getQuote();
	}

	// Hide loader
	loader.classList.add('hidden');
	app.classList.remove('hidden');
}

// Render quote
function renderQuote(quote) {
	quoteBody.textContent = quote.quoteText;
	app.classList.remove('hidden');

	quote.quoteAuthor == ''
		? '— Anonymous'
		: (quoteAuthor.textContent = `— ${quote.quoteAuthor}`);

	blockQuote.cite = quote.quoteLink;
}

// Tweet quote
function tweetQuote() {
	const currentQuote = quoteBody.textContent;
	const currentQuoteAuthor = quoteAuthor.textContent;
	const twitterURL = `https://twitter.com/intent/tweet?text=${currentQuote} ${currentQuoteAuthor}`;

	window.open(twitterURL, '_blank');
}

// Event handlers
buttonNewQuote.addEventListener('click', getQuote);
buttonShareTwitter.addEventListener('click', tweetQuote);

// On load
getQuote();
