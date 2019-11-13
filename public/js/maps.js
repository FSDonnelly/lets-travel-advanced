let platform = new H.service.Platform({
  apikey: 'Wh7PcZWuDJwMsj3HNSTs',
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  }
});

// Obtain the default map types from the platform object:
let defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
let map = new H.Map(
  document.querySelector('.map'),
  defaultLayers.vector.normal.map,
  {
    zoom: 10,
    center: { lat: 51.500876, lng: -0.124647 }
  }
);
