let platform = new H.service.Platform({
  apikey: "Wh7PcZWuDJwMsj3HNSTs",
  app_id: "IyjUtmY8IadXaqghtmbB",
  app_code: "mA4-UGFZXlb2ZtlnpDic-A"
});

function landmarkGeocode() {
  let title = document.querySelector("h1").textContent;
  let geocoder = platform.getGeocodingService(),
    landmarkGeocodingParameters = {
      searchtext: title,
      jsonattributes: 1
    };

  geocoder.search(landmarkGeocodingParameters, showMap, err =>
    console.log(err)
  );
}

function showMap(result) {
  let location =
    result.response.view[0].result[0].place.locations[0].displayPosition;

  let defaultLayers = platform.createDefaultLayers();

  let map = new H.Map(
    document.querySelector(".map"),
    defaultLayers.normal.map,
    {
      zoom: 15,
      center: { lat: location.latitude, lng: location.longitude }
    }
  );

  let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();
