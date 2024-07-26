// import React from 'react';

const Persons = ({ persons, newSearch }) => {
  return (
    <ul>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(newSearch.toLowerCase())
        )
        .map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  );
};

export default Persons;
