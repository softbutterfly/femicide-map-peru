(function () {
    $(window).load(function () {
        $(document).ready(function () {
            map = new Datamap({
                element: document.getElementById('map-canvas'),
                responsive: false,
                geographyConfig: {
                    dataUrl: './static/data/pe-all.topo.json'
                },
                scope: 'per',
                fills: {
                    defaultFill: '#bada55',
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

            window.addEventListener('resize', function() { map.resize(); });
        });
    });
})();
