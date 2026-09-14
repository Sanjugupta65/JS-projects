
const city_name = document.getElementById('city-input');
const search_btn = document.getElementById('search-btn')
const weather_result = document.getElementById('weather-result');
const error_msg = document.getElementById('error-msg')




// const apiKey = "bd5e378503939ddaee76f12ad7a97608"
const apiKey = "b1fd6e14799699504191b6bdbcadfc35"

city_name.addEventListener(`keypress`,function(e){
    if(e.key === `Enter`){
        search_btn.click()
    }
})

//dynamice URL 
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=metric`


//when click on Search button
search_btn.addEventListener(`click`,function(){
    const cityname = city_name.value.trim(); // Remove extra spaces

    if (cityname === ""){ 
        showerror(`Pls enter the city name`)
        return 
    }

    else{
        FetchWeather(cityname)
    }
})


// fetching data from the Weather API 
function FetchWeather(cityName){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        if(data.cod === `404`){
            showerror(`city not found . Please try again!`)
            return
        }
        displayWeather(data)
    })
    .catch(function(error){
        showerror(`Something went wrong . check your Internet!`)
    })
}
function displayWeather(data){
    // it will clean the previous errror
    error_msg.textContent = ``

    //extract data form the response object
    const city = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
     const description = data.weather[0].description
    const humidity = data.main.humidity
    const wind = data.wind.speed
    const iconCode = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

        weather_result.innerHTML = `
        <img class="weather-icon" src="${iconUrl}" alt="weather icon">
        <h2 class="city-name">${city}, ${country}</h2>
        <p class="temperature">${temp}°C</p>
        <p class="description">${description}</p>
        <div class="details">
            <span>💧 Humidity: ${humidity}%</span>
            <span>💨 Wind: ${wind} m/s</span>
        </div>`
}



function showerror(message){
        weather_result.innerHTML = ``;
        error_msg.textContent = message;
}







