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



var svg = d3.select("#chart")
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

    var x_asset = "Brent";
    var y_asset = "Corn";


    d3.select("#x_asset_lbl").html(x_asset);
    d3.select("#y_asset_lbl").html(y_asset);


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



    x.domain(d3.extent(data, function (d) { return d[x_asset]; })).nice();
    y.domain([d3.min(data, function (d) { return d[y_asset]; }), d3.max(data, function (d) { return d[y_asset]; })]).nice();
    

    svg.append("g")
        .attr("class", "x axis")
        .attr('id', 'x_Lable')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', 'y_Lable')
        .call(yAxis);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_asset]); })
        .attr("cy", function (d) { return y(d[y_asset]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colorPicker(2); })
    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", .9);
        tooltip.html(x_asset + " - " + d[x_asset] + "<br/>" + y_asset + "- " + d[y_asset])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



   
    var xSeries = data.map(function (d) { return parseFloat(d[x_asset]); });
    var ySeries = data.map(function (d) { return parseFloat(d[y_asset]); });
   
    var leastSquaresCoeff = leastSquares(xSeries, ySeries);

    // slope, intercept, rSquare
    console.log(leastSquaresCoeff[0]);
   

    d3.select("#Slope").html("Slope: " + leastSquaresCoeff[0].toFixed(2));
    d3.select("#Intercept").html("Intercept: " + leastSquaresCoeff[1].toFixed(2));
    d3.select("#rSquare").html("rSquare:" + leastSquaresCoeff[2].toFixed(2));
 
    var x1 = d3.min(data, function (d) { return d[x_asset]; });
    var y1 = leastSquaresCoeff[0] * d3.min(data, function (d) { return d[x_asset]; }) + leastSquaresCoeff[1];
    var x2 = d3.max(data, function (d) { return d[x_asset]; });
    var y2 = leastSquaresCoeff[0] * d3.max(data, function (d) { return d[x_asset]; }) + leastSquaresCoeff[1];
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

   
    //================= Change asset event =====================
    function ChangeAsset() {
        // get new asset names
         x_asset = d3.select('#x_asset').node().value;
         y_asset = d3.select('#y_asset').node().value;

         d3.select("#x_asset_lbl").html(x_asset);
         d3.select("#y_asset_lbl").html(y_asset);

    //    console.log("x_asset - " + x_asset);
    //    console.log("y_asset - " + y_asset);

        // update the domain calc function
        x.domain(d3.extent(data, function (d) { return d[x_asset]; })).nice();
        y.domain([d3.min(data, function (d) { return d[y_asset]; }), d3.max(data, function (d) { return d[y_asset]; })]).nice();



        // Update Y Axis
        svg.select(".y.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(yAxis);   




        //      svg.select(".y.axis").selectAll(".label").attr("transform", transform).text("sdfsdf");


        // Update x Axis
        svg.select(".x.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(xAxis);

        d3.select("#label_x").text("sdfsdfsd");
   


        // update the scatter plot
        svg.selectAll(".dot")
       .data(data)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
      .attr("cx", function (d) { return x(d[x_asset]); })
      .attr("cy", function (d) { return y(d[y_asset]); });
     // .style("fill", function (d) { return colorPicker(3); });


        //calculate new regression line
        xSeries = data.map(function (d) { return parseFloat(d[x_asset]); });
        ySeries = data.map(function (d) { return parseFloat(d[y_asset]); });

        leastSquaresCoeff = leastSquares(xSeries, ySeries);

        x1 = d3.min(data, function (d) { return d[x_asset]; });
        y1 = leastSquaresCoeff[0] * d3.min(data, function (d) { return d[x_asset]; }) + leastSquaresCoeff[1];
        x2 = d3.max(data, function (d) { return d[x_asset]; });
        y2 = leastSquaresCoeff[0] * d3.max(data, function (d) { return d[x_asset]; }) + leastSquaresCoeff[1];
        trendData = [[x1, y1, x2, y2]];

        d3.select("#line1").attr("x1", x(x1)).transition().duration(1000);
        d3.select("#line1").attr("y1", y(y1)).transition().duration(1000);
        d3.select("#line1").attr("x2", x(x2)).transition().duration(1000);
        d3.select("#line1").attr("y2", y(y2)).transition().duration(1000);

        d3.select("#Slope").html("Slope: " + leastSquaresCoeff[0].toFixed(2));
        d3.select("#Intercept").html("Intercept: " + leastSquaresCoeff[1].toFixed(2));
        d3.select("#rSquare").html("rSquare:" + leastSquaresCoeff[2].toFixed(2));

    }


    //================= Change asset event =====================
    d3.select("#x_asset").on("change", function () {
        ChangeAsset();
    });


    d3.select("#y_asset").on("change", function () {
        ChangeAsset();
    });

   // Indicator
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