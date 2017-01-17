function ahrCalculateMarketDepth() {
  if ( location.host.indexOf('hashnest.com') === -1 ) {
    return console.warn("The Hashnest Market Depth extension only works on ... well, hashnest.com. You are here: ", location);
  }

  const tables = document.querySelectorAll('.market_order_table');
  if ( !tables ) {
    return console.warn("No market order tables found on this page.");
  }

  tables.forEach(table => {
    // StaticNodeList to array hack: http://stackoverflow.com/a/38171853/641755
    const btcValues = [...table.querySelectorAll('tbody td:last-child div')].map(div => {
      return parseFloat(div.innerHTML);
    })

    const btcSum = btcValues.reduce((a,b) => {
      return a + b;
    }, 0);

    // Update DOM
    table.querySelector('thead th:last-child').innerHTML = `${btcSum.toFixed(2)} BTC`;
  })
}

setInterval(() => {
  ahrCalculateMarketDepth();
}, 1000);