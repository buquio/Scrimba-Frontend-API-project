

// Global Variables
const countriesList = document.getElementById("countries");
let countries; // first place where the "fetched" data will stay

// Event Listeners
countriesList.addEventListener("change", newCountrySelection);//1.on change i.e window load an event occur which is passed to a fxn-newCountrySelection

// 1.intial first display. newcountryselection will show the country selected at random via the onload event
function newCountrySelection(event) { //the newCountrySelection immediately takes the event as parameter 
  displayCountryInfo(event.target.value); //and calls & return fxn displayCountryInfo passing in the event.target.value
//it will only display the country of the eventtarget for initaial display
}


fetch("https://restcountries.eu/rest/v2/all")// the api automatically load up when the window loads
.then(res => res.json())
.then(data => initialize(data)) 
.catch(err => console.log("Error:", err));

function initialize(countriesData) { 
  countries = countriesData;  //store data first in a temperary variable e.g countries, then
  let options = ""; //create a variable option and put <option> in it one by one inside the <select> i.e countriesList

  // for(let i=0; i<countries.length; i++) { 
  //   options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
  //   // options += `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
  // }

  // for each  country inside variable countries put option variable inside one by one(+=)
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);//put the option variable containing the <option> inside the <select> i.e countriesList
  //NOTE: option value contains a specific group of country called alpha3code
  countriesList.innerHTML = options; //initially empty (options = "") but when clicked receives data(options+=`<option....)
  // console.log(countriesList);
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length); //for the initaial display,selection is done by window-onload event
  displayCountryInfo(countriesList[countriesList.selectedIndex].value); //e.g countriesList[0].value-display that country in the select-box
}

// NOTE: displayCountryInfo has 3 paramter at differnt place so it can use any of the parameter at any place
// 1.event.target.value==<select> 2.countriesList.selectedIndex.value 3.countryByAlpha3Code

function displayCountryInfo(countryByAlpha3Code) { //display the listed info of the selected country
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



///////////////
// fetch("https://restcountries.eu/rest/v2/all")
// .then(function(res){
//   // console.log(res);
//   return res.json();
// })
// .then(function(data){
//   // console.log(data);
//   initialize(data);
// })
// .catch(function(err){
//   console.log("Error:", err);
// });



