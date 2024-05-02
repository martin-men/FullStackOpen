import { useEffect, useState } from "react";
import AddForm from "./components/AddForm";
import Filter from "./components/Filter";
import Person from "./components/Person";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [shownPersons, setShownPersons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
        setShownPersons(response.data);
      });
  }, []);

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "name":
        setNewName(event.target.value);
        break;
      case "number":
        setNewNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => verifyEqualObjects(person, newPerson))) {
      alert(`${newName} is already added to the phone book`);
    } else {
      const addedPersonArray = persons.concat(newPerson);
      setPersons(addedPersonArray);
      setShownPersons(addedPersonArray);
    }
    setNewName("");
    setNewNumber("");
  };

  const verifyEqualObjects = (obj1, obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    }

    const hasAllKeys = obj1Keys.every((key) => obj2Keys.includes(key));

    if (!hasAllKeys) {
      return false;
    }

    const hasSameValues = obj1Keys.every((key) => obj1[key] === obj2[key]);

    return hasSameValues;
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    setShownPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>Add a new number</h2>
      <AddForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
      />
      <h2>Numbers</h2>
      {shownPersons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
