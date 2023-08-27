import { FC, useEffect, useState } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";

interface IProps {
  country: string;
  area: string;
  step: number;
}

const Search: FC<IProps> = ({ country, area, step }) => {
  const [initRender, setInitRender] = useState<boolean>(true);
  const provider = new OpenStreetMapProvider();

  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    autoComplete: true, // optional: true|false  - default true
    autoCompleteDelay: 250, // optional: number      - default 250
    retainZoomLevel: false, // optional: true|false  - default false
    animateZoom: true, // optional: true|false  - default true
    autoClose: false, // optional: true|false  - default false
    showMarker: true,
    showPopup: false,
    keepResult: false,
    searchLabel: "Country, Area",
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  useEffect(() => {
    const centerMap = async () => {
      const results = await provider.search({ query: `${country}, ${area}` });

      if (Array.isArray(results) && results.length > 0) {
        map.panTo(new L.LatLng(results[0].y, results[0].x));
      }
    };

    centerMap();
  }, [country, area, step]);

  return null;
};

export default Search;
