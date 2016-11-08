source: https://gist.github.com/mbostock/1256572
The first 15 seconds of the D3 show reel. See full video at <http://vimeo.com/29862153>. Includes seamless transitions between the following visualization types:

* lines
* horizons
* areas
* stacked areas
* streamgraph
* overlapping areas
* grouped bars
* stacked bars
* bars
* donut

Admittedly, these aren’t the most useful visualizations; their purpose is not to inform but to demonstrate D3’s capability for producing dynamic visualizations with custom transitions. They *do* show real data (the monthly closing price for ten years’ worth of stock data), but I didn’t include axes for date or price. See the [axis component](http://bl.ocks.org/1166403) for a better example. Also, the stacked visualizations aren’t especially meaningful, unless you imagine owning a portfolio with equal parts AAPL, AMZN, IBM and MSFT. Similarly, the bars and donuts represent the *average* price (or sum) during this time period.