'use strict;';
// Knockout ViewModel function to display locations
var ViewModel = function() {

    var self = this;

    this.markerList = ko.observableArray([]);
    this.filter = ko.observable("");

    // Shows map

    this.init = function() {
        var styles = [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [{
                        "color": "#bed600"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#857b7b"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{
                    "visibility": "simplified"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "color": "#5381ac"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];
        // Create a map object
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 49.299181,
                lng: 19.949562
            },
            zoom: 13,
            styles: styles
        });


        // Finds locations on the map
        locations.forEach(function(marker) {
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + marker.title + "&key=AIzaSyCkJVp0lKYz1uUM7YNk8CP60VHLV2SJXBo",
                dataType: "json"
            }).done(function(data) {
                var lat = data.results[0].geometry.location.lat;
                var long = data.results[0].geometry.location.lng;
                self.markerList.push(new Marker(marker.title, long, lat));
            }).fail(function() {
                // Prints message when function fails
                infoWindow.setContent("Information Unavailable for [" + marker.title() + "]");;
            });
        });
    };


    //Marker filter. Prints out and shows locations if succesful.

    this.filteredMarkers = ko.computed(function() {
        return ko.utils.arrayFilter(self.markerList(), function(marker) {
            if (!self.filter() || marker.title().toLowerCase().indexOf(self.filter().toLowerCase()) > -1) {
                marker.visible(true);
                return true;
            } else {
                marker.visible(false);
                return false;
            }
        });
    });
    // Removes the animation
    this.clearMarkers = function() {
        for (var i = 0; i < self.markerList().length; i++) {
            var mark = self.markerList()[i];
            if (mark.marker.getAnimation() !== null) {
                mark.marker.setAnimation(null);
                mark.info.close();
            }
        }
    };
};
// Knockout binding
var viewModel = new ViewModel();
ko.applyBindings(viewModel);

//List of locations to be shown/filtered.
var locations = [{
        location: {
            lat: 49.27941,
            lng: 19.963944
        },
        title: "Wielka Krokiew",
        //search: "Wielka Krokiew",
        //description: "The biggest ski jump hill in Poland"

    },
    {
        location: {
            lat: 49.251002,
            lng: 19.934035
        },
        title: "Giewont",
        //search: "Giewont",
        //description: "Giewont is also called the Sleeping Knight"

    },
    {
        location: {
            lat: 49.197141,
            lng: 20.070087
        },
        title: "Morskie Oko",
        //search: "The Valley of Five Lakes",
        //description: "Amazing post-glacial valley in the very heart of the Polish Tatras."

    },
    {
        location: {
            lat: 49.179548,
            lng: 20.088064
        },
        title: "Rysy",
        //search: "Rysy",
        //description: "The highest peak in Poland"

    },
    {
        location: {
            lat: 49.232164,
            lng: 19.981798
        },
        title: "Kasprowy Wierch",
        //search: "Chochołowska Valley",
        //description: "Come to see the beauty of blooming crocuses!"

    },
    {
        location: {
            lat: 49.307427,
            lng: 19.937017
        },
        title: "Gubałówka",
        //search: "Gubałówka Mountain",
        //description: "The best view of Zakopane"

    },
    {
        location: {
            lat: 49.2924,
            lng: 19.948478
        },
        title: "Villa Atma",
        //search: "Gubałówka Mountain",
        //description: "The best view of Zakopane"

    }, {
        location: {
            lat: 49.290294,
            lng: 19.889583
        },
        title: "Kościelisko",
        //search: "Gubałówka Mountain",
        //description: "The best view of Zakopane"

    }
];

//Making the map a global variable for easy reference.
var map;

var Marker = function(title, longitude, lattitude) {
    this.title = ko.observable(title);
    this.visible = ko.observable(true);
    //Google Map LatLng API
    var myLatlng = new google.maps.LatLng(lattitude, longitude);
    //Google Map InfoWindow API
    var infoWindow = new google.maps.InfoWindow({
        content: "None"
    });

    this.info = infoWindow;
    //Wikipedia info about location. If no info found prints out message.
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + this.title() + "&format=json&callback=wikiCallback",
        dataType: "jsonp",
        context: this
    }).done(function(data) {
        if (data[2][0]) {
            infoWindow.setContent(data[2][0]);
        }
    }).fail(function() {
        infoWindow.setContent("Information Unavailable for [" + this.title() + "]");
    });

    //Google Map Marker API
    this.marker = new google.maps.Marker({
        position: myLatlng,
        animation: google.maps.Animation.DROP,
        title: this.title()
    });

    //This function will both toggle the bounce the animation as well as show/hide the info window. I had some
    //trouble with the scoping so I had to figure out if I was being called from the DOM or a click to the marker
    //itself and change mark based on scope. It's not the cleanest implementation but I'm running low on time.
    this.toggleBounce = function() {
        var mark = (this.getAnimation) ? this : this.marker;
        if (mark.getAnimation() !== null) {
            mark.setAnimation(null);
            infoWindow.close();
        } else {
            viewModel.clearMarkers();
            mark.setAnimation(google.maps.Animation.BOUNCE);
            infoWindow.open(map, mark);
        }
    };

    this.marker.addListener("click", this.toggleBounce);

    //This sets the marker to the map, or to 'null' which removes the marker.
    this.onMap = ko.computed(function() {
        if (this.visible()) {
            this.marker.setMap(map);
        } else {
            this.marker.setMap(null);
        }
    }, this);

};
