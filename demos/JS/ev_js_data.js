//---------------------------------------------------------------------------------
// Version 0_1
//---------------------------------------------------------------------------------

// Create random normal data set with mean = 0 and std =1
function randomData(samples) {
    var data = [],
        random = d3.randomNormal();

    for (i = 0; i < samples; i++) {
        data.push({
            id: i + 1,
            x: d3.format(".3")(random()) // Todo!!!!!!!!!!! not rounding well
        });
    }
    return data;
}

// check numbertofixed !!!!!!!!!!!!
// Todo!!!!!! Test this function froun rounding
// source: http://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
function precise_round(num, decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}



function randomData_w_outliers(samples, Outliers) {
    var data = [],
        random = d3.randomNormal();

    for (i = 0; i < samples; i++) {
        data.push({
            id: i + 1,
            x: random() // d3.round(random(), 2)    Todo!!!!!!!!!!!
        });
    }

    var Outlier = 0;
    for (i = 0; i < Outliers+1; i++) {
        Outlier = Math.round(Math.random() * samples);
        data[Outlier]["x"] = data[Outlier]["x"] + 8;
    }

    return data;
    
}

function randomData_2_vars(samples) {
    var data = [],
        random = d3.randomNormal();

    for (i = 0; i < samples; i++) {
        data.push({
            id: i + 1,
            x: d3.format(".3")(random()),
            y: d3.format(".3")(random())
        });
    }
    return data;
}


//Takes one col of data set and stringify to view values of col as a string
function stringify_col(ds, col) {
    var col_arr = [];

    for (var i = 0; i < ds.length; i++) {
        col_arr.push(" " + ds[i][col]);
    }

    return col_arr;
}

//----------> same as above function!!
//Takes one col of data set and stringify to view values of col as a string
function ds_col_to_array(ds, col) {
    var col_arr = [];

    for (var i = 0; i < ds.length; i++) {
        col_arr.push(+ds[i][col]);
    }

    return col_arr;
}


//takes 2 arrays of the same length and returns the one array of diffrence between them
function arrays_diff(array1, array2) {
    var arrays_diff = [];

    for (var i = 0; i < array1.length; i++) {
        arrays_diff.push(array1[i] - array2[i]);
    }

    return arrays_diff;
}

//takes 2 arrays of the same length and returns the euclidian distance between them
function arrays_distance(array1, array2) {
    var arrays_dist = 0;

    for (var i = 0; i < array1.length; i++) {
        arrays_dist += (array1[i] - array2[i]) * (array1[i] - array2[i]);
    }
    return Math.sqrt(arrays_dist).toFixed(1);
}

//Returns data set col names
function ds_cols(ds) {
    //Object.keys(data1[0]).filter(function (k) { return k != "State" })
    return Object.keys(ds[0])
}

// source: http://stackoverflow.com/questions/1960473/unique-values-in-an-array
// Todo: review
function distinct(arr) {
    arr.sort();
    var last_i;
    for (var i = 0; i < arr.length; i++)
        if ((last_i = arr.lastIndexOf(arr[i])) !== i)
            arr.splice(i + 1, last_i - i);
    return arr;
}

//-------------------------------------------------------------------------------------------------
// Rodust estimate for variance that is not influenced by outliers
//-------------------------------------------------------------------------------------------------
function mad(arr) {
    var res_arr = [];
    var median_arr = d3.median(arr);

    for (var i = 0; i < arr.length; i++) {
        res_arr.push(+Math.abs(arr[i] - median_arr));
    }
    return d3.median(res_arr)*1.4826;
}


// Function to get sum of array values
//function mad(arr) {
//    var mad = 0;
//    var median_arr = d3.median(arr);

//    for (var i = 0; i < arr.length; i++) {
//        mad +=(+Math.abs(arr[i] - median_arr));
//    }
//    return mad * 1.4826;
//}


function Table_From_DS_Wide(data) {
      
    var html = '<div>';             //class="table-responsive"
    html += '<table class="hovertable" >';    //gridtable         //table table-striped table-bordered table-hover
    html +=   '                                 <thead>';
    html += '                                      <tr >';

    if (data.length == 0) {
        return "<div>No records found.</div>";
    }

    for (var j = 0; j < Object.keys(data[0]).length; j++) {
        html += "<th style='padding: 2px;'>" + Object.keys(data[0])[j] + "</th>";
    }

    html +=   '                                    </tr>';
    html += '                                </thead>';
    html += '                                <tbody>';


    for (var i = 0; i < data.length; i++) {
        html += "<tr>";



        for (var j = 0; j < Object.keys(data[0]).length; j++) {

            html += "<td style='padding: 2px;'>" + data[i][Object.keys(data[0])[j]] + "</td>";
        }

        html += "</tr>";
    }

    html += "</table></div>";

    return html;
}

function Table_From_DS_Wide1(data,top) {

    var html = '<div class="table-responsive">';
    html += '<table class="table table-striped table-bordered table-hover">';
    html += '                                 <thead>';
    html += '                                      <tr>';

    for (var j = 0; j < Object.keys(data[0]).length; j++) {
        html += "<th style='padding: 2px;'>" + Object.keys(data[0])[j] + "</th>";
    }

    html += '                                    </tr>';
    html += '                                </thead>';
    html += '                                <tbody>';

    //TODO - set min of top or data.length
    //data.length
    for (var i = 0; i < top; i++) {
        html += "<tr>";


        for (var j = 0; j < Object.keys(data[0]).length; j++) {
            html += "<td style='padding: 2px;'>" + data[i][Object.keys(data[0])[j]] + "</td>";
        }

        html += "</tr>";
    }

    html += "</table></div>";

    return html;
}

//function Table_From_DS_Col(data) {

//    var html = '<div class="table-responsive">';
//    html += '<table class="table table-striped table-bordered table-hover">';

//    for (var j = 0; j < Object.keys(data[0]).length; j++) {
//        html += "<th>" + Object.keys(data[0])[j] + "</th>";
//    }

//    html += '                                <tbody>';

//    //TODO - set min of top or data.length
//    //data.length
//    for (var i = 0; i < top; i++) {
//        html += "<tr>";


//        for (var j = 0; j < Object.keys(data[0]).length; j++) {

//            html += "<td>" + data[i][Object.keys(data[0])[j]] + "</td>";
//        }

//        html += "</tr>";
//    }

//    html += "</table></div>";

//    return html;
//}