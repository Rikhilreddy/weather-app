const getHourly = (hourly, timezone) => {
  const times = [];
  const temps = [];
  const pressures = [];
  const humidities = [];
  const winds = [];
  const label = [
    "Temperature (°C)",
    "% Humidity",
    "Pressure (atm)",
    "Wind Speed (m/sec)",
  ];
  const yAxisID = "left-y-axis";
  const types = ["line", "line", "bar", "bar"];

  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(155,234,54,0.2)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(155,234,54,1)",
  ];

  for (let i = 0; i < 24; i++) {
    const hour = hourly[i];
    const time = new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
    times.push(`${time}`);

    temps.push(hour.temp);

    const pressure = hour.pressure * 0.0009869233;
    pressures.push(pressure.toFixed(2));

    humidities.push(hour.humidity);

    winds.push(hour.wind_speed);
  }
  const data = [temps, humidities, pressures, winds];
  const datasets = [];

  for (let j = 0; j < 4; j++) {
    const dataset = {
      type: types[j],
      label: label[j],
      data: data[j],
      backgroundColor: backgroundColors[j],
      borderColor: borderColors[j],
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 2,
      pointHoverRadius: 3,
      borderCapStyle: 'square',
      borderJoinStyle: 'round',
    };
    if (j === 2 || j === 3) {
      dataset.yAxisID = yAxisID
    }
    datasets.push(dataset);
  }

  const hourlyData = {
    labels: times,
    datasets: datasets,
  };

  return hourlyData;
};

export default getHourly;
