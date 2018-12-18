(function() {
  var delElems = document.getElementsByClassName('quote-status-deleted');
  for (var i = 0; i < delElems.length; i++) {
    var elem = delElems[i];
    quoteToggleShown(elem.dataset['quoteId']);
  }

  var listeners = {
    "author": '',
    "search": '',
    "quotes": '',
    "quote": ''
  };
  var keys = Object.keys(listeners);

  var getRequest = window.location.search.replace("?", "").split("&");
  for (var i = 0; i < getRequest.length; i++) {
    var item = getRequest[i];
    var key, value, split;
    split = item.split("=");
    key = split[0];
    value = split[1];
    for (var x = 0, k; x < keys.length; x++) {
      k = keys[x];
      if (k == key) {
        listeners[k] = decodeURIComponent(value);
      }
    }
  }
  handleGetRequest(listeners);
})();


(function() {
  const buttons = document.getElementsByClassName('btn-hide');
  const fnOnButtonClick = function() {
    const quoteId = this.parentElement.parentElement.parentElement.dataset['quoteId'];
    quoteToggleShown(parseInt(quoteId));
  };

  for (let btn of buttons) {
    btn.addEventListener('click', fnOnButtonClick);
  }
})();

function quoteToggleShown(quoteId, quoteClassName, forceHide) {
  /* quote-collapsed = still available, quote-hidden = invisible */
  quoteClassName = quoteClassName || 'quote-collapsed';
  forceHide = forceHide !== undefined ? forceHide : false;
  
  if (typeof(quoteId) == "object") {
    var elem = quoteId;
    quoteId = elem.dataset["quoteId"];
  } else {
    var elem = document.getElementById('quote-id-' + quoteId);
  }

  if (elem == null) {
    throw Error('Quote with ID ' + quoteId + ' does not exist.');
  }

  if (!forceHide && elem.className.indexOf(quoteClassName) !== -1) {
    elem.className = elem.className.replace(quoteClassName, '')
    elem.getElementsByClassName('btn-hide')[0].innerText = 'hide';
  } else {
    elem.className += ' ' + quoteClassName;
    elem.getElementsByClassName('btn-hide')[0].innerText = 'show';
  }
}

function handleGetRequest(query) {
  if (query["author"] != '') {
    showAllByAuthor(query["author"]);
  }

  if (query["search"] != '') {
    showAllThatMatchSearch(query["search"]);
  }

  if (query["quotes"] != '') {
    showAllQuotesByIds(query["quotes"].replace(' ', '').split(','));
  } else if (query["quote"] != '') {
    showAllQuotesByIds([query["quote"]]);
  }
}

function showAllByAuthor(author) {
  author = author.replace('_', ' ').toLowerCase();
  var quotes = document.getElementsByClassName('quote-author');

  for (var i = 0, item; i < quotes.length; i++) {
    item = quotes[i];
    if (item.innerHTML.toLowerCase().indexOf(author) === -1) {
      quoteToggleShown(findQuoteArticleFromInner(item), 'quote-hidden', true);
    }
  }
}

function showAllThatMatchSearch(search) {
  var quotes = document.getElementsByClassName('quote-text');

  for (var i = 0, item; i < quotes.length; i++) {
    item = quotes[i];
    if (item.innerHTML.toLowerCase().indexOf(search.toLowerCase()) == -1) {
      quoteToggleShown(findQuoteArticleFromInner(item), 'quote-hidden', true);
    }
  }
}

function showAllQuotesByIds(quoteIds) {
  var quotes = document.getElementsByClassName('quote-wrapper');
  for (var i = 0, item; i < quotes.length; i++) {
    item = quotes[i];
    quoteToggleShown(item, 'quote-hidden', true);
  }

  for (var i = 0, item; i < quoteIds.length; i++) {
    item = parseInt(quoteIds[i]);

    quoteToggleShown(item, 'quote-hidden');
  }
}

function findQuoteArticleFromInner(elem, recursionLevel) {
  if (recursionLevel == undefined) { 
    recursionLevel = 25; 
  }

  if (recursionLevel == 0) {
    throw Error("Error: findQuoteArticleFromInner: too much recursion.");
  }

  if (elem.className.indexOf("quote-wrapper") !== -1 && elem.dataset["quoteId"] != undefined) {
    return elem;
  }

  return findQuoteArticleFromInner(elem.parentElement, --recursionLevel);
}
