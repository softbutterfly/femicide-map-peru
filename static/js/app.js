(function() {
    $(window).load(function() {
        $(document).ready(function() {
            var mapCenter = [-74.9919444444, -9.18875] // lng, lat
            var mapOptions = {
                element: document.getElementById('map-canvas'),
                responsive: false,
                geographyConfig: {
                    dataUrl: 'static/data/peru_topo.json',
                    popupTemplate: function(geography, data) {
                        return [
                            "<div class=\"hoverinfo\">",
                                "<table>",
                                    "<thead>",
                                        "<tr>",
                                            "<th colspan=\"2\">",
                                            geography.properties.name,
                                            "</th>",
                                        "</tr>",
                                    "</thead>",
                                    "<tbody>",
                                        "<tr>",
                                            "<td>",
                                                "<div class=\"femicide\">",
                                                data.femicides,
                                            "</td>",
                                            "<td>",
                                                "<div class=\"attempted\">",
                                                data.attempted,
                                            "</td>",
                                        "</tr>",
                                    "</tbody>",
                                "</table>",
                            "</div>",
                        ].join('');
                    },
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    popupOnHover: true,
                    highlightOnHover: true,
                    highlightBorderWidth: 2,
                    highlightBorderColor: '#d50000',
                    highlightFillColor: '#d50000',
                    highlightBorderWidth: 2
                },
                scope: 'peru',
                setProjection: function(element) {
                    var projection = d3.geo.mercator()
                        .center(mapCenter)
                        .scale(4 * element.offsetWidth)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                    var path = d3.geo.path()
                        .projection(projection);

                    return { path: path, projection: projection };
                }
            }

            var mapData;
            var mapFills = {
                defaultFill: '#e0e0e0',
            };

            var statsURL = "static/data/femicide_stats.json";
            var jqxhr = $.getJSON( statsURL, function(data) {
                    // Getting data period
                    $(".period-begin").text(data.period[0]);
                    $(".period-end").text(data.period[1]);
                    $(".period").removeClass('hiddendiv');

                    // Gettings mapData
                    mapData = data.stats;

                    // Hover on Lima Metropolitana will
                    // show Lima Department stats
                    mapData["PE.LP"] = mapData["PE.LR"];

                    // Creating Filling Scale
                    keys = Object.keys(mapData);
                    femicides = keys.map(function(key){ return mapData[key]["femicides"]; });
                    attempted = keys.map(function(key){ return mapData[key]["attempted"]; });

                    minF = Math.min(femicides);
                    maxF = Math.max(femicides);

                    minA = Math.min(attempted);
                    maxA = Math.max(attempted);

                    maxE = maxF + maxA;
                    minE = minF + minF;
                    console.log(femicides);
                    console.log(attempted);

                    mapOptions.data = mapData;
                    mapOptions.fills = mapFills
                });

            var map = new Datamap(mapOptions);

            window.addEventListener('resize', function() { map.resize(); });
        });
    });
})();
