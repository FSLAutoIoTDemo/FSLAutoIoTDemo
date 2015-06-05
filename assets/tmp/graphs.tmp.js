function initGraphs(a, b) {
    drawInitSpeedPieChart(a), drawInitAccelChart(b);
}

function drawInitSpeedPieChart(a) {
    GLB.speedPieData = google.visualization.arrayToDataTable([ [ "segment", "speed" ], [ "bottom", 90 ], [ "mph", 0 ], [ "empty", 270 ] ]), 
    GLB.speedPieOptions = {
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
                color: GLB.cssSppedPieFill
            },
            2: {
                color: GLB.cssSppedPieSemiTransparent
            }
        },
        backgroundColor: "transparent",
        pieSliceBorderColor: "transparent"
    }, GLB.speedPiechart = new google.visualization.PieChart($(a)[0]), GLB.speedPiechart.draw(GLB.speedPieData, GLB.speedPieOptions);
}

function updateSpeedData(a) {
    newSpeedValue = a, newSpeedValue > GLB.maxSpeed && (newSpeedValue = GLB.maxSpeed), 
    newSpeedValue *= 2.25, GLB.speedPieData.setValue(1, 1, newSpeedValue), GLB.speedPieData.setValue(2, 1, 270 - newSpeedValue), 
    GLB.speedPiechart.draw(GLB.speedPieData, GLB.speedPieOptions);
}

function drawInitAccelChart(a) {
    GLB.accelLinedata = google.visualization.arrayToDataTable([ [ "Time", "X-Axis", "Y-Axis" ], [ 0, .003, -.185 ], [ 1, -.026, .971 ], [ 2, -.085, .095 ], [ 3, .655, -.077 ], [ 4, .048, .015 ], [ 5, .095, -.213 ], [ 6, -.426, .609 ], [ 7, .19, .032 ], [ 8, .04, .001 ] ]), 
    GLB.accelLineoptions = {
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
                max: GLB.dataPoints - 1
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
    }, GLB.accelLinegraph = new google.visualization.AreaChart($(a)[0]), GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions);
}

function updateAccelData(a, b) {
    if (GLB.accelLinedata.addRows([ [ GLB.loopCount, a, b ] ]), GLB.accelLineoptions.hAxis.viewWindow.min += 1, 
    GLB.accelLineoptions.hAxis.viewWindow.max += 1, 1e3 == GLB.loopCount) {
        GLB.accelLineoptions.hAxis.viewWindow.min = 0, GLB.accelLineoptions.hAxis.viewWindow.max = GLB.dataPoints - 1, 
        GLB.accelLineoptions.animation.duration = 0, GLB.accelLinedata.removeRows(0, GLB.loopCount + 1 - GLB.dataPoints);
        for (var c = 0; c < GLB.dataPoints; c++) GLB.accelLinedata.setValue(c, 0, c);
        return GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions), GLB.loopCount = GLB.dataPoints, 
        void (GLB.accelLineoptions.animation.duration = 750);
    }
    GLB.loopCount++, GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions);
}