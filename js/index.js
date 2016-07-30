console.log(sunny);

getEpisodeItem = function (s, ep) {
    return sunny.video.seasons[s - 1].episodes[ep - 1];
}

getEpisodeDetails = function (s, ep) {
    for (var i = 0; i < episodeDetails.length; i++) {
        if (s === episodeDetails[i].season && ep === episodeDetails[i].episode) {
            return episodeDetails[i];
        }
    }
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
        app.tips = [
            'Psst, mobile users, try swiping left/right!',
            'Psst, desktop users, try clicking the edges of your screen!',
            'Check us out on GitHub! github.com/hawkins/always-sunny'
        ]

        app.loadRandomTip = function() {
            // Load a random tip into #tip
            app.tip = app.tips[Math.floor(Math.random()*app.tips.length)];
            console.log(app.tip);
            $('#tip').text(app.tip);
        }

        app.loadRandomTip();

        app.select = function(s, ep) {
            app.selected = [s, ep];
            var item = getEpisodeItem(s, ep);
            var details = getEpisodeDetails(s, ep);

            console.log('Selected', item, details);

            // Item
            $('#title').text(item.title);
            $('#episode').text('Season ' + s + ': episode: ' + item.seq);
            $('#desc').text(item.synopsis);
            $('#link').attr('href', 'https://www.netflix.com/watch/' + item.episodeId);
            $('#link').text('Watch on Netflix');

            // Details
            if (details) {
                if (details.lead.length > 1)
                    $('#lead').html('<b>Lead Characters</b>: ' + details.lead.join(', '));
                else
                    $('#lead').html('<b>Lead Character</b>: ' + details.lead.join(', '));
                if (details.writers.length > 1)
                    $('#writers').html('<b>Writers</b>: ' + details.writers.join(', '));
                else
                    $('#writers').html('<b>Writer</b>: ' + details.writers.join(', '));
                if (details.part)
                    $('#part').text('Part <b>' + details.part.split('of').join('<b/> of <b>') + '</b>');
                else
                    $('#part').text('');
                if (details.guest && details.guest.length)
                    $('#guest').html('<b>Guest(s):</b> ' + details.guest.join(', '));
                else
                    $('#guest').text('');
            } else {
                $('#lead').text('');
                $('#writers').text('');
                $('#part').text('');
                $('#guest').text('');
            }
        }

        app.next = function () {
            if (app.selected) {
                // If last episode in this season
                if (app.selected[1] === sunny.video.seasons[app.selected[0] - 1].episodes.length) {
                    // If last season in this show
                    if (app.selected[0] === sunny.video.seasons.length)
                        app.select(1, 1);
                    else
                        app.select(app.selected[0] + 1, 1);
                } else {
                    app.select(app.selected[0], app.selected[1] + 1);
                }
            } else {
                app.select(1, 1);
            }
        }

        app.onSwipeRight = function (ev) {
            app.previous();
        }

        app.previous = function () {
            if (app.selected) {
                // If first episode in this season
                if (app.selected[1] === 1) {
                    // If first season in this show
                    if (app.selected[0] === 1)
                        app.select(sunny.video.seasons.length, sunny.video.seasons[sunny.video.seasons.length - 1].episodes.length);
                    else
                        app.select(app.selected[0] - 1, sunny.video.seasons[app.selected[0] - 2].episodes.length);
                } else {
                    app.select(app.selected[0], app.selected[1] - 1);
                }
            } else {
                app.select(sunny.video.seasons.length, sunny.video.seasons[sunny.video.seasons.length - 1].episodes.length);
            }
        }

        app.onSwipeLeft = function (ev) {
            app.next();
        }

        app.getWriters = function () {
            var list = [];
            for (var i = 0; i < episodeDetails.length; i++) {
                for (var j = 0; j < episodeDetails[i].writers.length; j++) {
                    for (var k = 0; k <= list.length; k++) {
                        if (!list[k]) {
                            list.push({name: episodeDetails[i].writers[j], count: 1});
                            break;
                        }
                        if (list[k].name === episodeDetails[i].writers[j]) {
                            list[k].count++;
                            break;
                        }
                    }
                }
            }
            return list;
        };
        app.writers = app.getWriters();
        app.writer = app.writers[0].name;

        app.getRandom = function () {
            console.log('Looking for random episode');
            var s = Math.floor(Math.random() * sunny.video.seasons.length) + 1;
            var ep = Math.floor(Math.random() * sunny.video.seasons[s - 1].episodes.length) + 1;
            app.select(s, ep);
        };

        app.getRandomByLead = function (lead) {
            console.log('Looking for lead ' + lead);

            function includesLead(item) {
                return item.lead.includes(lead);
            }
            var includes = episodeDetails.filter(includesLead);
            var item;
            while (!item)
                item = includes[Math.floor(Math.random() * episodeDetails.length)]

            app.select(item.season, item.episode);
        };

        app.getRandomByWriter = function (writer) {
            console.log('Looking for writer ' + writer);

            function includesWriter(item) {
                return item.writers.includes(writer);
            }
            var includes = episodeDetails.filter(includesWriter);
            var item;
            while (!item)
                item = includes[Math.floor(Math.random() * episodeDetails.length)]

            app.select(item.season, item.episode);
        };
    });
