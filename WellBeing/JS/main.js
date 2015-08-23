



function Setfooter() {

    var footerHTML = "<div class='left'><img src='Images/wb.JPG' /></div>" +
                     "<div class='left'><h2>data from: </h2><a href='http://stats.oecd.org/index.aspx?DatasetCode=BLI' target='_blank'><img src='Images/OECD.JPG' /></a></div>" +
                     "<div class='left'><a href='http://www.oecd.org/statistics/OECD-Better-Life-Index-2015-definitions.pdf' target='_blank' style='font-size: 12px; font-weight: bold; color: #e0e0e0;'><br /><h2>Detailed<br />Indicators<br/>Definitions</h2></a></div>";
    return footerHTML;

}


function Setnav() {

    var navHTML = "<div class='left'> <h1>Visualizing Well-being</h1></div>" +
                  "<ul>" +
                  "<li><a href='Index.html' id='btn_Home' class='btn btn-wb'>Home</a></li>" +
                  "<li><a href='indicator.html' id='btn_byIndicator' class='btn btn-wb'>by Indicator</a></li>" +
                  "<li><a href='country.html' id='btn_byCountry' class='btn btn-wb'>by Country</a></li>" +
                  "<li><a href='heatmap.html' id='btn_heatmap' class='btn btn-wb'>Heatmap</a></li>" +
                  "<li><a href='Summary.html' id='btn_Summary' class='btn btn-wb'>Summary</a></li>" +
                  "<li><a href='about.html' id='btn_About' class='btn btn-wb'>About</a></li>" +
                  "</ul>";
    return navHTML;
    
}