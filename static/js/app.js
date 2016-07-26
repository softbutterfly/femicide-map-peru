(function () {
    $(window).load(function () {
        $(document).ready(function () {
            var map = new Datamap({
                element: document.getElementById('map-canvas'),
                responsive: true,
                geographyConfig: {
                  dataUrl: './static/data/pe-all.topo.json'
                },
                scope: 'peru',
                projection: 'mercator'
                // fills: {
                //   defaultFill: '#bada55',
                //   someKey: '#fa0fa0'
                // },
                // data: {
                //   'AFG-1758': {fillKey: 'someKey'},
                //   'AFG-1747': {fillKey: 'someKey'}
                // },
                // setProjection: function(element) {
                //   var projection = d3.geo.mercator()
                //     .center([66.166667, 34.4444])
                //     .scale(2200)
                //     .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                //    var path = d3.geo.path().projection(projection);
                //    return {path: path, projection: projection};
                // }
            });

            window.addEventListener('resize', function() { map.resize(); });
        });
    });
})();
