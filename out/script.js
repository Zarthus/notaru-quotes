(function() {
  var delElems = document.getElementsByClassName('quote-status-deleted');
  for (var i = 0; i < delElems.length; i++) {
    var elem = delElems[i];
    quoteToggleShown(elem.dataset['quoteId']);
  }
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
