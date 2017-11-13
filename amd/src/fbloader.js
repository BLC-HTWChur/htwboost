define(["exports", "jquery", "theme_htwboost/jqurlparam"], function(exports, $) {
    var baseurl = "/local/powertla/rest.php/content/survey/results/" + $.urlParam("id");
    var liveUpdate = false;
    var chartData = {};
    var liveHandler;
// console.log( "foo fbloader.min.js ");
    function checkLiveUpdate() {
        if (liveUpdate) {
            exports.load(liveHandler);
        }
    }

    exports.liveStatus = function() {
        return liveUpdate;
    };

    exports.clearHandler = function() {
        liveHandler = undefined;
    }

    exports.toggleLiveUpdate = function() {
        liveUpdate = !liveUpdate;
        checkLiveUpdate();
    };

    exports.data = function() {
        return chartData;
        // console.log("chartdata = " + chart.Data);
    }

    exports.load = function(handler) {
        liveHandler = handler;
        $.ajax({
            url: baseurl,
            type: "get",
            cache: false,
            dataType: "json",
            error: function () {
                checkLiveUpdate();
            },
            success: function (data) {
                if (typeof data === "string") { // ensure a data array
                    data = JSON.parse(data);
                }
                if (data) {
                    chartData = data;
                }
                if (typeof handler === "function") {
                    handler(chartData);
                }
                checkLiveUpdate();
            }
        });
    }
});
