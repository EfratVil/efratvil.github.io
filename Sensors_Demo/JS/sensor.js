function sensor_graphs() {

    var ds1 = dsp.filter(function (d) { return d.sensor_id == $("#Sensor_input").val(); });
    // console.log(ds1);
    sensors_ds = ds1.map(function (d, i) {
        return {
            index: i + 1,
            A_nor_value: +d.nor_value,
            Mean_A_nor_value: d3.mean(ds1, function (d) { return d.nor_value; }),
            A_nor_daily: +d.nor_daily,
            Mean_A_nor_daily: d3.mean(ds1, function (d) { return d.nor_daily; }),
            A_nd_wt_value: +d.nd_wt_value,
            Mean_A_nd_wt_value: d3.mean(ds1, function (d) { return d.nd_wt_value; }),
            A_nds_wt_value: +d.nds_wt_value,
            Mean_A_nds_wt_value: d3.mean(ds1, function (d) { return d.nds_wt_value; })
        };
    });


    var ll1 = ll.map(function (d, i) {
        return {
            index: i + 1,
            mean: +d.mean,
            median: +d.median,
            mve: +d.mve,
            mcd: +d.mcd,
            sensor: +d[$("#Sensor_input").val()]
        };
    });


    $("#charts").html("");

    // Correlation Matrix Graph
    cm1 = cm.map(function (d, i) {
        return {
            x: i + 1,
            y: cm[i][$("#Sensor_input").val()]
        };
    });

    cm1.sort(function (a, b) { return (b.y) - (a.y); });


    $("#charts").append("<div class='info-box' id='g1'><h4>Raw sensor</h4></div>");
    //create_Line_chart_2_vars({ data: sensors_ds, chart: "g1", x_ds: "index", y1_ds: "A_nor_value", y2_ds: "Mean_A_nor_value", width: 650, height: 260 });
    Line_chart_time_ID("g1", sensors_ds, "index", "A_nor_value", 650, 260);

    $("#charts").append("<div class='info-box' id='l2'><h4>Normalized without trend compared to location estimate - (Dist " + arrays_distance(ds_col_to_array(ll1, "sensor"), ds_col_to_array(ll1, "mcd")) + ")</h4></div>");
    create_Line_chart_2_vars({ data: ll1, chart: "l2", x_ds: "index", y1_ds: "sensor", y2_ds: "mcd", width: 650, height: 260 });


    $("#charts").append("<div class='info-box' id='g0'><h4>Ordered correlation with the other ~400 sensors</h4></div>");
    Simple_bar_chart1("g0", cm1, "x", "y", 1080, 220)


    $("#charts").append("<div class='info-box' id='g3'><h4>Daily Raw without Trend</h4></div>");
    create_Line_chart_2_vars({ data: sensors_ds, chart: "g3", x_ds: "index", y1_ds: "A_nd_wt_value", y2_ds: "Mean_A_nd_wt_value", width: 650, height: 260 });


    $("#charts").append("<div class='info-box' id='g4'><h4>Standardized Daily Raw without Trend</h4></div>");
    create_Line_chart_2_vars({ data: sensors_ds, chart: "g4", x_ds: "index", y1_ds: "A_nds_wt_value", y2_ds: "Mean_A_nds_wt_value", width: 650, height: 260 });



}