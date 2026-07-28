export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const reasult = {};
  reasult.city = data.name;
  reasult.temp = { F: data.main.temp };
  reasult.type = getWeatherType(data.main.temp);
  reasult.condition = getWeatherCondition(data.weather[0].main);
  reasult.isDay = isDay(data.sys, Date.now());
  return reasult;
};

const getWeatherCondition = (condition) => {
  const normalizedCondition = condition.toLowerCase();

  switch (normalizedCondition) {
    case "clear":
    case "sunny":
      return "clear";
    case "clouds":
    case "overcast":
      return "cloudy";
    case "rain":
    case "drizzle":
      return "rain";
    case "thunderstorm":
    case "tornado":
    case "squall":
      return "storm";
    case "snow":
    case "sleet":
      return "snow";
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "ash":
      return "fog";
    default:
      return "clear";
  }
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 85) {
    return "warm";
  } else {
    return "cold";
  }
};
