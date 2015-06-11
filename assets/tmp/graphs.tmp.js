function initGraphs(a, b, c, d, e, f, g, h) {
    a && drawInitSpeedPieChart(b), c && drawInitAccelChart(d), e && drawInitGforceGraph(f), 
    g && drawInitBarGraph(h);
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
    }, GLB.speedPiechart = new google.visualization.PieChart($(a)[0]), GLB.speedPiechart.draw(GLB.speedPieData, GLB.speedPieOptions), 
    addGraphResizeListener(GLB.speedPiechart, GLB.speedPieData, GLB.speedPieOptions);
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
    }, GLB.accelLinegraph = new google.visualization.AreaChart($(a)[0]), GLB.accelLinegraph.draw(GLB.accelLinedata, GLB.accelLineoptions), 
    addGraphResizeListener(GLB.accelLinegraph, GLB.accelLinedata, GLB.accelLineoptions);
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

function drawInitGforceGraph(a) {
    GLB.gforceGraphData = new google.visualization.DataTable(), GLB.gforceGraphData.addColumn("number"), 
    GLB.gforceGraphData.addColumn("number");
    for (var b = 0; 50 > b; b++) GLB.gforceGraphData.addRow([ null, null ]);
    GLB.gforceGraphOptions = {
        hAxis: {
            title: "Lateral",
            minValue: -.5,
            maxValue: .5,
            minorGridlines: {
                count: 4
            }
        },
        vAxis: {
            title: "Longitudinal",
            minValue: -.5,
            maxValue: .5,
            minorGridlines: {
                count: 4
            }
        },
        legend: "none",
        pointShape: "circle",
        series: {
            0: {
                color: "#e66a08",
                visibleInLegend: !0
            }
        },
        dataOpacity: .5,
        pointSize: 10,
        animation: {
            duration: 200,
            easing: "inAndOut",
            startup: !0
        },
        tooltip: {
            trigger: "selection"
        },
        backgroundColor: {
            fill: "transparent"
        }
    }, GLB.gforceGraph = new google.visualization.ScatterChart($(a)[0]), google.visualization.events.addListener(GLB.gforceGraph, "select", processGforceEvent), 
    addGraphResizeListener(GLB.gforceGraph, GLB.gforceGraphData, GLB.gforceGraphOptions), 
    GLB.gforceGraph.draw(GLB.gforceGraphData, GLB.gforceGraphOptions), start_bigd_session();
}

function updateGforceData(a) {
    for (var b = 0; b < a.length; b++) {
        if (null === a[b]) return void GLB.gforceGraph.draw(GLB.gforceGraphData, GLB.gforceGraphOptions);
        GLB.gforceGraphData.setValue(b, 0, a[b].gLat), GLB.gforceGraphData.setValue(b, 1, a[b].gLng);
    }
    GLB.gforceGraph.draw(GLB.gforceGraphData, GLB.gforceGraphOptions);
}

function processGforceEvent() {
    var a = GLB.gforceGraph.getSelection()[0];
    return null == a || a.row == processGforceEvent.currentSelection ? void GLB.gforceGraph.setSelection([ {
        row: processGforceEvent.currentSelection
    } ]) : (processGforceEvent.currentSelection = a.row, void GLB.fleet.requestBDEvent(a.row));
}

function resizeChart(a, b, c) {
    a.draw(b, c);
}

function addGraphResizeListener(a, b, c) {
    document.addEventListener ? window.addEventListener("resize", function() {
        resizeChart(a, b, c);
    }) : document.attachEvent ? window.attachEvent("onresize", function() {
        resizeChart(a, b, c);
    }) : window.resize = function() {
        resizeChart(a, b, c);
    };
}