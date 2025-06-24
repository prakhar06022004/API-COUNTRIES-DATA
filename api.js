const body = document.body;
const darkMode = document.querySelector(".darkMode");
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("darkActive");
}
darkMode.addEventListener("click", function () {
  body.classList.toggle("darkActive");

  if (body.classList.contains("darkActive")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

function renderCountries(countriesArray) {
  const countryContainer = document.querySelector(".countries-container");
  countryContainer.innerHTML = "";
  countriesArray.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.href = `countryPage.html?country=${country.name.common}`;
    countryCard.classList.add("country");
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}" />
      <div class="flag-text">
        <h3>${country.name.common}</h3>
        <div class="three-text-flag">
          <p><b>Population</b>: ${country.population.toLocaleString(
            "en-IN"
          )}</p>
          <p><b>Region</b>: ${country.region}</p>
          <p><b>Capital</b>: ${country.capital}</p>
        </div>
      </div>`;
    countryContainer.append(countryCard);
  });
}

let allCountriesData = [];
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
)
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    console.log(allCountriesData);
    renderCountries(allCountriesData);

    const searchInput = document.querySelector("input[type='search']");
    searchInput.addEventListener(
      "input",
      () => {
        const inputValue = searchInput.value.toLowerCase();
        const filtered = allCountriesData.filter((country) => {
          return country.name.common.toLowerCase().startsWith(inputValue);
        });
        renderCountries(filtered);
      }
    );
  })
  .catch((err) => console.log(err));
