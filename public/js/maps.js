let platform = new H.service.Platform({
    'apikey': '0oNJeGPBU67gEfSAiO1uaYCyBRuj7fPa3RYP7sFVZik'
  });


function landmarkGeocode() {
  let title= document.querySelector('h1').textContent;
  let geocoder = platform.getSearchService(),
      landmarkGeocodingParameters = {
        q: title,
        at: '0,0',
        limit: 1
      };

  geocoder.discover(
    landmarkGeocodingParameters,
    showMap,
    (e) => console.log(e)
  );
}

function showMap(result){
  let location = result.items[0].position;
  let defaultLayers = platform.createDefaultLayers();
  let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 15,
      center: { lat: location.latitude , lng: location.longitude },
      pixelRatio: window.devicePixelRatio || 1
    });

    // Create the default UI:
    let ui = H.ui.UI.createDefault(map, defaultLayers);
    let locationsContainer = document.getElementById('panel');
    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
}

landmarkGeocode();
