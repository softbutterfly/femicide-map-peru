(function () {
    $(window).load(function () {
        $(document).ready(function () {
            map = new Datamap({
                element: document.getElementById('map-canvas'),
                scope: 'per',
                responsive: false,
                geographyConfig: {
                    dataUrl: './data/pe-all.topo.json',
                    highlightBorderColor: '#000000',
                    popupTemplate: function(geography, data) {
                        return '<div class="hoverinfo">' + geography.properties.name + 'Electoral Votes:' +  data.electoralVotes + ' '
                        },
                         highlightBorderWidth: 1
                    },
                fills: {
                        defaultFill: '#bada55',
                        'Republican': '#CC4731',
                      'Democrat': '#306596',
                      'Heavy Democrat': '#667FAF',
                      'Light Democrat': '#A9C0DE'
                },
                data:{
                          "PE.LB": {
                              "fillKey": "Republican",
                              "electoralVotes": 5
                          },
                          "PE.TU": {
                              "fillKey": "Light Democrat",
                              "electoralVotes": 5
                          }
                        },
                // data: {
                //     'AFG-1758': {fillKey: 'someKey'},
                //     'AFG-1747': {fillKey: 'someKey'}
                // },
                setProjection: function(element) {
                    var projection = d3.geo.mercator()
                        .center([-76.1410154, -11.0674535]) // lng, lat
                        .scale(1500)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                    var path = d3.geo.path()
                        .projection(projection);

                    return {path: path, projection: projection};
                }
            });

            map.legend();
            map.labels();
            window.addEventListener('resize', function() { map.resize(); });
        });
    });
})();
