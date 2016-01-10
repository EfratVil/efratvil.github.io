
// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 30, left: 55 },
   width = 660 - margin.left - margin.right,
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
    .call(d3.behavior.zoom().on("zoom", function () {
     svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
     }))
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

//"raw_corr_sum " && sel
//"raw_corr_sum_square " && sel
//================= Read file & create SVG =====================
    d3.csv("data/sensors_raw_corr.csv", function (error, data) {
    if (error) throw error;

    d3.select("#x_asset_lbl").html("Sum Square");
    d3.select("#y_asset_lbl").html("Sum");

    var sel = d3.select('#week').node().value;

    var corr_y = "gap_corr_sum " + sel;
    var corr_x = "gap_corr_sum_square " + sel;


    data.forEach(function (d) {
        //raw_corr_sum Week1,raw_corr_sum Week10,raw_corr_sum Week11,raw_corr_sum Week12,raw_corr_sum Week13,raw_corr_sum Week14,raw_corr_sum Week15,raw_corr_sum Week2,raw_corr_sum Week3,raw_corr_sum Week4,raw_corr_sum Week5,raw_corr_sum Week6,raw_corr_sum Week7,raw_corr_sum Week8,raw_corr_sum Week9,raw_corr_sum_square Week1,raw_corr_sum_square Week10,raw_corr_sum_square Week11,raw_corr_sum_square Week12,raw_corr_sum_square Week13,raw_corr_sum_square Week14,raw_corr_sum_square Week15,raw_corr_sum_square Week2,raw_corr_sum_square Week3,raw_corr_sum_square Week4,raw_corr_sum_square Week5,raw_corr_sum_square Week6,raw_corr_sum_square Week7,raw_corr_sum_square Week8,raw_corr_sum_square Week9
        d["sensor_id"] = +d["sensor_id"];
        d["corr_sum"] = +d[corr_y];
        d["corr_sum_square"] = +d[corr_x];

    });


    var data1 = data.filter(function (d) { return isNaN(d.corr_sum) === false });

    x.domain(d3.extent(data1, function (d) { return d["corr_sum"]; })).nice();
    y.domain([d3.min(data1, function (d) { return d["corr_sum_square"]; }), d3.max(data1, function (d) { return d["corr_sum_square"]; })]).nice();
    

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
        .data(data1)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d["corr_sum"]); })
        .attr("cy", function (d) { return y(d["corr_sum_square"]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colorPicker(2); })
    .on("mouseover", function (d) {
        d3.select("#sensor_id").html(d["sensor_id"]);
        $("#sensor_id").val("sensor_id").trigger('change');
        //tooltip.transition()
        //    .duration(500)
        //    .style("opacity", .9);
        //tooltip.html("Sensor: " + d.sensor_id + "<br/><br/>" + "Correaltion:<br/>Sum square: " + d["corr_sum_square"] + "<br/>Sum:             " + d["corr_sum"])
        //    .style("left", (d3.event.pageX) + "px")
        //    .style("top", (d3.event.pageY - 28) + "px");
         })
    .on("mouseout", function (d) {
        //tooltip.transition()
        //       .duration(500)
        //       .style("opacity", 0);
         })
    .on("click", function (d) {
        //d3.select("#sensor_id").html("Sensor id - " + d["sensor_id"]);
        
    //          d3.select("#scatter").html("Scatter - " + label_row[d.i] + " vs " + label_col[d.j]);
        //        create_scatter_chart("scatter_chart", label_row[d.i], label_col[d.j]);
       // alert("sdf");
          });

    
   
    //================= Change asset event =====================
    function ChangeAsset() {

        var sel = d3.select('#week').node().value;

        var corr_y = "gap_corr_sum " + sel;
        var corr_x = "gap_corr_sum_square " + sel;


        data.forEach(function (d) {
            //raw_corr_sum Week1,raw_corr_sum Week10,raw_corr_sum Week11,raw_corr_sum Week12,raw_corr_sum Week13,raw_corr_sum Week14,raw_corr_sum Week15,raw_corr_sum Week2,raw_corr_sum Week3,raw_corr_sum Week4,raw_corr_sum Week5,raw_corr_sum Week6,raw_corr_sum Week7,raw_corr_sum Week8,raw_corr_sum Week9,raw_corr_sum_square Week1,raw_corr_sum_square Week10,raw_corr_sum_square Week11,raw_corr_sum_square Week12,raw_corr_sum_square Week13,raw_corr_sum_square Week14,raw_corr_sum_square Week15,raw_corr_sum_square Week2,raw_corr_sum_square Week3,raw_corr_sum_square Week4,raw_corr_sum_square Week5,raw_corr_sum_square Week6,raw_corr_sum_square Week7,raw_corr_sum_square Week8,raw_corr_sum_square Week9
            d["sensor_id"] = +d["sensor_id"];
            d["corr_sum"] = +d[corr_y];
            d["corr_sum_square"] = +d[corr_x];

        });


        var data1 = data.filter(function (d) { return isNaN(d.corr_sum) === false });


        x.domain(d3.extent(data1, function (d) { return d["corr_sum"]; })).nice();
        y.domain([d3.min(data1, function (d) { return d["corr_sum_square"]; }), d3.max(data1, function (d) { return d["corr_sum_square"]; })]).nice();


        // Update Y Axis
        svg.select(".y.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(yAxis);   


        // Update x Axis
        svg.select(".x.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(xAxis);


        // update the scatter plot
        svg.selectAll(".dot")
       .data(data1)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
.attr("cx", function (d) { return x(d["corr_sum"]); })
            .attr("cy", function (d) { return y(d["corr_sum_square"]); });
     // .style("fill", function (d) { return colorPicker(3); });

        //svg.selectAll(".dot")
        //    .data(data1)
        //  .enter().append("circle")
        //    .attr("class", "dot")
        //    .attr("r", 4)
        //    .attr("cx", function (d) { return x(d["corr_sum"]); })
        //    .attr("cy", function (d) { return y(d["corr_sum_square"]); })
        //    .attr("opacity", 0.5)
        //    .style("fill", function (d) { return colorPicker(2); })
        //.on("mouseover", function (d) {
        //    tooltip.transition()
        //        .duration(500)
        //        .style("opacity", .9);
        //    tooltip.html("Sensor: " + d.sensor_id + "<br/><br/>" + "Correaltion:<br/>Sum square: " + d["corr_sum_square"] + "<br/>Sum:             " + d["corr_sum_square"])
        //        .style("left", (d3.event.pageX) + "px")
        //        .style("top", (d3.event.pageY - 28) + "px");
        //})
        //        .on("mouseout", function (d) {
        //            tooltip.transition()
        //                .duration(500)
        //                .style("opacity", 0);
        //        });




    }


    //================= Change asset event =====================
    d3.select("#week").on("change", function () {
        ChangeAsset();
    });


    //d3.select("#y_asset").on("change", function () {
    //    ChangeAsset();
    //});

   // Indicator
});


