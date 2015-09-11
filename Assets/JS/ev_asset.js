var myColors = ["#1565C0", "#1E88E5", "#42A5F5", "#00695C", "#00897B", "#4DB6AC", "#9E9D24", "#EF6C00", "#FF9800"];
d3.scale.myColors = function () {
    return d3.scale.ordinal().range(myColors);
};


d3.csv("data/Assets.csv", function (err, data) {   //Asset_Contracts_wide

    //get each col of the data, except date col
    var dataToPlot = Object.keys(data[0]).filter(function (k) { return k != "TradDate" })
      .map(function (k) {
          return {
              "key": k, "values": data.map(function (d) {
                  return {
                      "x": d3.time.format("%Y%m%d").parse(d.TradDate),
                      "y": +d[k]
                  }
              })
          }
      })


    nv.addGraph(function () {
        var chart = nv.models.lineWithFocusChart().color(d3.scale.myColors().range());

        chart.xAxis.tickFormat(function (d) { return d3.time.format('%x')(new Date(d)) });
        chart.x2Axis.tickFormat(function (d) { return d3.time.format('%x')(new Date(d)) });

        chart.yAxis
          .tickFormat(d3.format(',.2f'));

        chart.y2Axis
          .tickFormat(d3.format(',.2f'));

        d3.select('#chart svg')
          .datum(dataToPlot)
          .transition().duration(500)
          .call(chart)
        ;

        nv.utils.windowResize(chart.update);

        return chart;
    });
})