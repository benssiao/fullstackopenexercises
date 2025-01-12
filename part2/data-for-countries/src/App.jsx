import { useState, useEffect } from 'react'
import './App.css'
import dataBaseServices from "./services/backend.jsx"


/** useEffect to retrieve the list of countryobjects from server. 
 * then get the common name of every country as a list.
 * Then set up the searchbar which is tied to the value searchBarText. 
 * After every update of searchBarText search through the list for any 
 * countries which contains the searchBarText as a substring.
 * Then display the countries while complying with the logic 
 * in the problem prompt. In the special case of one hit, use the 
 * /api/name/{name} api to get the full information of the country.**/

function OutputPanel({searchBarText, retrievedCountryNames, retrievedCountryObjects}) {
  const [isSingle, setIsSingle] = useState(false);
  if (!searchBarText) {
    return null;
  }
  const includesList = [];
  for (let countryName of retrievedCountryNames) {
    if (countryName.includes(searchBarText.toLowerCase())) {
      includesList.push(countryName.toLowerCase());
    }
  }

  if (includesList.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  }

  if (includesList.length === 1) {
    
    
    return <CountryItemExpanded className="expandedCountryCard outputPanel" countryObject={retrievedCountryObjects.get(includesList[0])}></CountryItemExpanded>
  }
  return (
    <div className="outputPanel">
      {includesList.map((countryName) => {
        return <CountryItem key={countryName} countryName={countryName} countryObject={retrievedCountryObjects.get(countryName)}></CountryItem>
      })}
    </div>
  )
}

function CountryItem({countryName, countryObject}) {
  const [showDetail, setShowDetail] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    setShowDetail(showDetail ? false : true);
  }

  function capitalizeFirsts(str) {
    // takes a string of the form "burkina faso" and returns "Burkina Faso"
    function capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str.split(" ").map(substr => capitalizeFirst(substr)).join(" ");
  }
  if (showDetail) {
    return <div><CountryItemExpanded className="expandedCountry"  countryObject={countryObject}> </CountryItemExpanded> <button onClick={handleClick}>{showDetail?  "hide" : "show more"}</button> </div>;
  }
  return <div className="countryCard">{capitalizeFirsts(countryName)} <button onClick={handleClick}>{showDetail?  "hide" : "show more"}</button></div>;
}

function CountryItemExpanded({countryObject}) {
  return (
    <>
    
      <div className="countryName">{countryObject.name.common}</div>
      <div className="expandedCountryCardWrap">
          <div className="expandedCountryCard"> 
          <img src={countryObject.flags["png"]} alt={countryObject.flags["alt"]}/>
          <ul className="countryInfo">
            <li>Capital: {countryObject.capital[0]}</li>
            <li>Population: {countryObject.population}</li>
            <li>Area: {countryObject.area}</li>
            <li>Languages: {Object.entries(countryObject.languages).map(([_, language]) => {
              return <span key={language}> {language}</span>})} </li>
          </ul>
          <WeatherInformation countryObject={countryObject} ></WeatherInformation>
        </div>
      </div>
    </>
    )
}

function WeatherInformation({countryObject}) {

  const [weatherInfo, setWeatherInfo] = useState(null);
  useEffect(() => {
    dataBaseServices.axiosGetWeatherDataAt(countryObject.latlng[0], countryObject.latlng[1])
    .then(response => setWeatherInfo(response))
    .catch(error => {
    console.log(error);
    });
  }, []);

  function getTemperatureColor(temperature) {
    // Define temperature ranges and corresponding colors
    if (temperature <= 0) return '#1E90FF';  // Cold blue
    if (temperature <= 10) return '#87CEEB';  // Light blue
    if (temperature <= 20) return '#90EE90';  // Light green
    if (temperature <= 25) return '#FFD700';  // Yellow
    if (temperature <= 30) return '#FFA500';  // Orange
    return '#FF4500';  // Hot red
  };

  if (!weatherInfo) {
    return null;
  }

  return (
    <div style={{backgroundColor: getTemperatureColor(Math.round(weatherInfo["temp"]- 273.15))}} className="weatherAppendage" >
      <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}></img>
        <ul className="weatherInfo">
          <li>Current Temperature: {Math.round(weatherInfo["temp"]- 273.15)} °C</li>
          <li> Current Wind speed: {weatherInfo["speed"]} m/s </li> 
        </ul>
    </div>
  )
}

function App() {

  const [searchBarText, setSearchBarText] = useState(null);
  const [retrievedCountryNames, setRetrievedCountryNames] = useState(null);
  const [retrievedCountryObjects, setRetrievedCountryObjects] = useState(null);
  function handleSearch(e) {
    e.preventDefault();
    setSearchBarText(e.target.value);
  }

  useEffect(() => {
    dataBaseServices.axiosGetAll().then(result => {
      const commonNameList = result.map(countryObject => countryObject.name).map(nameObject => nameObject.common.toLowerCase());
      setRetrievedCountryNames(commonNameList);
      let i = 0;
      const countryObjectMap = new Map();
      while (i < commonNameList.length) {
        countryObjectMap.set(commonNameList[i].toLowerCase(), result[i]);
        i++
      }
      setRetrievedCountryObjects(countryObjectMap);
      console.log(countryObjectMap);
    });
  }, [])

  if (!retrievedCountryNames || !retrievedCountryObjects) {
    return null
  }
  return (
    <div className="outerWrap">
      <div className="header">
        <h1 className="title">Country information app.</h1>
          <form className="searchBar">
            <input placeholder="Search for countries..." type="text" onChange={handleSearch}/>
            <hr className="dividingLine"></hr>
          </form>
      </div>
      <OutputPanel className="outputPanel" searchBarText={searchBarText} retrievedCountryNames={retrievedCountryNames} retrievedCountryObjects={retrievedCountryObjects} ></OutputPanel>
    </div>
  )
}

export default App
