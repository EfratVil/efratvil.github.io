
function init_settings() {
                 // $("head").html(Sethead());
                 $("header").html(Setheader());
                 $("nav").html(Setnav());
                 $("footer").html(Setfooter());
                
} 


function Setheader() {

    var headerHTML = "<div class='container'>" +
                          "<div class='navbar-header'>" +
                               "<h1>Sensors Demo</h1>" +
                          "</div>" +
                     "</div>";
    return headerHTML;

}


    function Setnav() {




        var navHTML = "<section class='menu-section'>" +
            "<div class='container'>" +
              "<div class='row'>" +
                "<div class='col-md-12'>" +

      "<div class='btn-group navbar-right'>" +
                      "<button type='button' class='btn btn-primary'><a id='intro' href='intro.html' style='color:white;'>Introduction</a></button>" +
                      "<div class='btn-group'>" +
                      "       <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>" +
                      "            Sensors<span class='caret'></span>" +
                      "       </button>" +
                      "         <ul class='dropdown-menu' role='menu'>" +
                      "           <li><a href='all_sensors.html'>All Sensors</a></li>" +
                      "           <li><a href='sensor_avg.html'>'Avg' Sensor</a></li>" +
                      "           <li><a href='Outliers.html'>Finding Outliers</a></li>" +
                      "           <li><a href='sensor.html?sensor_id=12890'>Sensor details</a></li>" +
                      "           <li><a href='../sensors/trend_outliers.html'>Trend Outliers</a></li>" +
                      "         </ul>" +
                      "</div>" +
                      "<button type='button' class='btn btn-primary'><a id='Hotelling' href='Hotelling.html' style='color:white;'>Hotelling</a></button>" +
                      "<div class='btn-group'>" +
                      "       <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>" +
                      "            PCA <span class='caret'></span>" +
                      "       </button>" +
                      "         <ul class='dropdown-menu' role='menu'>" +
                      "           <li><a href='PCA.html'>10 pc's Dist</a></li>" +
                      "           <li><a href='PCA_sd.html'>PCA pairs</a></li>" +
                      "         </ul>" +
                      "</div>" +
                      "<div class='btn-group'>" +
                      "       <button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>" +
                      "            Corr Matrix<span class='caret'></span>" +
                      "       </button>" +
                      "         <ul class='dropdown-menu' role='menu'>" +
                      "           <li><a href='corr_Matrix_view.html'>Matrix View</a></li>" +
                      "           <li><a href='Corr_Matrix.html'>Matrix summary</a></li>" +
                      "         </ul>" +
                      "</div>" +

                      "<button type='button' class='btn btn-primary'><a id='force' href='force.html' style='color:white;'>Graph Centrality</a></button>" +

        "</div> " +
                "</div>" +
              "</div>" +
            "</div>" +
        "</section>";


        //var navHTML = "<section class='menu-section'>" +
        //    "<div class='container'>" +
        //      "<div class='row'>" +
        //        "<div class='col-md-12'>" +
        //           "<div class='navbar-collapse collapse '>" +
        //              "<ul id='menu-top' class='nav navbar-nav navbar-right'>" +
        //              "<li><a id='intro' href='intro.html'>Introduction</a></li>" +
        //               "<li><a id='Hotelling' href='Hotelling.html'>Hotelling</a></li>" +
        //               "<li><a id='pca' href='PCA.html'>PCA</a></li>" +
        //               "<li><a id='pca_sd' href='PCA_sd.html'>PCA sd</a></li>" +
        //               "<li><a id='Corr_Matrix' href='Corr_Matrix.html'>Corr Matrix</a></li>" +
        //               "<li><a id='graph_cen' href='graph_centrality.html'>Graph Centrality</a></li>" +
        //               "<li><a id='Outliers' href='outliers.html' target='_blank'>Outliers</a></li>" +
        //            //  "<li><a id='Projects' href='Projects.html'>Projects</a></li>" +
        //            //  "<li><a id='Project_view' href='Project_view.html'>Project view</a></li>" +
        //             // "<li><a id='sensor_Summary' href='sensor_Summary.html'>sensor Summary</a></li>" +
        //             // "<li><a id='sensor_details' href='sensor_details.html'>sensor details</a></li>" +                      
        //              //"<li><a id='Daily_Scatterplot' href='Daily_Scatterplot.html'>Scatter</a></li>" +



        //               "<li><a id='Trend' href='Trend_Outliers.html' target='_blank'>Trend</a></li>" +

                       
        //           //   "<li><a id='Exp_bootstrap' href='exp_bootstrap.html'>Bootstrap</a></li>" +
        //          //    "<li><a id='Exp_loadash' href='exp_loadash.html'>loadash</a></li>" +

                     
        //              "</ul>" +
        //           "</div>" +
        //         "</div>" +
        //      "</div>" +
        //    "</div>" +
        //"</section>";
        return navHTML;

    }


    function Setfooter() {

        var footerHTML = "<div class='container'>"+
                              "<div class='row'>" +
                                   "<div class='col-md-12'>" +
                                        "&copy; 2016 | Demo By : <a href='#' target='_blank'>Efrat Vilenski</a>"+
                                    "</div>" +
                               "</div>" +
                         "</div>";
        return footerHTML;
    }







        
            
               
                    
                     
 
    