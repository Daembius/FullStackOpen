const Countries = ({ countries, onSelectCountry }) => {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => onSelectCountry(country)}>show</button>
          </li>
        ))}
      </ul>
    );
  };

  export default Countries;