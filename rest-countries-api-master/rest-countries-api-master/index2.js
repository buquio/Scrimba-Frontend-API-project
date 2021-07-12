
let countries

fetch("https://restcountries.eu/rest/v2/all")// the api automatically load up when the window loads
.then(res => res.json())
.then(data => rearrange(data)) 
.catch(err => console.log("Error:", err));

function rearrange(countriesData) { 
  countries = countriesData; //store data first in a temperary variable e.g countries, then
  let options = ""; //create a variable option that will take <option> in it one by one 
  
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);//put the option variable containing the <option> inside the <select> i.e countriesList
  countriesList.innerHTML = options;
//NOTE: option value contains a specific group of country called alpha3code

  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value); //e.g countriesList[0].value-display that country in the select-box
}

// NOTE: displayCountryInfo has 3 paramter at differnt place so it can use any of the parameter at any place

const selectbox = document.getElementById("countries");
selectbox.addEventListener("change", showCountryList);//1.on clicking/change an event occur which is passed to a fxn-newCountrySelection

function showCountryList(event) { //2.newcountryselection will show the list of avaiable countries
  displayCountryInfo(event.target.value); //3.the event.target.value will be passed into the fxn-displayCountryInfo.
}

function displayCountryInfo(countryByAlpha3Code) { //display the following info of the selected country
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("dialing-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
} 
