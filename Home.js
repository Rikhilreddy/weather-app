import React, { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InputCard from "./components/InputCard";
import DataCard from "./components/DataCard";

import LocationStringContext from "./context/LocationString";
import ChartCanvas from "./components/ChartCanvas";
import getHourly from "./utilities/hourly";
import getDaily from "./utilities/daily";
import CurrentLoc from "./components/CurrentLoc";

function Home() {
  const [label, setLabel] = useState("Delhi, India");

  const [location, setLocation] = useState("New Delhi, DL, India");

  const [coords, setCoords] = useState({
    latitude: 28.557163,
    longitude: 77.163665,
  });

  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyWeather, setHourlyWeather] = useState({});
  const [dailyWeather, setDailyWeather] = useState({});

  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [locTime, setLocTime] = useState(
    new Date().toLocaleString("en-US", {
      timeZone: timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const setData = (daily, hourly, timezone) => {
      const day = getDaily(daily, timezone);
      setDailyWeather(day);
      const hour = getHourly(hourly, timezone);
      setHourlyWeather(hour);
    };

    const weather = async (latitude, longitude) => {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${process.env.REACT_APP_OPENMAP}`
      );

      const {
        timezone,
        current: {
          feels_like,
          humidity,
          pressure,
          wind_speed,
          temp,
          weather: weatherMeta,
        },
        daily,
        hourly,
      } = await weatherResponse.json();

      setTimeZone(timezone);
      setCurrentWeather({
        feels_like,
        humidity,
        pressure,
        wind_speed,
        temp,
        weatherMeta,
      });
      setData(daily, hourly, timezone);
    };

    weather(coords.latitude, coords.longitude);
  }, [coords]);

  useEffect(() => {
    const position = async () => {
      const geoResponse = await fetch(
        `/pos/v1/forward?access_key=${process.env.REACT_APP_POSITIONSTACK}&query=${location}`
      );

      const posData = await geoResponse.json();

      const required = await posData.data[0];

      if (required) {
        const { latitude, longitude, label } = required;
        setLabel(label);

        setCoords({
          latitude: latitude,
          longitude: longitude,
        });
      }
    };
    try {
      position();
    } catch (error) {}
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocTime(
        new Date().toLocaleString("en-US", {
          timeZone: timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  const dailyRef = useRef(null);
  const hourlyRef = useRef(null);

  return (
    <>
      <Navbar refProp={{ dailyRef, hourlyRef }}>
        <LocationStringContext.Provider
          value={{
            label,
            setLabel,
            setCoords,
            setLocation,
            currentWeather,
            dailyWeather,
            hourlyWeather,
          }}
        >
          <main className="bg-base-300 h-max pb-12">
            <CurrentLoc setLabel={setLabel} setCoords={setCoords} />
            <section className="mt-12 pb-8">
              <div className="flex justify-center px-4 mx-auto mt-6">
                <div className="flex flex-col gap-4 w-full lg:w-10/12 md:flex-row">
                  <InputCard timeZone={timeZone} locTime={locTime}  />
                  <DataCard/>
                </div>
              </div>
            </section>
            <ChartCanvas
              refProp={hourlyRef}
              title="24 Hour Forecast"
              data={hourlyWeather}
              xtitle="TIME"
            />
            <ChartCanvas
              refProp={dailyRef}
              title="7 Day Forecast"
              data={dailyWeather}
              xtitle="DATE"
            />
          </main>
          <Footer />
        </LocationStringContext.Provider>
      </Navbar>
    </>
  );
}

export default Home;
export { LocationStringContext };
