// 1. Get the country name from URL
const params = new URLSearchParams(window.location.search);
const countryName = params.get("country");

// 2. Fetch country detail from API
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const country = data[0];
    console.log(country);
    const container = document.querySelector(".country-details");

    // 3. Show details
    const nativeValue = Object.values(country.name.nativeName)
    const native_name = nativeValue[0].common

    const currency = Object.keys(country.currencies)[0]
const finalCurrency = currency

const languages = Object.values(country.languages)
const finalLanguage = languages.join(',')

    console.log(currency);
    container.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class='all-text'>
          <div class='first-line-text'>
      <h1>${country.name.common}</h1>
         <p><b>Native Name: </b>${native_name}</p>
               <p><b>Population:</b> ${country.population.toLocaleString("en-IN")}</p>
      <p><b>Region: </b>${country.region}</p>
  <p><b>Sub Region: </b>${country.subregion}</p>
      <p><b>Capital: </b>${country.capital}</p>
      </div>
      <div class='next-line'>
        <p><b>Top Level Domain: </b>${country.tld[0]}</p>
          <p><b>Currencies: </b>${finalCurrency}</p>
            <p><b>Languages: </b>${finalLanguage}</p>
            </div>
       </div>
    `;
  })
  .catch((err) => {
    console.error("⚠️ Error while fetching country data:",err);
    document.querySelector(".country-details").innerHTML =
      "<p>Error loading data.</p>";
  });


    const darkMode = document.querySelector('.darkMode');
darkMode.addEventListener('click',function(){
  document.querySelector('body').classList.toggle('darkActive')
})
