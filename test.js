import axios from 'axios'
const key = "0ca1a6d8e1911a98df56015f4ce23dfa"
axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${1}&lon=${1}&appid=${key}).then(result => console.log(result))