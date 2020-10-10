import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import { useStateValue } from '../context/InfoProvider';

function MapPopUp(data = []) {
    const casesTypeColors = {
        cases: {
            hex: "#CC1034",
            multiplier: 500,
        },
        recovered: {
            hex: "#7dd71d",
            multiplier: 600,
        },
        deaths: {
            hex: "#ffc250",
            multiplier: 800,
        },
    };

    const [{case_type}] = useStateValue();

    return (
        <>
            {
              (data?.length) && data.map((country, index) => (
                    <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
                            color={casesTypeColors[case_type].hex}
                            fillColor={casesTypeColors[case_type].hex}
                            fillOpacity={0.4}
                            radius={Math.sqrt(country[case_type]) * casesTypeColors[case_type].multiplier}
                            key={index}>
                        <Popup>
                            <div className="info-container">
                                <div className="info-flag"
                                     style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                                ></div>
                                <div className="info-name">{country.country}</div>
                                <div className="info-confirmed">
                                    Cases: {numeral(country.cases).format("0,0")}
                                </div>
                                <div className="info-recovered">
                                    Recovered: {numeral(country.recovered).format("0,0")}
                                </div>
                                <div className="info-deaths">
                                    Deaths: {numeral(country.deaths).format("0,0")}
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                ))
            }
        </>
    )
}

export default MapPopUp
