const countryList = document.getElementById("countryList");
const searchBar = document.getElementById("searchBar");
// const sortCountries = document.getElementById("sortCountries")
// console.log(sortCountries)
let countryData = [];

const loadCountries = async () => {
  try {
    const res = await fetch("https://api.sampleapis.com/countries/countries");
    countryData = await res.json();
    displayCountries(countryData);
    // console.log(countryData);
  } catch (err) {
    console.log(err);
  }
};

loadCountries();

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCountries = countryData.filter((country) => {
    return (
      country.name.toLowerCase().includes(searchString) || country.capital.toLowerCase().includes(searchString)
    );
  });
  displayCountries(filteredCountries);
});


  
  const displayCountries = (countries) => {
    const htmlString = countries
      .map((country) => {
        return `<div class="country">
      <img class="country__img" src="${country.media.flag}" alt="" />
      <h4 class="country__name">${country.name}</h4>
      <p class="country__desc">Capital: ${country.capital}</p>
     <p class="country__desc">Population: ${country.population}</p>
     <p class="country__desc">Currency: ${country.currency}</p>
    </div>`;
      })
      .join("");
    countryList.innerHTML = htmlString;
}


const sortCountries = (filter) => {
  const displayedCountries = loadCountries();
  if (filter === 'LOW_TO_HIGH') {
    displayedCountries.sort((a, b) => a.country.population - b.country.population);
  } else if (filter === 'HIGH_TO_LOW'){
    displayedCountries.sort((b, a) => b.country.population - a.country.population);
  }
  console.log(filter)
  
}




