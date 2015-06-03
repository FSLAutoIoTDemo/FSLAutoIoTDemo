function initGraphs() {
    drawSpeedPieChart(), drawAccelChart();
}

function drawSpeedPieChart() {
    speedPieData = google.visualization.arrayToDataTable([ [ "segment", "speed" ], [ "bottom", 90 ], [ "mph", 0 ], [ "empty", 270 ] ]), 
    speedPieOptions = {
        pieHole: .5,
        chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%"
        },
        legend: "none",
        pieSliceText: "none",
        enableInteractivity: !1,
        tooltip: {
            trigger: "none"
        },
        pieStartAngle: 135,
        slices: {
            0: {
                color: "transparent"
            },
            1: {
                color: cssSppedPieFill
            },
            2: {
                color: cssSppedPieSemiTransparent
            }
        },
        backgroundColor: "transparent",
        pieSliceBorderColor: "transparent"
    }, speedPiechart = new google.visualization.PieChart($("#vd-Speed-obj")[0]), speedPiechart.draw(speedPieData, speedPieOptions), 
    setInterval(updateSpeedData, 1e3);
}

function updateSpeedData() {
    var a = Math.floor(Math.random() * maxSpeed);
    if (a > maxSpeed) throw "Error: Speed value is greater than max speed";
    a *= 2.25, speedPieData.setValue(1, 1, a), speedPieData.setValue(2, 1, 270 - a), 
    speedPiechart.draw(speedPieData, speedPieOptions), $("#vd-Speed-speedtext").text(a);
}

function drawAccelChart() {
    accelLinedata = google.visualization.arrayToDataTable([ [ "Time", "X-Axis", "Y-Axis" ], [ 0, .003, -.185 ], [ 1, -.026, .971 ], [ 2, -.085, .095 ], [ 3, .655, -.077 ], [ 4, .048, .015 ], [ 5, .095, -.213 ], [ 6, -.426, .609 ], [ 7, .19, .032 ], [ 8, .04, .001 ] ]), 
    accelLineoptions = {
        title: "G-Forces",
        titleTextStyle: {
            color: "white",
            fontSize: 20,
            fontName: "Roboto"
        },
        hAxis: {
            baselineColor: "transparent",
            gridlines: {
                count: 0
            },
            viewWindow: {
                min: 0,
                max: dataPoints - 1
            }
        },
        legend: "none",
        vAxis: {
            baselineColor: "white",
            maxValue: 1,
            minValue: -1,
            gridlines: {
                count: 0
            }
        },
        chartArea: {
            left: 0,
            top: 0,
            width: "100%",
            height: "100%"
        },
        animation: {
            duration: 750,
            easing: "out",
            startup: !1
        },
        backgroundColor: "#6f6fcc",
        series: {
            0: {
                color: "#f2f4f6",
                visibleInLegend: !0
            },
            1: {
                color: "#c4e4ee",
                visibleInLegend: !0
            }
        }
    }, accelLinegraph = new google.visualization.AreaChart($("#vd-Accel-obj")[0]), accelLinegraph.draw(accelLinedata, accelLineoptions), 
    setInterval(updateAccelData, 1e3);
}

function updateAccelData() {
    if (accelLinedata.addRows([ [ loopCount, 2 * Math.random() - 1, 2 * Math.random() - 1 ] ]), 
    accelLineoptions.hAxis.viewWindow.min += 1, accelLineoptions.hAxis.viewWindow.max += 1, 
    1e3 == loopCount) {
        accelLineoptions.hAxis.viewWindow.min = 0, accelLineoptions.hAxis.viewWindow.max = dataPoints - 1, 
        accelLineoptions.animation.duration = 0, accelLinedata.removeRows(0, loopCount + 1 - dataPoints);
        for (var a = 0; dataPoints > a; a++) accelLinedata.setValue(a, 0, a);
        return accelLinegraph.draw(accelLinedata, accelLineoptions), loopCount = dataPoints, 
        void (accelLineoptions.animation.duration = 750);
    }
    loopCount++, accelLinegraph.draw(accelLinedata, accelLineoptions);
}

var maxSpeed = 120, cssSppedPieSemiTransparent = "#004461", cssSppedPieFill = "#ffffff", dataPoints = 9, loopCount = dataPoints;