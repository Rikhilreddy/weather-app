import React, { useState } from "react";

const CurrentLoc = ({ setLabel, setCoords }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const geoSuccess = async (position) => {

    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `/pos/v1/reverse?access_key=${process.env.REACT_APP_POSITIONSTACK}&query=${latitude},${longitude}`
    );

    const responseJSON = await response.json();

    const { label } = await responseJSON.data[0];

    setLabel(label);

    setCoords({
      latitude: latitude,
      longitude: longitude,
    });

    setIsLoading(false);
  };

  const geoError = async (error) => {
    console.log(error)
    setIsLoading(false);
    setIsError(true);
  };

  const getLoc = () => {
    setIsError(false);
    setIsLoading(true);

    const geo = navigator.geolocation;
    geo.getCurrentPosition(geoSuccess, geoError);
  };

  if (isLoading) {
    return (
      <section className="mt-12 ">
        <div className="w-full lg:w-10/12 lg:mb-0 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-base-100">
            <div
              id="alert-box"
              className="flex items-center w-full space-between gap-4 p-4 rounded-box"
            >
              <div id="details">
                <h3 className="font-bold">
                  Trying to retrieve location information
                </h3>
                <div className="text-xs">Please wait...</div>
              </div>
            </div>
            <div id="progress" className="w-full px-4 py-2 rounded-2xl">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && isError) {
    return (

    <section className="mt-12 ">
      <div className="w-full lg:w-10/12 lg:mb-0 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-base-100">
          <div
            id="alert-box"
            className="flex items-center w-full space-between gap-4 p-4 rounded-box alert-error"
          >
            <div>
              <div id="details">
                <h3 className="font-bold">
                  Could not retrieve location information
                </h3>
                <div className="text-xs">
                  Please reset Location permission in site settings and Reload
                  the page to Try Again,
                </div>
                <div className="text-xs">
                  Or turn on location services on your device if it has been
                  turned off and Try Again
                </div>
              </div>
            </div>
            <div className="flex-none ml-auto">
              <button className="btn btn-warning btn-sm " onClick={getLoc}>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
  }

  return (
    <section className="mt-12 ">
      <div className="w-full lg:w-10/12 lg:mb-0 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-base-100">
          <div
            id="alert-box"
            className="flex items-center w-full space-between gap-4 p-4 rounded-box"
          >
            <div>
              <div id="details">
                <h3 className="font-bold mb-2">
                  Find weather at your location
                </h3>
                <div className="text-xs">
                  Click the button and grant location permission to find weather
                  at your location
                </div>
              </div>
            </div>
            <div className="flex-none ml-auto">
              <button className="btn btn-primary btn-sm " onClick={getLoc}>
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentLoc;
