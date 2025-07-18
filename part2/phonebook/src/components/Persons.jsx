const Persons = ({ filterName, persons, removePerson }) =>
  persons
    .filter((person) =>
      person.name.toLowerCase().includes(filterName.toLowerCase())
    )
    .map((person) => (
      <div key={person.id}>
        {person.name} {person.number}{" "}
        <button onClick={() => removePerson(person)}>delete</button>
      </div>
    ));

export default Persons;
