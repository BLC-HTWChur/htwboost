define(['exports', 'jquery', 'theme_htwboost/d3', "theme_htwboost/fbloader", "theme_htwboost/fbbarchart",  "theme_htwboost/fbbubblechart", "theme_htwboost/fbboxchart"],

console.log('test');
       function(exports, $, d3, loader, barChart, bubbleChart, boxChart) {
var svgRoot, graph, xaxis;


function initSVGRoot() {
    // create or clear the SVG area
    if (!svgRoot) {
        svgRoot = d3.select("#feedback_analysis")
                    .append("svg")
                    .attr("width", "80%")
                    // .attr("height", "100%")
                    // .attr("viewBox", "0 0 60 55")
                    // .attr("class", "fbanalysis-svg");


    }

    else {
        // clear the SVG area
        svgRoot.selectAll("*").remove();
    }
}

function reRenderChart(){
        if ($("#fbanalysis_boxchart").hasClass("btn-primary")) {
          loadBoxChart();
        }
        if ($("#fbanalysis_barchart").hasClass("btn-primary")) {
          loadBarChart();
        }
        if ($("#fbanalysis_bubblechart").hasClass("btn-primary")) {
          loadBubbleChart();
        }
}

function loadBoxChart() {
    initSVGRoot();
    loader.load(boxChart.renderChart(svgRoot));
}

function loadBubbleChart() {
    initSVGRoot();
    loader.load(bubbleChart.renderChart(svgRoot));
    // loadChartResults(renderBubbleChart, loadBubbleChart);
}

function loadBarChart() {
    initSVGRoot();
    loader.load(barChart.renderChart(svgRoot));
}

function toggleLiveUpdate() {
    $("#fbanalysis_liveupdate").toggleClass("btn-warning");
    $("#fbanalysis_liveupdate").toggleClass("btn-outline-warning");

    loader.toggleLiveUpdate();

}

function clearSelection(tname) {
    if (tname !== "#fbanalysis_boxchart") {
        $("#fbanalysis_boxchart").removeClass("btn-primary");
        $("#fbanalysis_boxchart").addClass("btn-outline-primary");
    }
    if (tname !== "#fbanalysis_barchart") {
        $("#fbanalysis_barchart").removeClass("btn-primary");
        $("#fbanalysis_barchart").addClass("btn-outline-primary");
    }
    if (tname !== "#fbanalysis_bubblechart") {
        $("#fbanalysis_bubblechart").removeClass("btn-primary");
        $("#fbanalysis_bubblechart").addClass("btn-outline-primary");
    }
    initSVGRoot();
}

function toggleBoxChart() {
    $("#fbanalysis_boxchart").toggleClass("btn-primary");
    $("#fbanalysis_boxchart").toggleClass("btn-outline-primary");

    clearSelection("#fbanalysis_boxchart");
    showChart("#fbanalysis_boxchart");
    loadBoxChart();
}

function toggleBarChart() {
    $("#fbanalysis_barchart").toggleClass("btn-primary");
    $("#fbanalysis_barchart").toggleClass("btn-outline-primary");
    clearSelection("#fbanalysis_barchart");

    showChart("#fbanalysis_barchart");

    if ($("#fbanalysis_barchart").hasClass("btn-primary")) {
        loadBarChart();
    }
}

function toggleBubbleChart() {
    $("#fbanalysis_bubblechart").toggleClass("btn-primary");
    $("#fbanalysis_bubblechart").toggleClass("btn-outline-primary");
    clearSelection("#fbanalysis_bubblechart");
    showChart("#fbanalysis_bubblechart");
    if ($("#fbanalysis_bubblechart").hasClass("btn-primary")) {
        loadBubbleChart();
    }
}
function printPage() {
    window.print();
};
function extendUI() {
    // insert our ui before the feedback_info
    // The chart area is hidden by default
    // $(".feedback_info:first-child").before("<div id=\"feedback_analysis\" class=\"hidden\">");

    // Insert the functional buttons. These buttons are always visible

    $(".form-buttons").prepend("<div id=\"feedback_vizbuttons\" class=\"singlebutton\">");
    $("#feedback_vizbuttons")
        .append("<span id=\"fbanalysis_barchart\" class=\"btn btn-outline-primary fbbutton\">Bar Chart</span>")
        .append("<span id=\"fbanalysis_bubblechart\" class=\"btn btn-outline-primary fbbutton\">Bubble Chart</span>")
        .append("<span id=\"fbanalysis_boxchart\" class=\"btn btn-outline-primary fbbutton\">Box Chart</span>")
        // The live update should be deactivated in no chart is visible.
        .append("<span id=\"fbanalysis_liveupdate\" class=\"btn btn-outline-warning fbbutton\">Live Update (beta)</span>")
        .append("<span id=\"fbanalysis_print\" class=\"btn btn-secondary printbtn\">Print Page</span>");


    $("#fbanalysis_barchart").click(toggleBarChart);
    $("#fbanalysis_boxchart").click(toggleBoxChart);
    $("#fbanalysis_bubblechart").click(toggleBubbleChart);
    $("#fbanalysis_liveupdate").click(toggleLiveUpdate);
    $("#fbanalysis_print").click(printPage);

    // $( window ).resize(reRenderChart);
}

// this shows or hides the SVG, depending on the activation state of the control button.
function showChart(chart) {
    if ($(chart).hasClass("btn-primary")) {
        $("#feedback_analysis").removeClass("hidden");
    }
    else {
        $("#feedback_analysis").addClass("hidden");
        loader.clearHandler();
    }
}

function checkFeedbackAnalysis() {
    var pathArray = window.location.pathname.split("/");

    var functionName = pathArray.pop(); // should be last element
    var moduleName   = pathArray.pop(); // should be last element
    // console.log(secondLevelPath);
    //check analysis.php page is true

    if (moduleName === "feedback" && functionName === "analysis.php") {
        extendUI();
        // toggleBarChart();
    }
}
// console.log("läuft");
// $(document).ready(checkFeedbackAnalysis);
exports.checkFeedbackAnalysis = checkFeedbackAnalysis;
});
