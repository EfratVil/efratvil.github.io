
// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 30, left: 55 },
   width = 660 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//var colors = ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"];
//colorbrewer - qualitative 10-class Paired
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

function colorPicker_grade(v) {
    if (v == "Good") { return "#1a9850"; }
    else if (v == "tbd") { return "#fdae61"; }
    else if (v == "Outlier") { return "#d73027"; }
    else { return "#4393c3"; }
}

//================= Read file & create SVG =====================
  d3.csv("data/outliers_Week9.csv", function (error, data) {
        if (error) throw error;

    d3.select("#x_asset_lbl").html("Sum");
    d3.select("#y_asset_lbl").html("Sum Square");

    var sel = "Week9";
   // var sel = d3.select('#week').node().value;

    data.forEach(function (d) {
        Object.keys(data[0]).forEach(function (k) {
            if (k != "grade" & k != "grade_auto")
            { d[k] = +Math.round(d[k] * 100) / 100; }
        });
        d["corr_sum"] = +d["nds_wt_CM_Avg_Sum"];  ///corr_y
        d["corr_sum_square"] = +d["nds_wt_CM_Avg_Sum_Square"]; //corr_x  nds_wt_PC_dist_10
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
        .style("fill", function (d) { return colorPicker_grade(d["grade"]); })
    .on("mouseover", function (d) {
        d3.select("#sensor_id").html(d["sensor_id"]);
        $("#sensor_id").val("sensor_id").trigger('change');
         });

    //================= Change asset event =====================
    function ChangeColor(colors_filter) {

        console.log(colors_filter);

        switch (colors_filter) {
            case "Original":
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) { return  colorPicker(2); });
                break;

            case "Clusters":
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) { return color(d.D_C1); });
                break;

            case "PC10":
                
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) { if (d.DN_PC_dist_10 > 3) 
                                                    {return colorPicker(1);}
                                                 else
                                                    { return colorPicker(5); }                      
                   });
                break;
            case "DN_T2_Hourly":
                
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) {
                       if (d.DN_T2_Hourly_Flag == 1)
                       { return colorPicker(1); }
                       else
                       { return colorPicker(5); }
                   });
                break;
            case "T2_MDS":
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) {
                       if (d.T2_MDS_Flag == 1)
                       {
                           console.log(d.T2_MDS_Flag);
                           return colorPicker(1);
                       }
                       else
                       { return colorPicker(5); }
                   });
                break;
            case "T2_Growth":
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) {
                       if (d.T2_Growth_Flag == 1)
                       { return colorPicker(1); }
                       else
                       { return colorPicker(5); }
                   });
                break;

            default:
                svg.selectAll(".dot")
                   .data(data1)
                svg.selectAll('circle')
                   .transition()
                   .ease('linear')
                   .duration(1000)
                   .style("fill", function (d) { return  colorPicker(1); });
                break;

        }

    }

    //================= Update chart =====================
    function Update_chart() {

        data = outliers_matrix;

        var corr_y = d3.select('#x').node().value;
        var corr_x = d3.select('#y').node().value;
        
        data.forEach(function (d) {
            Object.keys(data[0]).forEach(function (k) {
                if (k != "grade" & k != "grade_auto")
                { d[k] = +Math.round(d[k] * 100) / 100; }
            });

            d["corr_sum"] = +d[corr_y];  ///corr_y
            d["corr_sum_square"] = +d[corr_x]; //corr_x
        });

       var data1 = data.filter(function (d) { return isNaN(d.corr_sum) === false });

        x.domain([d3.min(data1, function (d) { return d["corr_sum"]; }), d3.max(data1, function (d) { return d["corr_sum"]; })]).nice();
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
          .attr("cy", function (d) { return y(d["corr_sum_square"]); })
          .style("fill", function (d) { return colorPicker_grade(d["grade"]); });
   }

    //================= events =====================
     $("#btn_go").click(function () {
         Update_chart();
     });

    d3.select("#value_base").on("change", function () {
        Update_chart();
    });

    d3.select("#x").on("change", function () {
        Update_chart();
    });

    d3.select("#y").on("change", function () {
        Update_chart();
    });
    d3.select("#dot_colors").on("change", function () {
        ChangeColor(d3.select('#dot_colors').node().value);
    });

    
    });


