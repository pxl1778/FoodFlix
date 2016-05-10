var map;
      var infowindow;
      function initMap() {
       var mapOptions = {
	       center: {lat: 43.083848, lng:-77.6799},
	       zoom: 16,
	       mapTypeId: google.maps.MapTypeId.ROADMAP
	      
       };
        
	  

       map = new google.maps.Map(document.getElementById('map'), mapOptions);
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
	    
	       for(var i = 0; i < coffeeShops.length; i++ )
       {
	       addMarker(coffeeShops[i].latitude, coffeeShops[i].longitude, coffeeShops[i].title);
       }

      }
      
      document.querySelector('#worldZoomButton').onclick = function(){
	    map.setZoom(1);  
      };
      
       document.querySelector('#defaultZoomButton').onclick = function(){
	    map.setZoom(16);  
      };
      
       document.querySelector('#buildingZoomButton').onclick = function(){
	    map.setZoom(20);  
      };
      
       document.querySelector('#isometricZoomButton').onclick = function(){
	    map.setZoom(18);  
      };
      
      function makeInfoWindow(position, msg){
	      if(infowindow) infowindow.close();
	      infowindow = new google.maps.InfoWindow({
		      map: map, 
		      position: position,
		      content: "<b>" + msg + "</b>"
	      });
      }