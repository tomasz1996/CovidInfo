import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const mapWidth = 1300;
const mapHeight = 600;

const MapChart = ( {fetchCountry, setTooltipContent }) => {

  return (
    <>
      <ComposableMap 
      data-tip="" 
      width={mapWidth}
      height={mapHeight}
      projectionConfig={{ scale: 220 }}>
        <ZoomableGroup 
          translateExtent={[
            [0, 0],
            [mapWidth, mapHeight]
          ]}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME} — Population: ${rounded(POP_EST)}`);
                    // console.log(geo.properties);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  // onClick = {props.fetchCountry(geo.properties.NAME)}
                  onClick = {() => {fetchCountry(geo.properties.ISO_A3); console.log("Clicked")}}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);