import { useState, useRef, useEffect } from 'react'
import "./App.css"
import dataBaseServices from "./services/backend.jsx"


function SearchBar({handleSearchChange}) {

  return (
    <div>
      <span style={{fontWeight: "bold"}}>Search Bar:</span>
      <span> <input onChange={handleSearchChange}></input></span>
      </div>
  )

}


function InputPanel({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Enter a person.</legend>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </fieldset>
    </form>
  )
}

function RemoveButton({persons, person, setPersons}) {
  function onClickRemove() {
    setPersons(persons.filter((iterPerson) => iterPerson.id !==  person.id));
    dataBaseServices.axiosDelete(person.id);
  }
  return <button onClick={onClickRemove}>Remove</button>
}

function PersonPanel({persons, person, setPersons}) {

  return (
    <div key={person.id}> Name: {person["name"]}, Number: {person["number"]} <RemoveButton  setPersons={setPersons} person={person} persons={persons}></RemoveButton></div>

  )
}

function OutputPanel({persons, filterName, setPersons}) {
  return (
    <>
      <h2>Numbers</h2>

      <div>
      {
        filterName === '' 
      ? persons.map(person => <PersonPanel key={person.id} person={person} persons={persons} setPersons={setPersons}></PersonPanel>) 
      : persons.filter((person => person["name"].toLowerCase().startsWith(filterName.toLowerCase()))).map(person => <PersonPanel setPersons={setPersons} key={person.id} persons={persons} person={person}></PersonPanel>)
      }
      </div>
    </>
  )
  
}

function ErrorNotification({message}) {
  if (message === null) {
    return null;
  }
  return (
    <div className="errorNotification">
      {message}
    </div>
  )
}

function Notification({message}) {

  if (message === null) {
    return null;
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorNotificationMessage, setErrorNotificationMessage] = useState(null);

  useEffect(() => {
    dataBaseServices.axiosGetAll().then((result) => {
      setPersons(result);
    });
  }, []);
  
  function handleNameChange(e) {
    e.preventDefault();
    setNewName(e.target.value);
  }

  function handleNumberChange(e) {
    e.preventDefault();
    setNewNumber(e.target.value);
  }

  function handleSearchChange(e) {
    setFilterName(e.target.value);
  }

  function handleSubmit(e) {

    e.preventDefault();

    function stringHash(inputString) {
      let hash = 5381;
      for (let char of inputString) {
        hash = ((hash << 5) + hash) + char.codePointAt(0);
      }
      return hash;
    }

    for (let person of persons) {
      if (person["name"] === newName) {
        setNewNumber("");
        setNewName("");
        const result = confirm("Perform update?")
        if (result === true) {
          dataBaseServices.axiosUpdate({name: newName, number: newNumber, id: person.id})
          .then((result) => {
            setNotificationMessage(`${newName} was added.`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(444);
            setErrorNotificationMessage(`The information of ${newName} has already been removed from the server.`)
            setTimeout(() => {
              setErrorNotificationMessage(null);
            }, 5000);

          })
          ;
        }
        
        return;
      }
    }

    const newPerson = {name: newName, number: newNumber, id: stringHash(newName).toString()};
    dataBaseServices.axiosCreate(newPerson).then(response => {
      setPersons([...persons, newPerson]);
      setNewNumber("");
      setNewName("");
      setNotificationMessage(`${newName} was added.`);
      setTimeout(() => {
        setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
          setErrorNotificationMessage(`The information of ${newName} has already been removed from the server.`)
          setTimeout(() => {
            setNewNumber("");
            setNewName("");
            setErrorNotificationMessage(null);
          }, 5000);

      })
  }
    
  return (
    <div className="main">
    <h1>Phonebook</h1>
    <Notification message={notificationMessage}></Notification>
    <ErrorNotification message={errorNotificationMessage}></ErrorNotification>
      <div className="otherThanTitle">
      <SearchBar handleSearchChange={handleSearchChange} className="searchBar"></SearchBar>
      <InputPanel handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} className={"input"}></InputPanel>
      <OutputPanel setPersons={setPersons} persons={persons} filterName={filterName}></OutputPanel>
      </div>   
    </div>
  )

  }

export default App