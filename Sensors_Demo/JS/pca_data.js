
//---------------------------------------
//       PCA data  
//---------------------------------------


var pca_eig = [];

function get_pca_eig_ww(ww) {

        d3.csv("data/pca_eig_" + ww + ".csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d) {
            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
                d[k] = +d[k];
            });
        });

        pca_eig = data;
       // console.log(ds);
    });
}

get_pca_eig_ww("Week9");


var pca_rotations = [];
http://localhost:58217/../data/pca_rotations_Week9.csv
    function get_pca_rotations_ww(ww) {

    d3.csv("data/pca_rotations_" + ww + ".csv", function (error, data) {
        if (error) throw error;

        data.forEach(function (d,i) {
            
            Object.keys(data[0]).filter(function (k) { return k != "datetime" }).forEach(function (k) {
                d[k] = +d[k];
            });
        });

        pca_rotations = data;
        // console.log(ds);
    });
}

get_pca_rotations_ww("Week9");

