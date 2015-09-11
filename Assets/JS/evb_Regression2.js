function create_scatter_chart(chart, asset2, asset1) {


// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 30, left: 55 },
   width = 960 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom").ticks(20);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select("#" + chart);
svg.selectAll("*").remove();

 svg = d3.select("#" + chart)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function colorPicker(v) {
    if (v == 0) { return "#d73027"; }
    else if (v == 1) { return "#f46d43"; }
    else if (v == 2) { return "#fdae61"; }
    else if (v == 3) { return "#fee08b"; }
    else if (v == 4) { return "#d9ef8b"; }
    else if (v == 5) { return "#a6d96a"; }
    else if (v == 6) { return "#66bd63"; }
    else { return "#1a9850"; }
}

//================= Read file & create SVG =====================
d3.csv("data/Assets.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.date = d.TradDate;
        d["Brent"] = +d["Brent"];
        d["Corn"] = +d["Corn"];
        d["EURUSD"] = +d["EURUSD"];
        d["Gold"] = +d["Gold"];
        d["JPYLibor"] = +d["JPYLibor"];
        d["RBOB"] = +d["RBOB"];
        d["Soybean"] = +d["Soybean"];
        d["USDLibor"] = +d["USDLibor"];
        d["WTI"] = +d["WTI"];
    });



    x.domain(d3.extent(data, function (d) { return d[asset1]; })).nice();
    y.domain([d3.min(data, function (d) { return d[asset2]; }), d3.max(data, function (d) { return d[asset2]; })]).nice();
    

    svg.append("g")
        .attr("class", "x axis")
        .attr('id', 'x_Lable')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text(asset1);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', 'y_Lable')
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(asset2);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[asset1]); })
        .attr("cy", function (d) { return y(d[asset2]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colorPicker(2); })
    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", .9);
        tooltip.html("Brent - " + d[asset1] + "<br/>Corn - " + d[asset2])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



   
    var xSeries = data.map(function (d) { return parseFloat(d[asset1]); });
    var ySeries = data.map(function (d) { return parseFloat(d[asset2]); });
   
    var leastSquaresCoeff = leastSquares(xSeries, ySeries);

    // slope, intercept, rSquare
    console.log(leastSquaresCoeff[0]);
   

    d3.select("#Slope").html("Slope: " + leastSquaresCoeff[0].toFixed(2));
    d3.select("#Intercept").html("Intercept: " + leastSquaresCoeff[1].toFixed(2));
    d3.select("#rSquare").html("rSquare:" + leastSquaresCoeff[2].toFixed(2));
 
    var x1 = d3.min(data, function (d) { return d[asset1]; });
    var y1 = leastSquaresCoeff[0] * d3.min(data, function (d) { return d[asset1]; }) + leastSquaresCoeff[1];
    var x2 = d3.max(data, function (d) { return d[asset1]; });
    var y2 = leastSquaresCoeff[0] * d3.max(data, function (d) { return d[asset1]; }) + leastSquaresCoeff[1];
    var trendData = [[x1, y1, x2, y2]];

    var trendline = svg.selectAll(".trendline")
        .data(trendData);

    trendline.enter()
        .append("line")
        .attr("class", "trendline")
        .attr('id', 'line1')
        .attr("x1", function (d) { return x(d[0]); })
        .attr("y1", function (d) { return y(d[1]); })
        .attr("x2", function (d) { return x(d[2]); })
        .attr("y2", function (d) { return y(d[3]); })
        .attr("stroke", "black")
        .attr("stroke-width", 1);

   

});


// returns slope, intercept and r-square of the line
function leastSquares(xSeries, ySeries) {
    var reduceSumFunc = function (prev, cur) { return prev + cur; };

    var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
    var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

    var ssXX = xSeries.map(function (d) { return Math.pow(d - xBar, 2); })
        .reduce(reduceSumFunc);

    var ssYY = ySeries.map(function (d) { return Math.pow(d - yBar, 2); })
        .reduce(reduceSumFunc);

    var ssXY = xSeries.map(function (d, i) { return (d - xBar) * (ySeries[i] - yBar); })
        .reduce(reduceSumFunc);

    var slope = ssXY / ssXX;
    var intercept = yBar - (xBar * slope);
    var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

    return [slope, intercept, rSquare];
}
}

//create_scatter_chart("scatter_chart", "Corn", "Gold");
//create_bar_chart("line_chart1");
//create_bar_chart("line_chart2");