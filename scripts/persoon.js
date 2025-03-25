let url = new URLSearchParams(window.location.search);
let id = url.get('id');

var allWom = document.querySelector("#showcase");

var baseURL = "https://fdnd.directus.app/items/women_in_tech";
// var endPoint = "?filter={%22id%22:"+id+"}";
var endPoint = "/" + id;
var apiURL = baseURL + endPoint;
var response = await fetch(apiURL);
var womenData = await response.json();

var woman = womenData.data;

let womenHTML = `
        <header>
                <h1>${woman.name}</h1>
        </header>
        <div id="picture">
                <figure>
                        <img src=" https://fdnd.directus.app/assets/${woman.image}" alt="Image 1">
                </figure>
                <div>
                        <h2>${woman.short_name}</h2>
                </div>
        </div>
        <div>
                <h4>Tagline</h4>                
                <p>${woman.tagline}</p>
                <h4>Period</h4>
                <p>${woman.period}</p>
                ` +
                (woman.website ? `<h4>Website</h4> <a href=${woman.website}>Website</a>` : '') + 
                `
                <h4>Country</h4>
                <p>${woman.country}</p>
                ` +
                (woman.github ? `<h4>Github</h4> <a href=${woman.github}>Github</a>` : '') + 
                `
                ` +
                (woman.codepen ? `<h4>Codepen</h4> <a href=${woman.codepen}>Codepen</a>` : '') + 
                `
                ` +
                (woman.work ? `<h4>Work</h4> <p>${woman.work}</p>` : '') + 
                `
        </div>
`;
allWom.insertAdjacentHTML("beforeend",womenHTML);