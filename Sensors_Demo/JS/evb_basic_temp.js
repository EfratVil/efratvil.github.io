
function Line_chart_time_ID(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

  
  //  var parseDate = d3.time.format("%Y-%m-%d hh:mm:ss").parse;
   
    var x = d3.scale.linear()//d3.time.scale()
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
     //   .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d[y_ds]); });

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   // console.log(data[y_ds]);

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    //    d3.selectAll("input").on("change", change);
}

// ---- Active Source ----
//Ver 1.0
function Simple_bar_chart(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d[x_ds]; }));
    y.domain([0, d3.max(data, function (d) { return d[y_ds]; })]);

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
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d[x_ds]); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d[y_ds]); })
        .attr("height", function (d) { return height - y(d[y_ds]); });
}

// ---- Active Source ----
//Ver 1.0
function Simple_bar_weekly_chart(chart, data, x_ds, y_ds, width, height) {

        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues([24, 48, 72, 96, 120, 144, 168]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10, "%");

        //tooltip
        var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

        var svg = d3.select("#" + chart).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(data.map(function (d) { return d[x_ds]; }));
        y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]);

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
            .text("Frequency");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d[x_ds]); })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                if (d[y_ds] > 0)
                { return y(d[y_ds]); }
                else
                { return  y(0); }            
            })
            .attr("height", function (d) {
                if (d[y_ds] > 0)
                   { return y(0) - y(d[y_ds]); }
                else
                { return y(d[y_ds]) - y(0); }
                
            })
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", .9);
            tooltip.html("Value: " + Math.round(d[y_ds]*100,1) + "<br/>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

   
    }



function create_scatter_plot(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

    var colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']
    var color = d3.scale.ordinal()
        .range(colors);

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

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]).nice();

    svg.append("g")
    .attr("class", "x axis")
    .attr('id', "Sum Square")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "Sum")
        .call(yAxis);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colors[1]; })
    .on("mouseover", function (d) {
    //    d3.select("#sensor_id").html(d[x_ds]);
    //    $("#sensor_id").val("sensor_id").trigger('change');
    })
    .on("mouseout", function (d) {
    })
    .on("click", function (d) {
    });

}

function create_spc_plot(chart, data, x_ds, y_ds, width, height, cl, sd) {
    //cl: Center Line. Should be Mean or Median
    //sd: Standard deviation

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
    //colorbrewer2 10-class RdYlGn
    var colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']
    var color = d3.scale.ordinal()
        .range(colors);

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

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]).nice();

   // console.log(d3.median(data, function (d) { return d[y_ds]; }));

    svg.append("g")
    .attr("class", "x axis")
    .attr('id', "Sum Square")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "Sum")
        .call(yAxis);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) {
            if ((d[y_ds] < cl - 3 * sd) || (d[y_ds] > cl + 3 * sd))
               {return colors[2];}
            else
               { return colors[7]; }
        })
    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", .9);
        tooltip.html("x: " + d[x_ds] + "<br/>y: " + d[y_ds])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
        tooltip.transition()
               .duration(500)
               .style("opacity", 0);
    })
    .on("click", function (d) {
    });




//Add center line
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

//Add UCL
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl+3*sd))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl + 3*sd))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

//Add LCL
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl - 3*sd))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl - 3*sd))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

}




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
