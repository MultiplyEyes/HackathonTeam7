var lijst = document.querySelector("#women");
var baseURL = "https://fdnd.directus.app/items/women_in_tech";
var response = await fetch(baseURL);
var womenData = await response.json();

var women = womenData.data;

// console.log(women);

women.forEach(woman => {
    console.log(woman.id);
    // let womenHTML = `<p>${woman.name}</p>`
    let womenHTML = `
                    <li>
                        <a href=persoon.html?id=${woman.id}>
                            <img src=" https://fdnd.directus.app/assets/${woman.image}" alt="Image 1">
                            <h3>${woman.name}</h3>
                        </a>
                    </li>
                    `
    lijst.insertAdjacentHTML("beforeend",womenHTML)
});