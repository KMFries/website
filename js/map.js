var map;

function load_map() {

map = new L.map('map', {zoomControl: true}).setView([51.967, 7.63],13);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; 2012 <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
var eggIcon = L.icon({
	iconUrl: '../images/Yoshi_Egg.png',
	iconSize: [28,28]
	});
var lanuvIcon = L.icon({
	iconUrl: 'http://www.mobile-dienste-nrw.de/images/NRW_Wappen.jpg',
	iconSize: [28,28]
	});
var markerIfgi = L.marker([51.941, 7.610],{icon: eggIcon}).bindPopup(
	"Air Qualiy Egg 17</br><a href=\"http://de.wikipedia.org/wiki/Luftfeuchtigkeit\" target=\"_blank\">Luftfeuchte</a>: 78%</br><a href=\"http://de.wikipedia.org/wiki/Temperatur\"target=\"_blank\">Temperatur</a>: 32°C");
var markerMathe = L.marker([51.966, 7.603],{icon: lanuvIcon});
var eggs = L.layerGroup([markerIfgi]);
var lanuv = L.layerGroup([markerMathe]);
var overlay = {"Eggs": eggs,"Lanuv NRW": lanuv};
L.control.layers(null,overlay).addTo(map);
}

function chooseAddr(lat, lng, type) {
    var location = new L.LatLng(lat, lng);
    map.panTo(location);

if (type == 'city' || type == 'administrative') {
map.setZoom(11);
} else {
map.setZoom(15);
}
}

function addr_search() {
    var inp = document.getElementById("addr");

    $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + inp.value, function(data) {
        var items = [];

        $.each(data, function(key, val) {
            items.push("<li><a href='#' onclick='chooseAddr(" + val.lat + ", " + val.lon + ", \"" + val.type + "\");return false;'>" + val.display_name + '</a></li>');
        });

$('#results').empty();
        if (items.length != 0) {
            $('<p>', { html: "Search results:" }).appendTo('#results');
            $('<ul/>', {
                'class': 'my-new-list',
                html: items.join('')
            }).appendTo('#results');
        } else {
            $('<p>', { html: "No results found" }).appendTo('#results');
        }
    });
}

window.onload = load_map;