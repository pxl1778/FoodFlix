var map;
var infowindow;
var currentPosition;

function initMap() {
  var mapOptions = {
      center: {lat: 39, lng:-95},
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP 
  };
  
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  currentPosition = new google.maps.LatLng(43.08359, -77.66921);
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById('loc-input');
  
  //limits search to cities
  var options = {
    types: ['(cities)']
  };
    
	var searchBox = new google.maps.places.SearchBox(input, options);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  
  var markers = [];
  
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      
      locationmarkers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        locationmarkers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
  });
  
  function addMarker(latitude, longitude, title) {
      var position = {lat:latitude, lng:longitude};
      var marker = new google.maps.Marker({position: position, map: map});
      marker.setTitle(title);
      
      google.maps.event.addListener(marker, 'click', function(e){
        makeInfoWindow(this.position, this.title);
      });
      
      map.mapTypeId = 'satellite';
      map.setTilt(45);
  }
  
}
//end of init

//Your Position button
document.querySelector('#yourPositionZoomButton').onclick = function(){
  //getting user's location
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            currentPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
            map.setZoom(15);  
            map.setCenter(currentPosition);
        },
        //errors
        function showError(error) {
          switch(error.code) {
          case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
              break;
          case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.")
              break;
          case error.TIMEOUT:
              console.log("The request to get user location timed out.")
              break;
          case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.")
              break;
          }
        });

    }
    else 
    {
        console.log("failed");
    }
};

function makeInfoWindow(position, msg){
  if(infowindow) infowindow.close();
  infowindow = new google.maps.InfoWindow({
    map: map, 
    position: position,
    content: "<b>" + msg + "</b>"
  });
}

