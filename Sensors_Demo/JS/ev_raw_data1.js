
////---------------------------------------
////         Sensors data
////---------------------------------------

//$("#sensor_id").change(function () {

//    // clean up of old graphs
//    $("#graphdiv5").html("");
//    $("#graphdiv6").html("");
//    $("#raw_graph").html("raw values");
//    $("#nds_wt_graph").html("Daily Nor - with out trend");

//    sensor = $("#sensor_id").html();
//    var ds1 = dsp.filter(function (d) { return d.sensor_id == sensor; });

//    var sensor_data = ds1.map(function (d, i) {
//        return {
//            index: i + 1,
//            value: d.nds_wt_value,
//            nor_value: d.nor_value
//        };
//    });
//    Line_chart_time_ID("graphdiv5", sensor_data, "index", "nor_value", 300, 140);
//    Line_chart_time_ID("graphdiv6", sensor_data, "index", "value", 300, 140);

//});



//var dsp = [];

//function get_ds_ww(ww) {

//    d3.csv("data/raw/raw_" + ww + "_new.csv", function (error, data) {
//        if (error) throw error;

//        data.forEach(function (d) {
//            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
//                d[k] = +d[k];
//            });
//        });

//        dsp = data;
//       // console.log(ds);
//    });
//}

//get_ds_ww("Week9");


////var raw_ww = [];

////function get_raw_ww(ww) {
    
////    d3.csv("data/raw/raw_" + ww + ".csv", function (error, data) {
////        if (error) throw error;

////        var parseDate = d3.time.format("%m/%d/%Y hh:mm").parse;

////        data.forEach(function (d) {
////            // d.date = parseDate(d.datetime);
////            d["sensor_id"] = +d["sensor_id"];
////            d["value"] = +d["value"];
////            //d["gap"] = +d["gap"];
////            d["nor_daily"] = +d["nor_daily"];
////        });

////        raw_ww = data;

////    });
////}

////get_raw_ww("Week9");


////var raw_wide_nor_daily = [];

////function get_raw_ww(ww) {

////    d3.csv("data/raw/" + ww + "_wide_by_Sensor_nor_value.csv", function (error, data) {
////        if (error) throw error;


////        data.forEach(function (d) {
////            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
////                d[k] = +d[k];
////            });
////        });
////        raw_wide_nor_daily = data;

////    });
////}

////get_raw_ww("Week9");


////var raw_wide_nor_daily = [];

////function get_raw_nor_daily_ww(ww) {

////    d3.csv("data/raw/" + ww + "_wide_by_Sensor_nor_daily.csv", function (error, data) {
////        if (error) throw error;


////        data.forEach(function (d) {
////            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
////                d[k] = +d[k];
////            });
////        });

////        raw_wide_nor_daily = data;

////    });
////}

////get_raw_nor_daily_ww("Week9");



//var raw_wide_nor_value = [];

//function get_raw_nor_value_ww(ww) {

//    d3.csv("data/raw/" + ww + "_wide_by_Sensor_nor_value.csv", function (error, data) {
//        if (error) throw error;


//        data.forEach(function (d) {
//            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
//                d[k] = +d[k];
//            });
//        });

//        raw_wide_nor_value = data;

//    });
//}

//get_raw_nor_value_ww("Week9");




//---------------------------------------
//         Outliers Matrix data
//---------------------------------------



var outliers_matrix = [];

