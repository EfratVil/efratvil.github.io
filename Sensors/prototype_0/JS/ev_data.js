
//---------------------------------------
//         Sensors data
//---------------------------------------

var sensors = [];

d3.csv("data/sensors_features.csv", function (error, data) {
    if (error) throw error;
    data.forEach(function (d) {
        d["sensor_id"] = +d["sensor_id"];
        d["project_id"] = +d["project_id"];
        d["logger_id"] = +d["logger_id"];
        d["Negative_Days"] = +d["Negative_Days"];
        d["Days_Above_9900"] = +d["Days_Above_9900"];
        d["Days_Above_9500"] = +d["Days_Above_9500"];
        d["Setup_days"] = +d["Setup_days"];
        d["Flat_days"] = +d["Flat_days"];
        d["Cnt_Days_10X"] = +d["Cnt_Days_10X"];
        d["Cnt_Days_20X"] = +d["Cnt_Days_20X"];
        d["Cnt_Days_30X"] = +d["Cnt_Days_30X"];
        d["Cnt_Days_40X"] = +d["Cnt_Days_40X"];
        d["Class"] = d["Class"];
    });

    sensors = data;

});

var sensors_daily = [];

d3.csv("data/sensors_daily_features.csv", function (error, data) {
    if (error) throw error;   
    data.forEach(function (d) {
        d["day_ID"] = +d["day_ID"];
        d["sensor_id"] = +d["sensor_id"];
        d["project_id"] = +d["project_id"];
        d["logger_id"] = +d["logger_id"];
        d["Count_All"] = +d["Count_All"];
        d["Count_Hourly"] = +d["Count_Hourly"];
        d["Count_Mornning"] = +d["Count_Mornning"];
        d["Count_Noon"] = +d["Count_Noon"];
        d["Data_Negative"] = +d["Data_Negative"];
        d["Data_Above_9900"] = +d["Data_Above_9900"];
        d["Data_Above_9500"] = +d["Data_Above_9500"];
        d["Data_Below_100"] = +d["Data_Below_100"];
        d["Daily_Avg"] = +d["Daily_Avg"];
        d["Daily_Max"] = +d["Daily_Max"];
        d["Daily_Min"] = +d["Daily_Min"];
        d["Max_Hourly_Gap"] = +d["Max_Hourly_Gap"];
        d["Calibration_Day"] = +d["Calibration_Day"];
        d["Daily_Max_Morning"] = +d["Daily_Max_Morning"];
        d["Daily_Min_Noon"] = +d["Daily_Min_Noon"];
        d["Growth"] = +d["Growth"];
        d["zone_Growth"] = +d["zone_Growth"]
        d["MDS"] = +d["MDS"];
        d["zone_MDS"] = +d["zone_MDS"];
        d["Grade"] = +d["Grade"];
        d["Include_Flag"] = d["Include_Flag"];

    });

    sensors_daily = data;

});



var projects = [];

d3.csv("data/projects.csv", function (error, data) {
    if (error) throw error;
  
     data.forEach(function (d) {
         d["project_id"] = +d["project_id"];
         d["Sensors_cnt"] = +d["Sensors_cnt"];
         d["Sensors_A_cnt"] = +d["Sensors_A_cnt"];
         d["Sensors_B_cnt"] = +d["Sensors_B_cnt"];
         d["Sensors_C_cnt"] = +d["Sensors_C_cnt"];
        // d["logger_id"] = +d["logger_id"];
         d["zan"] = +d["zan"];
         d["du_gidul"] = +d["du_gidul"];
         d["kav_noa"] = +d["kav_noa"];
    });

    projects = data;

});


var MDS_wide = [];

d3.csv("data/all_Sensors_MDS_wide.csv", function (error, data) {
    if (error) throw error;

    MDS_wide = data;

});


var Growth_wide = [];

d3.csv("data/all_Sensors_Growth_wide.csv", function (error, data) {
    if (error) throw error;

    Growth_wide = data;

});
