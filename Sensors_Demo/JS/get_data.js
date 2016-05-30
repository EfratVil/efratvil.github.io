
//---------------------------------------
//         Create sensors graphs
//---------------------------------------

$("#sensor_id").change(function () {

    // clean up of old graphs
    $("#graphdiv5").html("");
    $("#graphdiv6").html("");
    //$("#raw_graph").html("raw values");
    //$("#nds_wt_graph").html("Daily Nor - with out trend");

    sensor = $("#sensor_id").html();
    $("#sensor_id").html("<a href='sensor.html?sensor_id=" + sensor + "' target='_blank'>" + sensor + "</a>");
    var ds1 = dsp.filter(function (d) { return d.sensor_id == sensor; });

    var sensor_data = ds1.map(function (d, i) {
        return {    
            index: i + 1,
            value: d.nds_wt_value,
            nor_value: d.nor_value
        };
    });
    $("#graphdiv5").append("<strong>Raw Sensor</strong>");
    Line_chart_time_ID("graphdiv5", sensor_data, "index", "nor_value", 300, 140);
  //  create_Linr_chart_2_vars("graphdiv6", sensor_data, "index", "value", "value", 300, 140);
    $("#graphdiv6").append("<strong>Without Trend & Normilized daily</strong>");
    Line_chart_time_ID("graphdiv6", sensor_data, "index", "value", 300, 140);

//    create_Line_chart_2_vars({ data: sensor_data, chart: "graphdiv6", x_ds: "index", y1_ds: "value", y2_ds: "value", width: 300, height: 140 });


    //Line_chart_time_ID("graphdiv6", sensor_data, "index", "value", 300, 140);

    //var ll1 = ll.map(function (d, i) {
    //    return {
    //        index: i + 1,
    //        mean: +d.mean,
    //        median: +d.median,
    //        mve: +d.mve,
    //        mcd: +d.mcd,
    //        sensor: +d[$("#sensor_id").html()]
    //    };
    //});

    //create_Line_chart_2_vars({ data: ll1, chart: "graphdiv5", x_ds: "index", y1_ds: "sensor", y2_ds: "mcd", width: 500, height: 240 });


});


//---------------------------------------
//         sensors hourly values
//---------------------------------------

var dsp = [];

function get_ds_ww(ww) {

    d3.csv("data/raw/raw_" + ww + "_new.csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d) {
            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
                d[k] = +d[k];
            });
        });

        dsp = data;
       // console.log(ds);
    });
}
get_ds_ww("Week9");


//---------------------------------------
//         Outliers Matrix data
//---------------------------------------
var outliers_matrix = [];
function get_outliers(ww) {

    d3.csv("data/outliers_" + ww + ".csv", function (error, data) {
        if (error) throw error;
        
        //.filter(function (k) { return k != "grade" })
        data.forEach(function (d) {
            Object.keys(data[0]).forEach(function (k) {
                if (k != "grade" & k != "grade_auto")
                    {d[k] = +Math.round(d[k] * 100) / 100;}
            });
        });
      outliers_matrix = data;
     
    });
}
get_outliers("Week9");

function ww_dd() {

    var html = '';
    html += "Select Week:&nbsp&nbsp";
    html += "<select id='week'>";
    html += "<option value='Week1'>Week1</option>";
    html += "<option value='Week2'>Week2</option>";
    html += "<option value='Week3'>Week3</option>";
    html += "<option value='Week4'>Week4</option>";
    html += "<option value='Week5'>Week5</option>";
    html += "<option value='Week6'>Week6</option>";
    html += "<option value='Week7'>Week7</option>";
    html += "<option value='Week8'>Week8</option>";
    html += "<option selected value='Week9'>Week9</option>";
    html += "<option value='Week10'>Week10</option>";
    html += "<option value='Week11'>Week11</option>";
    html += "<option value='Week12'>Week12</option>";
    html += "<option value='Week13'>Week13</option>";
    html += "<option value='Week14'>Week14</option>";
    html += "<option value='Week15'>Week15</option>";
    html += "</select>";
    return html;
}



////---------------------------------------
////         Get Cor Matrix
////---------------------------------------
var cm = [];
function get_cm() {

    d3.csv("data/cor/cor_nds_wt_week9.csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d) {
            Object.keys(data[0]).forEach(function (k) {
                d[k] = +d[k];
            });
        });

        cm = data;
        // console.log(cm);
    });
}
get_cm();

//---------------------------------------
//         Get location
//---------------------------------------
var ll = [];
function get_location() {
        d3.csv("data/raw/location_Week9.csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d,i) {
            index: i + 1;
            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {

                d[k] = +d[k];
            });
        });

        ll = data;
       // console.log(location);
    });
}
get_location();


//---------------------------------------
//         Get edges
//---------------------------------------
var edges = [];
function get_edges() {
    d3.csv("data/edges_week9.csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d, i) {
            index: i + 1;
            Object.keys(data[0]).forEach(function (k) {

                d[k] = +d[k];
            });
        });

        edges = data;
        // console.log(location);
       // console.log(edges);
    });
}
get_edges();
