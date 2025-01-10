import axios from "axios"

const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
function axiosGetAll() {
    return axios.get(baseUrl + "/api/all")
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    
    });
}

function axiosGetTarget(countryName) {
    return axios.get(baseUrl + `/api/name/${countryName}`)
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
     
    });
}

function axiosGetWeatherDataAt(lat, long) {
    const getAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}`;
    return axios.get(getAddress)
    .then(response => {
        return {...response.data["weather"][0], ...response.data["main"], ...response.data["wind"]};
    })
    .catch(error => {
        console.log(error);
        
    })
    


}


export default {axiosGetAll, axiosGetTarget, axiosGetWeatherDataAt}
