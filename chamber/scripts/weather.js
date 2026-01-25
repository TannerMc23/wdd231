document.addEventListener("DOMContentLoaded", () => {
    const currentTemp = document.querySelector("#current-temp");
    const weatherDesc = document.querySelector("#weather-desc");
    const weatherIcon = document.querySelector("#weather-icon");
    const forecastDays = document.querySelectorAll(".forecast-day");

    const myKey = "29e1cce74baaef393d4c3d7c4800cfb5";
    const lat = 41.1108;
    const lon = -112.02494;

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;

    async function getCurrentWeather() {
        try {
            const response = await fetch(currentWeatherURL);
            if (!response.ok) throw new Error("Network response not OK");
            const data = await response.json();

            currentTemp.textContent = `Temperature: ${Math.round(data.main.temp)}°F`;
            weatherDesc.textContent = `Condition: ${data.weather[0].description}`;
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIcon.alt = data.weather[0].description;

        } catch (error) {
            console.error("Error fetching current weather:", error);
            currentTemp.textContent = "Weather data not available";
            weatherDesc.textContent = "";
        }
    }

    async function getForecast() {
        try {
            const response = await fetch(forecastURL);
            if (!response.ok) throw new Error("Network response not OK");
            const data = await response.json();

            const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 3);

            dailyForecasts.forEach((forecast, i) => {
                const dayName = new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
                const temp = Math.round(forecast.main.temp);
                const icon = forecast.weather[0].icon;
                const desc = forecast.weather[0].description;

                forecastDays[i].querySelector(".forecast-date").textContent = dayName;
                forecastDays[i].querySelector(".forecast-temp").textContent = `${temp}°F`;
                const img = forecastDays[i].querySelector("img");
                img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                img.alt = desc;
            });

        } catch (error) {
            console.error("Error fetching forecast:", error);
            forecastDays.forEach(day => {
                day.querySelector(".forecast-date").textContent = "N/A";
                day.querySelector(".forecast-temp").textContent = "-°F";
                const img = day.querySelector("img");
                img.src = "";
                img.alt = "";
            });
        }
    }

    getCurrentWeather();
    getForecast();
});