import React, { useState, useRef, useEffect } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import * as nominatim from "nominatim-client";
import { latLng } from "leaflet";

// Set the global settings here
nominatim.global({
  useragent: "WahlViz", // The name of your application
  referer: "https://lenzw.de", // The referer link
  email: "mail@lenzw.de" // The valid email
});

export function Map(props: {
  onSelectAddress(address: nominatim.Address): void;
}) {
  const [position, setPosition] = useState<[number, number]>([
    49.7913044,
    9.9533548
  ]);
  const [zoom, setZoom] = useState(13);
  const map = useRef<LeafletMap>();
  const bla = function() {};

  const handleClick = (e: any) => {
    const { lat, lng: lon } = e.latlng;
    setPosition([lat, lon]);
    nominatim.reverse({ lat, lon }, (err, data) => {
      props.onSelectAddress(data.address);
    });
  };

  const handleLocationFound = (e: any) => {
    console.log(e);
    if (e.latlng) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    }
  };

  useLocateInitially(map);

  return (
    <LeafletMap
      center={position}
      zoom={zoom}
      ref={map as React.Ref<LeafletMap>}
      onclick={handleClick}
      onlocationfound={handleLocationFound}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </LeafletMap>
  );
}

function useLocateInitially(
  map: React.MutableRefObject<LeafletMap | undefined>
) {
  useEffect(() => {
    if (map.current) {
      console.log("requesting");
      map.current.leafletElement.locate();
    }
  }, [map]);
}
