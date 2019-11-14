let platform = new H.service.Platform({
  apikey: "Wh7PcZWuDJwMsj3HNSTs",
  app_id: "IyjUtmY8IadXaqghtmbB",
  app_code: "mA4-UGFZXlb2ZtlnpDic-A"
});

// Obtain the default map types from the platform object:
let defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
let map = new H.Map(document.querySelector(".map"), defaultLayers.normal.map, {
  zoom: 10,
  center: { lat: 51.500876, lng: -0.124647 }
});
