console.log(episodes);
// $.getJSON("https://cdn.rawgit.com/hawkins/ef642c6cd2672eeb828a238bd4668931/raw/c23fcaeb9ec0c346ca187aa5115036bc47c01aee/always-sunny.json", function(data) {
//     // Get the element with id summary and set the inner text to the result.
//     episodes = data;
//   console.log(episodes);
// });

select = function(item) {
    $('#title').text(item.title);
    $('#episode').text('Season ' + item.season + ': episode: ' + item.episode);
    // TODO: Split by item.lead.length
    $('#lead').text('Lead Character(s): ' + item.lead.join(', '));
    $('#desc').text(item.description);
    $('#author').text(item.authors);
    if (item.part)
        $('#part').text('Part ' + item.part);
    else
        $('#part').text('');
}

angular.module('SunnyApp', ['ngMaterial'])
    .config(function($mdThemingProvider) {
        var customPrimary = {
            '50': '#fbe390',
            '100': '#fadc78',
            '200': '#fad65f',
            '300': '#f9d046',
            '400': '#f8c92e',
            '500': '#F7C315',
            '600': '#eab608',
            '700': '#d2a307',
            '800': '#b99006',
            '900': '#a07d05',
            'A100': '#fce9a9',
            'A200': '#fdefc2',
            'A400': '#fef6da',
            'A700': '#886a05'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
                customPrimary);

        var customAccent = {
            '50': '#ffff58',
            '100': '#ffff71',
            '200': '#ffff8b',
            '300': '#ffffa4',
            '400': '#ffffbe',
            '500': '#ffffd7',
            '600': '#ffffff',
            '700': '#ffffff',
            '800': '#ffffff',
            '900': '#ffffff',
            'A100': '#ffffff',
            'A200': '#fffff1',
            'A400': '#ffffd7',
            'A700': '#ffffff'
        };
        $mdThemingProvider
            .definePalette('customAccent',
                customAccent);

        var customWarn = {
            '50': '#ffb280',
            '100': '#ffa266',
            '200': '#ff934d',
            '300': '#ff8333',
            '400': '#ff741a',
            '500': '#ff6400',
            '600': '#e65a00',
            '700': '#cc5000',
            '800': '#b34600',
            '900': '#993c00',
            'A100': '#ffc199',
            'A200': '#ffd1b3',
            'A400': '#ffe0cc',
            'A700': '#803200'
        };
        $mdThemingProvider
            .definePalette('customWarn',
                customWarn);

        var customBackground = {
            '50': '#505050',
            '100': '#434343',
            '200': '#363636',
            '300': '#292929',
            '400': '#1d1d1d',
            '500': '#101010',
            '600': '#030303',
            '700': '#000000',
            '800': '#000000',
            '900': '#000000',
            'A100': '#5c5c5c',
            'A200': '#696969',
            'A400': '#767676',
            'A700': '#000000'
        };
        $mdThemingProvider
            .definePalette('customBackground',
                customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            .backgroundPalette('customBackground')
    })
    .controller('sunnyCtrl', function($scope) {
        var app = $scope;
        app.leadCharacter = 'Charlie';
        app.characters = ['Charlie', 'Dennis', 'Dee', 'Frank', 'Mac'];
        app.episodes = episodes;

        app.getRandom = function() {
            console.log('Looking for random episode');
            var item = episodes[Math.floor(Math.random() * episodes.length)];
            select(item);
        };

        app.getRandomByLead = function(lead) {
            console.log('Looking for ' + lead);

            function includesLead(item) {
                return item.lead.includes(lead);
            }
            var includes = episodes.filter(includesLead);
            select(includes[Math.floor(Math.random() * episodes.length)]);
        }
    });
