import { useState, useRef } from 'react'
import "./App.css"


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

const App = () => {
  const currentID = useRef(1);
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 0
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

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
    for (let person of persons) {
      if (person["name"] === newName) {
        setNewNumber("");
        setNewName("");
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }

    const newPerson = {name: newName, number: newNumber, id: currentID.current++};
    setPersons([...persons, newPerson]);
    setNewNumber("");
    setNewName("");
  }


  return (
    <div className="main">
    <h1>Phonebook</h1>
      <div className="otherThanTitle">
      <SearchBar handleSearchChange={handleSearchChange} className="searchBar"></SearchBar>
      <InputPanel handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} className={"input"}></InputPanel>
      <OutputPanel setPersons={setPersons} persons={persons} filterName={filterName}></OutputPanel>
      </div>   
    </div>
      
  )
}

export default App