function get_outliers(ww) {

    d3.csv("data/outliers_" + ww + "_2.csv", function (error, data) {
        if (error) throw error;

  
        data.forEach(function (d) {
            d['sensor_id'] = +d['sensor_id'];
            d['C1'] = +d['DN_C1'];
            d['PC1'] = +d['DN_PC1'];
            d['PC2'] = +d['DN_PC2'];
            d['PC3'] = +d['DN_PC3'];
            d['PC4'] = +d['DN_PC4'];
            d['PC5'] = +d['DN_PC5'];
            d['PC6'] = +d['DN_PC6'];
            d['PC7'] = +d['DN_PC7'];
            d['PC8'] = +d['DN_PC8'];
            d['PC9'] = +d['DN_PC9'];
            d['PC10'] = +d['DN_PC10'];
            d['PC_dist_2'] = +Math.round(d['DN_PC_dist_2'] * 100) / 100;
            d['PC_dist_3'] = +Math.round(d['DN_PC_dist_3'] * 100) / 100;
            d['PC_dist_5'] = +Math.round(d['DN_PC_dist_5'] * 100) / 100;
            d['PC_dist_7'] = +Math.round(d['DN_PC_dist_7'] * 100) / 100;
            d['PC_dist_10'] = +Math.round(d['DN_PC_dist_10'] * 100) / 100;
            d['CM_Sum'] = +d['DN_CM_Sum'];
            d['CM_Sum_Square'] = +d['DN_CM_Sum_Square'];
            d['CM_Sum_sd'] = +Math.round(d['DN_CM_Sum_sd'] * (-100)) / 100;
            d['CM_Sum_Square_sd'] = +Math.round(d['DN_CM_Sum_Square_sd'] * (-100)) / 100;
            d['T2_Hourly'] = +Math.round(d['DN_T2_Hourly'] * 100) / 100;
            d['T2_Hourly_Flag'] = +d['DN_T2_Hourly_Flag'];
            d['T2_MDS'] = +Math.round(d['T2_MDS']* 100) / 100;
            d['T2_MDS_Flag'] = +d['T2_MDS_Flag'];
            d['T2_Growth'] = +Math.round(d['T2_Growth']* 100) / 100;
            d['T2_Growth_Flag'] = +d['T2_Growth_Flag'];
            d['WN_C1'] = +d['WN_C1'];
            d['WN_PC1'] = +d['WN_PC1'];
            d['WN_PC2'] = +d['WN_PC2'];
            d['WN_PC3'] = +d['WN_PC3'];
            d['WN_PC4'] = +d['WN_PC4'];
            d['WN_PC5'] = +d['WN_PC5'];
            d['WN_PC6'] = +d['WN_PC6'];
            d['WN_PC7'] = +d['WN_PC7'];
            d['WN_PC8'] = +d['WN_PC8'];
            d['WN_PC9'] = +d['WN_PC9'];
            d['WN_PC10'] = +d['WN_PC10'];
            d['WN_PC_dist_2'] = +Math.round(d['WN_PC_dist_2'] * 100) / 100;
            d['WN_PC_dist_3'] = +Math.round(d['WN_PC_dist_3'] * 100) / 100;
            d['WN_PC_dist_5'] = +Math.round(d['WN_PC_dist_5'] * 100) / 100;
            d['WN_PC_dist_7'] = +Math.round(d['WN_PC_dist_7'] * 100) / 100;
            d['WN_PC_dist_10'] = +Math.round(d['WN_PC_dist_10'] * 100) / 100;

            d['WN_CM_Sum'] = +d['WN_CM_Sum'];
            d['WN_CM_Sum_Square'] = +d['WN_CM_Sum_Square'];
            d['WN_CM_Sum_sd'] = +Math.round(d['WN_CM_Sum_sd'] * (-100)) / 100;
            d['WN_CM_Sum_Square_sd'] = +Math.round(d['WN_CM_Sum_Square_sd'] * (-100)) / 100;

            d['DNT_CM_Sum'] = +d['DNT_CM_Sum'];
            d['DNT_CM_Sum_Square'] = +d['DNT_CM_Sum_Square'];
            d['DNT_CM_Sum_sd'] = +Math.round(d['DNT_CM_Sum_sd'] * (-100)) / 100;
            d['DNT_CM_Sum_Square_sd'] = +Math.round(d['DNT_CM_Sum_Square_sd'] * (-100)) / 100;

            d['WN_T2_Hourly'] = +Math.round(d['WN_T2_Hourly'] * 100) / 100;
            d['WN_T2_Hourly_Flag'] = +d['WN_T2_Hourly_Flag'];
            d['RZ_MDS_D1'] = +Math.round(d['RZ_MDS_D1'] * 100) / 100;
            d['RZ_MDS_D2'] = +Math.round(d['RZ_MDS_D2'] * 100) / 100;
            d['RZ_MDS_D3'] = +Math.round(d['RZ_MDS_D3'] * 100) / 100;
            d['RZ_MDS_D4'] = +Math.round(d['RZ_MDS_D4'] * 100) / 100;
            d['RZ_MDS_D5'] = +Math.round(d['RZ_MDS_D5'] * 100) / 100;
            d['RZ_Growth_D1'] = +Math.round(d['RZ_Growth_D1'] * 100) / 100;
            d['RZ_Growth_D2'] = +Math.round(d['RZ_Growth_D2'] * 100) / 100;
            d['RZ_Growth_D3'] = +Math.round(d['RZ_Growth_D3'] * 100) / 100;
            d['RZ_Growth_D4'] = +Math.round(d['RZ_Growth_D4'] * 100) / 100;
            d['RZ_Growth_D5'] = +Math.round(d['RZ_Growth_D5'] * 100) / 100;
        });

        //data.forEach(function (d) {
        //    Object.keys(data[0]).forEach(function (k) {
        //        d[k] = +d[k];
        //    });
        //});

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