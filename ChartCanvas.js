import React from "react";
import { Chart } from "react-chartjs-2";
import { LinearScale, CategoryScale, Legend, Tooltip } from "chart.js";

Chart.register(LinearScale, CategoryScale, Legend, Tooltip);

function ChartCanvas({ data, xtitle, title, refProp }) {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "end",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
    },
    bezierCurve: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: xtitle,
        },
      },
      y: {
        beginAtZero: false,
        display: false,
      },
    },
  };

  return (
    <>
      <span ref={refProp} className="anchor" id="Days7Chart"></span>
      <section className="pt-4 ">
        <div className="w-full lg:w-10/12 lg:mb-0 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-base-100">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h6 className="uppercase mb-1 text-2xl font-semibold">
                    {title}
                  </h6>
                </div>
              </div>
            </div>
            <div className="p-4 flex-auto">
              <div className="relative">
                {data.labels ? (
                  <Chart
                    style={{
                      display: "block",
                      height: "100%",
                      width: "100%",
                    }}
                    options={options}
                    data={data}
                  />
                ) : (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <h3>Loading Chart...</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChartCanvas;
