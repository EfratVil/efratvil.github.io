function create_line_chart(chart,asset1) {
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var city = "Brent",
    parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d[city]); });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("data/Assets.csv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.date = parseDate(d.TradDate);
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

        x.domain([data[0].date, data[data.length - 1].date]);
        y.domain(d3.extent(data, function(d) { return d[city]; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("$");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        svg.append("text")
            .datum(data[data.length - 1])
            .attr("class", "label")
            .attr("transform", transform)
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(city);



//-------------
// ============ initinating ============
//var margin = { top: 20, right: 20, bottom: 30, left: 55 },
//   width = 960 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;

////tooltip
//var tooltip = d3.select("body").append("div")
//            .attr("class", "tooltip")
//            .style("opacity", 0);


//var x = d3.scale.linear()
//    .range([0, width]);

//var y = d3.scale.linear()
//    .range([height, 0]);

//var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom").ticks(20);

//var yAxis = d3.svg.axis()
//    .scale(y)
//    .orient("left")

//var svg = d3.select("#" + chart);
//svg.selectAll("*").remove();

// svg = d3.select("#" + chart)
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//  .append("g")
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//function colorPicker(v) {
//    if (v == 0) { return "#d73027"; }
//    else if (v == 1) { return "#f46d43"; }
//    else if (v == 2) { return "#fdae61"; }
//    else if (v == 3) { return "#fee08b"; }
//    else if (v == 4) { return "#d9ef8b"; }
//    else if (v == 5) { return "#a6d96a"; }
//    else if (v == 6) { return "#66bd63"; }
//    else { return "#1a9850"; }
//}

////================= Read file & create SVG =====================
//d3.csv("data/Assets.csv", function (error, data) {
//    if (error) throw error;


//    data.forEach(function (d) {
//        d.date = d.TradDate;
//        d["Brent"] = +d["Brent"];
//        d["Corn"] = +d["Corn"];
//        d["EURUSD"] = +d["EURUSD"];
//        d["Gold"] = +d["Gold"];
//        d["JPYLibor"] = +d["JPYLibor"];
//        d["RBOB"] = +d["RBOB"];
//        d["Soybean"] = +d["Soybean"];
//        d["USDLibor"] = +d["USDLibor"];
//        d["WTI"] = +d["WTI"];
//    });



//    x.domain(d3.extent(data, function (d) { return d[asset1]; })).nice();
//    y.domain([d3.min(data, function (d) { return d[asset2]; }), d3.max(data, function (d) { return d[asset2]; })]).nice();
    

//    svg.append("g")
//        .attr("class", "x axis")
//        .attr('id', 'x_Lable')
//        .attr("transform", "translate(0," + height + ")")
//        .call(xAxis)
//      .append("text")
//        .attr("class", "label")
//        .attr("x", width)
//        .attr("y", -6)
//        .style("text-anchor", "end")
//        .text("Corn");

//    svg.append("g")
//        .attr("class", "y axis")
//        .attr('id', 'y_Lable')
//        .call(yAxis)
//      .append("text")
//        .attr("class", "label")
//        .attr("transform", "rotate(-90)")
//        .attr("y", 6)
//        .attr("dy", ".71em")
//        .style("text-anchor", "end")
//        .text("GOLD");

//    svg.selectAll(".dot")
//        .data(data)
//      .enter().append("circle")
//        .attr("class", "dot")
//        .attr("r", 4)
//        .attr("cx", function (d) { return x(d[asset1]); })
//        .attr("cy", function (d) { return y(d[asset2]); })
//        .attr("opacity", 0.5)
//        .style("fill", function (d) { return colorPicker(2); })
//    .on("mouseover", function (d) {
//        tooltip.transition()
//            .duration(500)
//            .style("opacity", .9);
//        tooltip.html("Brent - " + d[asset1] + "<br/>Corn - " + d[asset2])
//            .style("left", (d3.event.pageX) + "px")
//            .style("top", (d3.event.pageY - 28) + "px");
//    })
//            .on("mouseout", function (d) {
//                tooltip.transition()
//                    .duration(500)
//                    .style("opacity", 0);
//            });



   
//    var xSeries = data.map(function (d) { return parseFloat(d[asset1]); });
//    var ySeries = data.map(function (d) { return parseFloat(d[asset2]); });
   
//    var leastSquaresCoeff = leastSquares(xSeries, ySeries);

//    // slope, intercept, rSquare
//    console.log(leastSquaresCoeff[0]);
   

//    d3.select("#Slope").html("Slope: " + leastSquaresCoeff[0].toFixed(2));
//    d3.select("#Intercept").html("Intercept: " + leastSquaresCoeff[1].toFixed(2));
//    d3.select("#rSquare").html("rSquare:" + leastSquaresCoeff[2].toFixed(2));
 
//    var x1 = d3.min(data, function (d) { return d[asset1]; });
//    var y1 = leastSquaresCoeff[0] * d3.min(data, function (d) { return d[asset1]; }) + leastSquaresCoeff[1];
//    var x2 = d3.max(data, function (d) { return d[asset1]; });
//    var y2 = leastSquaresCoeff[0] * d3.max(data, function (d) { return d[asset1]; }) + leastSquaresCoeff[1];
//    var trendData = [[x1, y1, x2, y2]];

//    var trendline = svg.selectAll(".trendline")
//        .data(trendData);

//    trendline.enter()
//        .append("line")
//        .attr("class", "trendline")
//        .attr('id', 'line1')
//        .attr("x1", function (d) { return x(d[0]); })
//        .attr("y1", function (d) { return y(d[1]); })
//        .attr("x2", function (d) { return x(d[2]); })
//        .attr("y2", function (d) { return y(d[3]); })
//        .attr("stroke", "black")
//        .attr("stroke-width", 1);

   

//});


}
