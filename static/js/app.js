(function() {
    function ceilToNearestHundred(x) {
        nH = 1;
        while(x > 10) {
            x = x/10;
            nH *= 10;
        }
        nH = parseInt(x)*nH
        console.log(nH,x)
    }

    $(window).load(function() {
        $(document).ready(function() {
            var mapOptions = {
                element: document.getElementById('map-canvas'),
                responsive: false,
                geographyConfig: {
                    dataUrl: 'static/data/peru_topo.json',
                    highlightBorderColor: '#000000',
                    popupTemplate: function(geography, data) {
                        return [
                            '<div class="hoverinfo">',
                            '<b>' + geography.properties.name + '</b>',
                            '<br/>',
                            'Electoral Votes:' + data.electoralVotes + '</div>'
                        ].join('');
                    },
                    highlightBorderWidth: 1
                },
                scope: 'peru',
                setProjection: function(element) {
                    var projection = d3.geo.mercator()
                        .center([-74.9919444444, -9.18875]) // lng, lat
                        .scale(4 * element.offsetWidth)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                    var path = d3.geo.path()
                        .projection(projection);

                    return { path: path, projection: projection };
                }
            }

            var mapData;
            var mapFillings = {
                defaultFill: '#bada55',
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
                    tentatives = keys.map(function(key){ return mapData[key]["tentatives"]; });

                    minF = Math.min(femicides);
                    maxF = Math.max(femicides);

                    minT = Math.min(tentatives);
                    maxT = Math.max(tentatives);

                    console.log(femicides);
                    console.log(tentatives);
                });

            var map = new Datamap(mapOptions);

            window.addEventListener('resize', function() { map.resize(); });
        });
    });
})();
