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
    for (var x = 0, k = keys[x]; x < keys.length; x++) {
      if (k == key) {
        listeners[k] = decodeURIComponent(value);
      }
    }
  }
  handleGetRequest(listeners);
})();

function quoteToggleShown(quoteId, quoteClassName) {
  /* quote-collapsed = still available, quote-hidden = invisible */
  quoteClassName = quoteClassName || 'quote-collapsed';

  var elem = document.getElementById('quote-id-' + quoteId);

  if (elem == null) {
    throw Error('Quote with ID ' + quoteId + ' does not exist.');
  }

  if (elem.className.indexOf(quoteClassName) !== -1) {
    elem.className = elem.className.replace(quoteClassName, '')
    elem.getElementsByClassName('btn-hide')[0].text = 'hide';
  } else {
    elem.className += ' ' + quoteClassName;
    elem.getElementsByClassName('btn-hide')[0].text = 'show';
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

}

function showAllThatMatchSearch(search) {

}

function showAllQuotesByIds(quoteIds) {

}
