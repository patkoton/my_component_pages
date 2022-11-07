document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.sidebar .nav-link').forEach(function(element){
      
      element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl  = element.parentElement;	

          if(nextEl) {
              e.preventDefault();	
              let mycollapse = new bootstrap.Collapse(nextEl);
              
              if(nextEl.classList.contains('show')){
              mycollapse.hide();
              } else {
                  mycollapse.show();
                  // find other submenus with class=show
                  var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                  // if it exists, then close all of them
                  if(opened_submenu){
                  new bootstrap.Collapse(opened_submenu);
                  }
              }
          }
      }); // addEventListener
  })
}); 




window.onload = function () {

  var dataPoints = [];
  
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    title: {
      text: "Stock Price"
    },
    subtitles: [{
      text: ""
    }],
    axisX: {
      interval: 1,
      valueFormatString: "MMM"
    },
    axisY: {
      prefix: "$",
      title: "Price"
    },
    toolTip: {
      content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
    },
    data: [{
      type: "candlestick",
      yValueFormatString: "$##0.00",
      dataPoints: dataPoints
    }]
  });
  
  $.get("https://canvasjs.com/data/gallery/javascript/netflix-stock-price.csv", getDataPointsFromCSV);
  
  function getDataPointsFromCSV(csv) {
    var csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);
    for (var i = 0; i < csvLines.length; i++) {
      if (csvLines[i].length > 0) {
        points = csvLines[i].split(",");
        dataPoints.push({
          x: new Date(
            parseInt(points[0].split("-")[0]),
            parseInt(points[0].split("-")[1]),
            parseInt(points[0].split("-")[2])
          ),
          y: [
            parseFloat(points[1]),
            parseFloat(points[2]),
            parseFloat(points[3]),
            parseFloat(points[4])
          ]
        });
      }
    }
    chart.render();
  }
  
  }