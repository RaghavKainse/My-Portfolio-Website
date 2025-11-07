  const apiKey = "c7c901451284d59ad50ddcd20fbe8ecf";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");

      const weatherIcon = document.querySelector(".weather-icon");

      async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
        document.querySelector(".humidity").innerHTML =
          data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "ani/clouds.gif";
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "ani/sun.gif";
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "ani/drizzle.gif";
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "ani/rain2.gif";
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "ani/mist2.gif";
        }
      }
      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });