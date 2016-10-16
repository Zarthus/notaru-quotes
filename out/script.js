(function() {
  var delElems = document.getElementsByClassName('quote-status-deleted');
  for (var i = 0; i < delElems.length; i++) {
    var elem = delElems[i];
    quote_toggle_shown(elem.dataset['quoteId']);
  }
})();

function quote_toggle_shown(quote_id) {
  var elem = document.getElementById('quote-id-' + quote_id);

  if (elem == null) {
    throw Error('Quote with ID ' + quote_id + ' does not exist.');
  }

  if (elem.className.indexOf('quote-collapsed') !== -1) {
    elem.className = elem.className.replace('quote-collapsed', '')
    elem.getElementsByClassName('btn-hide')[0].text = 'hide';
  } else {
    elem.className += ' quote-collapsed';
    elem.getElementsByClassName('btn-hide')[0].text = 'show';
  }
}
