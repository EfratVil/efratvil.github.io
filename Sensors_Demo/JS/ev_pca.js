//sensor_id,C1,PC1,PC2,PC3,PC4,PC5,PC6,PC7,PC8,PC9,PC10,PC_dist_2,PC_dist_3,PC_dist_5,PC_dist_7,PC_dist_10,CM_Sum,CM_Sum_Square,CM_Sum_sd,CM_Sum_Square_sd,T2_Hourly,T2_Hourly_Flag,T2_MDS,T2_Hourly_MDS,T2_Growth,T2_Hourly_Growth
//PC1, PC2, dist, sensor_id

// ============ initinating ============

var colors = ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"];


var margin = { top: 20, right: 20, bottom: 50, left: 40 },
    width = 850 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(colors);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//================= Read file & create SVG =====================
    d3.csv("data/outliers_Week9_pca.csv", function (error, data) {
    if (error) throw error;

  
    var data1 = data.map(function (d) {

        return {
        sensor_id: d["sensor_id"],
        PC1: +Math.abs(d["PC1"]),
        PC2: +Math.abs(d["PC2"]),
        PC3: +Math.abs(d["PC3"]),
        PC4: +Math.abs(d["PC4"]),
        PC5: +Math.abs(d["PC5"]),
        PC6: +Math.abs(d["PC6"]),
        PC7: +Math.abs(d["PC7"]),
        PC8: +Math.abs(d["PC8"]),
        PC9: +Math.abs(d["PC9"]),
        PC10: +Math.abs(d["PC10"])
        };
    });

    color.domain(d3.keys(data1[0]).filter(function (key) { return key !== "sensor_id"; }));

    data1.forEach(function (d) {
        var y0 = 0;
        var yy0 = 0;
        d.ages = color.domain().map(function (name) { return { sensor_id: d.sensor_id, name: name, y0: y0, y1: y0 += +d[name], yy0: yy0, yy1: yy0 += +d[name] * d[name] }; });
        d.total = d.ages[d.ages.length - 1].y1;
        d.total_sqr = d.ages[d.ages.length - 1].yy1;
        d.sensor_id = d.sensor_id;
    });

    
   // dsf = data1.filter(function (d) { return d.total > 2000; });
    dsf = data1.filter(function (d) { return d.total_sqr > 750000; });
    console.log(dsf);

       dsf.sort(function (a, b) { return (b.PC1 + b.PC2 + b.PC3) - (a.PC1 + a.PC2 + a.PC3); });

    x.domain(dsf.map(function (d) { return d.sensor_id; }));
    y.domain([0, d3.max(dsf, function (d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .call(xAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    draw_graph();

    //var state = svg.selectAll(".state")
    //    .data(dsf)
    //  .enter().append("g")
    //    .attr("class", "g")
    //    .attr("transform", function (d) { return "translate(" + x(d.sensor_id) + ",0)"; });

    //state.selectAll("rect")
    //  .data(function (d) { return d.ages; })
    //  .enter().append("rect")
    //    .attr("width", x.rangeBand())
    //    .attr("y", function (d) { return y(d.y1); })
    //    .attr("height", function (d) { return y(d.y0) - y(d.y1); })
    //    .style("fill", function (d) { return color(d.name); })
    //        .on("mouseover", function (d) {
    //            d3.select("#sensor_id").html(d["sensor_id"]);
    //            $("#sensor_id").val("sensor_id").trigger('change');
    //             });

    function draw_graph() {

   var state = svg.selectAll(".state")
       .data(dsf)
     .enter().append("g")
       .attr("class", "g")
       .attr("transform", function (d) { return "translate(" + x(d.sensor_id) + ",0)"; });

   state.selectAll("rect")
     .data(function (d) { return d.ages; })
     .enter().append("rect")
       .attr("width", x.rangeBand())
       .attr("y", function (d) { return y(d.y1); })
       .attr("height", function (d) { return y(d.y0) - y(d.y1); })
       .style("fill", function (d) { return color(d.name); })
           .on("mouseover", function (d) {
               d3.select("#sensor_id").html(d["sensor_id"]);
               d3.select("#sensor_name").html("Sensor ID: ");
               $("#sensor_id").val("sensor_id").trigger('change');
           });

    }

    d3.select("#btn_square").on("click", function () {

        if (d3.select("#btn_square").html() == "Square PC's")
        {
            d3.select("#btn_square").html("back to PC values");
            y.domain([0, d3.max(dsf, function (d) { return d.total_sqr; })]);
            svg.selectAll("rect")
              .transition()
              .ease('linear')
              .duration(1000)
              .attr("y", function (d) { return y(d.yy1); })
              .attr("height", function (d) { return y(d.yy0) - y(d.yy1); });
        }
        else
        {
            d3.select("#btn_square").html("Square PC's");
            y.domain([0, d3.max(dsf, function (d) { return d.total; })]);
            svg.selectAll("rect")
              .transition()
              .ease('linear')
              .duration(1000)
              .attr("y", function (d) { return y(d.y1); })
              .attr("height", function (d) { return y(d.y0) - y(d.y1); });
        }
    });

    d3.select("#pcx").on("change", function () {
       // y.domain([0, d3.max(dsf, function (d) { return d.total_sqr; })]);
        console.log("25443");
        console.log(x(25443));

        dsf.sort(function (a, b) { return (b.PC1) - (a.PC1); });
        console.log(dsf);

        x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        x.domain(dsf.map(function (d) { return d.sensor_id; }));

        console.log("26131");
        console.log(x(26131));


        svg.selectAll("rect")
            .transition()
          .ease('linear')
          .duration(1000)
          .attr("transform", function (d) { return "translate(" + x(d.sensor_id) + ",0)"; });


        //svg.selectAll("rect")
        //  .transition()
        //  .ease('linear')
        //  .duration(1000)
        //  .attr("transform", function (d) { return "translate(" + x(d.sensor_id) + ",0)"; });





//        var x0 = xScale.domain(dataset.sort(sortChoice())
//.map(function (d) { return d.name }))
//.copy();

//        var transition = svg.transition().duration(750);
//        var delay = function (d, i) { return i * 10; };

//        transition.selectAll("rect")
//        .delay(delay)
//        .attr("x", function (d) { return x0(d.name); });







      //  svg.selectAll("rect")

      //          .transition()
      //    .ease('linear')
      //   .duration(1000)
      //     // .data(function (d) { return d.ages; })
      //    .attr("y", function (d) { return y(d.yy1); })
      //    .attr("height", function (d) { return y(d.yy0) - y(d.yy1); });

    });

    //================= Change asset event =====================
    //function Change_dd() {

    //    var PCX = d3.select('#pcx').node().value;
    //    console.log(PCX);
    //    dsf = data1.filter(function (d) { return d.total > 2200; });
    //    dsf.sort(function (a, b) { return b.total - a.total; });
    //    //   draw_graph();

    //    var t = svg.transition().duration(750),
    //    g = t.selectAll(".state").attr("transform", function (d) { return "translate(" + x(d.sensor_id) + ",0)"; });

    //    g.selectAll("rect").attr("width", x.rangeBand())
    //   .attr("y", function (d) { return y(d.y1); })
    //   .attr("height", function (d) { return y(d.y0) - y(d.y1); })
    //   .style("fill", function (d) { return color(d.name); })
    //    //g.select(".group-label").attr("y", function (d) { return y1(d.values[0].value / 2 + d.values[0].valueOffset); })

    //}


    //================= Change asset event =====================
    //d3.select("#week").on("change", function () {
    //    Change_dd();
    //});


    //d3.select("#pcx").on("change", function () {
    //    Change_dd();
    //});

    //d3.select("#pcy").on("change", function () {
    //    Change_dd();
    //});

});


