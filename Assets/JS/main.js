



function Setfooter() {

    var footerHTML = "<div class='left' style='text-align: left; padding-left: 0;  font-size: 18px;'>Powered by:<br/><img src='Images/d3.jpg' /></div>";
    return footerHTML;

}


function Setnav() {

    var navHTML = "<div class='left'> <h1>Assets Demo</h1></div>" +
                  "<ul>" +
                  "<li><a href='Index.html' id='btn_Legend' class='btn btn-wb'>Legend</a></li>" +
                  "<li><a href='Assets.html' id='btn_Assets' class='btn btn-wb'>Assets</a></li>" +
                  "<li><a href='Regression1.html' id='btn_Regression' class='btn btn-wb'>Reg</a></li>" +
                  "<li><a href='Correlation.html' id='btn_Correlation' class='btn btn-wb'>Correlation</a></li>" +
                  "<li><a href='parcoords.html' id='btn_parcoords' class='btn btn-wb'>ParCoords</a></li>" +
                  "<li><a href='About.html' id='btn_About' class='btn btn-wb'>About</a></li>" +
                  "</ul>";
    return navHTML;
    
}