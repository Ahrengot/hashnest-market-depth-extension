function ahrCalculateMarketDepth() {
  if ( location.host.indexOf('hashnest.com') === -1 ) {
    return console.warn("The Hashnest Market Depth extension only works on ... well, hashnest.com. You are here: ", location);
  }

  const tables = document.querySelectorAll('.market_order_table');
  if ( !tables ) {
    return console.warn("No market order tables found on this page.");
  }

  const dataSets = [
    {
      selector: 'tbody td:last-child div',
      headerSelector: 'thead th:last-child',
      render: sum => `${sum.toFixed(2)} BTC`
    },
    {
      selector: 'tbody td:nth-last-child(2)',
      headerSelector: 'thead th:nth-last-child(2)',
      render: sum => `${sum.toLocaleString()} GHS`
    },
  ];

  tables.forEach(table => {
    dataSets.forEach(opts => {
      // StaticNodeList to array hack: http://stackoverflow.com/a/38171853/641755
      const nodes = [ ...table.querySelectorAll(opts.selector) ];
      const values = nodes.map( el => parseFloat(el.innerHTML) )
      const sum = values.reduce( ((a,b) => a + b), 0 );

      // Update DOM
      table.querySelector(opts.headerSelector).innerHTML = opts.render(sum);
    })

  })
}

setInterval(() => {
  ahrCalculateMarketDepth();
}, 1000);

ahrCalculateMarketDepth();