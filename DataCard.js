import React, { useContext } from "react";

import LocationStringContext from "./../context/LocationString";


import { FaTemperatureHigh } from 'react-icons/fa'
import { TbGauge } from 'react-icons/tb'
import { WiHumidity } from 'react-icons/wi'
import { RiWindyLine } from 'react-icons/ri'
  
function DataCard() {
  const { label, currentWeather} = useContext(
    LocationStringContext
  );

  const { feels_like, humidity, pressure, temp, weatherMeta, wind_speed } =
    currentWeather;




  return (
    <div className="grid  bg-base-300 w-full lg:w-1/2 rounded-box place-items-center">
      <div className="card sm:card-side w-full bg-primary text-primary-content shadow-xl">
        <div className="flex flex-col justify-center">
          {weatherMeta && (
            <>
              <figure>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherMeta[0].icon}@4x.png`}
                  alt={weatherMeta[0].description}
                />
              </figure>
              <p className="text-center px-4 capitalize">
                {weatherMeta[0]?.description}
              </p>
            </>
          )}
        </div>
        <div className="card-body">
          <h2 className="card-title break-words">{label}</h2>
          <h3 className="card-title text-2xl">
            <div
              className="tooltip tooltip-right"
              data-tip={`Temperature ${(temp * 1.8 + 32).toFixed(2)} ° F`}
            >
              <FaTemperatureHigh className="inline" /> {temp} &#176;C
            </div>
          </h3>
          <h6 className="card-text">
            <div
              className="tooltip tooltip-right"
              data-tip={`${(feels_like * 1.8 + 32).toFixed(2)} ° F`}
            >
              Feels like {feels_like} &#176;C
            </div>
          </h6>
          <h6 className="card-text">
            <div
              className="tooltip tooltip-right"
              data-tip={`Pressure  (${pressure}) hPa)`}
            >
              <TbGauge className="inline text-xl" />{" "}
              {(pressure * 0.0009869233).toFixed(2)} atm
            </div>
          </h6>
          <h6 className="card-text">
            <div className="tooltip tooltip-right" data-tip="Humidity">
            <WiHumidity className="inline text-2xl" /> {humidity} %
            </div>
          </h6>
          <h6 className="card-text">
            <div
              className="tooltip tooltip-right"
              data-tip={`Wind Speed  (${((wind_speed * 18) / 5).toFixed(2)} kmph)`}
            >
              <RiWindyLine className="inline text-2xl" />{wind_speed} m / sec
            </div>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default DataCard;
