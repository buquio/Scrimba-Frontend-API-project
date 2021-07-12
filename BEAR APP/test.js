// variables
const urlBase = "https://api.punkapi.com/v2/beers";

async function getBeers() {
    // fetch
    const beerPromise = await fetch(urlBase);
    const beers = await beerPromise.json();
    
    // render data
    const beersDiv = document.querySelector('.beers');
    
    let beerHtml = "";
    
    beers.forEach(beer => {
       beerHtml += `
        <h3>${beer.name}</h3>
       `; 
    });
    
    beersDiv.innerHTML = beerHtml;
}

// initial get
getBeers();