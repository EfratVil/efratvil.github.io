


//var sensors = [];

//d3.csv("data/sensors_features.csv", function (error, data) {
//    if (error) throw error;

//    console.log(data);

//    data.forEach(function (d) {
//        d["sensor_id"] = +d["sensor_id"];
//        d["project_id"] = +d["project_id"];
//        d["logger_id"] = +d["logger_id"];
//        d["Data_Count"] = +d["Data_Count"];
//        d["Negative_Days"] = +d["Negative_Days"];
//        d["Days_Above_9900"] = +d["Days_Above_9900"];
//        d["Days_Above_9500"] = +d["Days_Above_9500"];
//        d["Setup_days"] = +d["Setup_days"];
//        d["Flat_days"] = +d["Flat_days"];
//        d["Cnt_Days_10X"] = +d["Cnt_Days_10X"];
//        d["Cnt_Days_20X"] = +d["Cnt_Days_20X"];
//        d["Cnt_Days_30X"] = +d["Cnt_Days_30X"];
//        d["Class1"] = d["Class1"];
//    });
//    sensors = data;
//});


//var sensor_data_short = [];

//d3.csv("data/sensors_data_short1.csv", function (error, data) {
//    if (error) throw error;

//    var parseDate = d3.time.format("%m/%d/%Y hh:mm").parse;

//    data.forEach(function (d) {
//        // d.date = parseDate(d.datetime);
//         d["sensor_id"] = +d["sensor_id"];
//         d["value"] = +d["value"];
//    });

//    sensor_data_short = data;
   
//});


//var sensor_data = [];

//d3.csv("data/sensor_data1.csv", function (error, data) {
//    if (error) throw error;

//   var parseDate = d3.time.format("%m/%d/%Y hh:mm").parse;

//    data.forEach(function (d) {
//        // d.date = parseDate(d.datetime);
//        d["sensor_id"] = +d["sensor_id"];
//        d["value"] = +d["value"];
//    });

//    sensor_data = data;

//});




var sensor_data_new = [];

d3.csv("data/sensor_data1_new.csv", function (error, data) {
    if (error) throw error;

    var parseDate = d3.time.format("%m/%d/%Y hh:mm").parse;

    data.forEach(function (d) {
        // d.date = parseDate(d.datetime);
        d["sensor_id"] = +d["sensor_id"];
        d["value"] = +d["value"];
    });

    sensor_data_new = data;

});



//var sensor_data_short_tst = [];

//d3.csv("data/sensor_data1.csv", function (error, data) {
//    if (error) throw error;

//    var parseDate = d3.time.format("%m/%d/%Y hh:mm").parse;

//    data.forEach(function (d) {
//        // d.date = parseDate(d.datetime);
//        d["sensor_id"] = +d["sensor_id"];
//        d["value"] = +d["value"];
//    });

//    sensor_data_short_tst = data;

//});


