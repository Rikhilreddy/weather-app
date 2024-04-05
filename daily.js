const getDaily = (daily, timezone) => {
  const times = [];
  const avgtemps = [];
  const mintemps = [];
  const maxtemps = [];
  const pressures = [];
  const humidities = [];
  const winds = [];
  const label = [
    "Avg. Temperature (°C)",
    "Min. Temperature (°C)",
    "Max. Temperature (°C)",
    "% Humidity",
    "Pressure (atm)",
    "Wind Speed (m/sec)",
  ];
  const types = ["line", "line", "line", "line", "bar", "bar"];
  const yAxisID = "left-y-axis";

  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(155,234,54,0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
  ];

  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(155,234,54,1)",
    "rgba(255, 159, 64, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
  ];

  for (let i = 0; i < 7; i++) {
    const day = daily[i];
    const time = new Date(day.dt * 1000).toLocaleString("en-US", {
      timeZone: timezone,
      month: "long",
      day: "numeric",
    });
    times.push(`${time}`);
    avgtemps.push(((day.temp.min + day.temp.max) / 2).toFixed(2));
    mintemps.push(day.temp.min);
    maxtemps.push(day.temp.max);

    const pressure = day.pressure * 0.0009869233;
    pressures.push(pressure.toFixed(2));

    humidities.push(day.humidity);

    winds.push(day.wind_speed);
  }

  const data = [avgtemps, mintemps, maxtemps, humidities, pressures, winds];

  const datasets = [];

  for (let j = 0; j < 6; j++) {
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
    if (j === 4 || j === 5) {
      dataset.yAxisID = yAxisID;
    }
    datasets.push(dataset);
  }

  const dailyData = {
    labels: times,
    datasets: datasets,
  };

  return dailyData;
};

export default getDaily;
