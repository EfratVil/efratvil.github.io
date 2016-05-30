
// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 30, left: 55 },
   width = 660 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


var colors = ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"];

var color = d3.scale.ordinal()
    .range(colors);


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
  d3.csv("../data/outliers_Week9.csv", function (error, data) {
      if (error) throw error;

   data.forEach(function (d) {
        Object.keys(data[0]).forEach(function (k) {
            if (k != "grade" & k != "grade_auto")
            { d[k] = +Math.round(d[k] * 100) / 100; }
        });
        d["corr_sum"] = +d["nds_wt_CM_Avg_Sum"];  ///corr_y
        d["corr_sum_square"] = +d["nds_wt_CM_Avg_Sum_Square"]; //corr_x  nds_wt_PC_dist_10
    });

 
 //  console.log(data);
  



   var width = 960,
       height = 500;

   var fill = d3.scale.category10();
      //sensor_id,nds_wt_CM_Sum,nds_wt_CM_Sum_Square,nds_wt_CM_Avg_Sum,nds_wt_CM_Avg_Sum_Square,nds_wt_CM_T2,nds_wt_CM_T2_Flag,nds_wt_PC1,nds_wt_PC2,nds_wt_PC3,nds_wt_PC4,nds_wt_PC5,nds_wt_PC6,nds_wt_PC7,nds_wt_PC8,nds_wt_PC9,nds_wt_PC10,nds_wt_PC_dist_2,nds_wt_PC_dist_3,nds_wt_PC_dist_5,nds_wt_PC_dist_7,nds_wt_PC_dist_10,nd_wt_CM_Sum,nd_wt_CM_Sum_Square,nd_wt_CM_Avg_Sum,nd_wt_CM_Avg_Sum_Square,nd_wt_CM_T2,nd_wt_CM_T2_Flag,nd_wt_PC1,nd_wt_PC2,nd_wt_PC3,nd_wt_PC4,nd_wt_PC5,nd_wt_PC6,nd_wt_PC7,nd_wt_PC8,nd_wt_PC9,nd_wt_PC10,nd_wt_PC_dist_2,nd_wt_PC_dist_3,nd_wt_PC_dist_5,nd_wt_PC_dist_7,nd_wt_PC_dist_10,nd_CM_Sum,nd_CM_Sum_Square,nd_CM_Avg_Sum,nd_CM_Avg_Sum_Square,nd_CM_T2,nd_CM_T2_Flag,nd_PC1,nd_PC2,nd_PC3,nd_PC4,nd_PC5,nd_PC6,nd_PC7,nd_PC8,nd_PC9,nd_PC10,nd_PC_dist_2,nd_PC_dist_3,nd_PC_dist_5,nd_PC_dist_7,nd_PC_dist_10,nw_CM_Sum,nw_CM_Sum_Square,nw_CM_Avg_Sum,nw_CM_Avg_Sum_Square,nw_CM_T2,nw_CM_T2_Flag,nw_PC1,nw_PC2,nw_PC3,nw_PC4,nw_PC5,nw_PC6,nw_PC7,nw_PC8,nw_PC9,nw_PC10,nw_PC_dist_2,nw_PC_dist_3,nw_PC_dist_5,nw_PC_dist_7,nw_PC_dist_10,grade_auto,grade

   var nodes = data.map(function (d) {
       return { index: +d.sensor_id,
           sensor_id: +d.sensor_id,
           cm_avg: +d.nds_wt_CM_Avg_Sum_Square*10
       };
   });

   //var nodes = d3.range(100).map(function (i) {
   //    return { index: i };
   //});

   console.log(nodes);
   console.log(color(4.3));

   var force = d3.layout.force()
       .nodes(nodes)
       .size([width, height])
       .on("tick", tick)
       .start();

   var svg = d3.select("body").append("svg")
       .attr("width", width)
       .attr("height", height);

   var node = svg.selectAll(".node")
       .data(nodes)
     .enter().append("circle")
       .attr("class", "node")
       .attr("cx", function (d) { return d.x; })
       .attr("cy", function (d) { return d.y; })
       .attr("r", 8)
       .style("fill", function (d) { return color(d.cm_avg); })
       .style("stroke", function (d) { return color(d.cm_avg); })
       .on("mouseover", function (d) {
           tooltip.transition()
               .duration(500)
               .style("opacity", .9);
           tooltip.html("index: " + d.sensor_id)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
       })
    .on("mouseout", function (d) {
        tooltip.transition()
               .duration(500)
               .style("opacity", 0);
    })
       .call(force.drag)
       .on("mousedown", function () { d3.event.stopPropagation(); });

   svg.style("opacity", 1e-6)
     .transition()
       .duration(1000)
       .style("opacity", 1);

   d3.select("body")
       .on("mousedown", mousedown);

   function tick(e) {

       // Push different nodes in different directions for clustering.
       var k = 6 * e.alpha;
       nodes.forEach(function (o, i) {
           o.y += i & 1 ? k : -k;
           o.x += i & 2 ? k : -k;
       });

       node.attr("cx", function (d) { return d.x; })
           .attr("cy", function (d) { return d.y; });
   }

   function mousedown() {
       nodes.forEach(function (o, i) {
           o.x += (Math.random() - .5) * 40;
           o.y += (Math.random() - .5) * 40;
       });
       force.resume();
   }
    
    });


