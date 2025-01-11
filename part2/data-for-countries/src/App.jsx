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
    
    
    return <CountryItemExpanded className="expandedCountryCard" countryObject={retrievedCountryObjects.get(includesList[0])}></CountryItemExpanded>
  }
  return (
    <>
      {includesList.map((countryName) => {
        return <CountryItem key={countryName} countryName={countryName} countryObject={retrievedCountryObjects.get(countryName)}></CountryItem>
      })}
    </>
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
  }, [countryObject.latlng]);
  if (!weatherInfo) {
    return null;
  }

  return (
    <div styles={{backgroundColor: "gray"}} className="weatherAppendage" >
      <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}></img>
        <ul className="weatherInfo">
          <li>Temperature: {Math.round(weatherInfo["temp"]- 273.15)} °C</li>
          <li> Wind speed: {weatherInfo["speed"]} m/s </li> 
        </ul>
    </div>
  )



}


function App() {

  const [searchBarText, setSearchBarText] = useState(null);
  const [retrievedCountryNames, setRetrievedCountryNames] = useState(null);
  const [retrievedCountryObjects, setRetrievedCountryObjects] = useState(null);
  /* const [detailedCountryData, setDetailedCountryData] = useState(null);
  const [countryToBeExpanded, setCountryToBeExpanded] = useState(null); */
  
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

 /*  
  useEffect(() => {
    if (retrievedCountryNames !== null) {
      for (countryName in retrievedCountryNames) {
        dataBaseServices.axiosGetTarget(countryName).then(result => {
          setDetailedCountryData();
        })
      }
    }

  }, [retrievedCountryNames])

  useEffect(() => {

  }, [countryToBeExpanded])
 */


  if (!retrievedCountryNames || !retrievedCountryObjects) {
    return null
  }

  return (
    <>
      <form>
        <div>find countries <input type="text" onChange={handleSearch}/> </div>
      </form>
      <OutputPanel className="outputPanel" searchBarText={searchBarText} retrievedCountryNames={retrievedCountryNames} retrievedCountryObjects={retrievedCountryObjects} ></OutputPanel>
    </>
  )
}

export default App
