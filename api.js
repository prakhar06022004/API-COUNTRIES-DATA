const body = document.body;
const darkMode = document.querySelector(".darkMode");
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("darkActive");
    }
darkMode.addEventListener("click", function () {
body.classList.toggle("darkActive");

if(body.classList.contains('darkActive')){
localStorage.setItem('theme','dark')
}
else{
  localStorage.setItem('theme','light')

}
});

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((country) => {
      const countryContainer = document.querySelector(".countries-container");
      const countryCard = document.createElement("a");
      countryCard.href = `countryPage.html?country=${country.name.common}`;
      // console.log(countryCard.href);
      countryCard.classList.add("country");
      countryCard.innerHTML = `<img src="${country.flags.svg}" alt="${
        country.name.common
      }" loading="lazy"/>
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
      // console.log(countryCard);
      countryContainer.append(countryCard);
    });
  })
  .catch((err) => console.log(err));

  function renderCountries(countriesArray) {
  const countryContainer = document.querySelector(".countries-container");
  countryContainer.innerHTML = ""; // saaf karo purane cards

  countriesArray.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.href = `countryPage.html?country=${country.name.common}`;
    countryCard.classList.add("country");

    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}" />
      <div class="flag-text">
        <h3>${country.name.common}</h3>
        <div class="three-text-flag">
          <p><b>Population</b>: ${country.population.toLocaleString("en-IN")}</p>
          <p><b>Region</b>: ${country.region}</p>
          <p><b>Capital</b>: ${country.capital}</p>
        </div>
      </div>`;

    countryContainer.appendChild(countryCard);
  });
}

let allCountriesData = [];

fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region")
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data;
    renderCountries(data); // shuru me sab dikhaye

    const searchInput = document.querySelector("input[type='search']");
    searchInput.addEventListener("input", function () {
      const inputValue = searchInput.value.toLowerCase();

      const filtered = allCountriesData.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue)
      );

      renderCountries(filtered); // match hone wale dikhaye
    });
  })
  .catch((err) => console.log(err));
