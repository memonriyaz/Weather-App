document.addEventListener("DOMContentLoaded", function () {
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityInput = document.getElementById("city-input");
  const weatherInfo = document.getElementById("weather-info");
  const errorMessage = document.getElementById("error-message");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");

  API_KEY = "6a7557a20812836eedc308fe2410735e";

  getWeatherBtn.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (!city) return;  
    try {
      const weather = await fetchWeatherData(city);
      displayWeatherData(weather);
    } catch (error) {
      displayErrorMessage();
    }
  });


  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);
    
    if (response.ok) {
        const data = await response.json();
        displayWeatherData(data);
        console.log(data);
        return data
    } else {
      displayErrorMessage();
    }
  }

  function displayWeatherData(data) {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    cityInput.value = "";
    cityName.textContent = data.name;
    temperature.textContent = (data.main.temp - 273.15).toFixed(2) + `°C`;
    description.textContent = data.weather[0].description;
  }

  function displayErrorMessage() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
