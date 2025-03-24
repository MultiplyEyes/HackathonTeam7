// var slides = document.getElementsByClassName("persons");

// for (let i = 0; i < slides.length; i++) {
//     console.log(i);
//     console.log(slides[i].value);
// }
var lijst = document.querySelector("#women");
var baseURL = "https://fdnd.directus.app/items/women_in_tech";
var response = await fetch(baseURL);
var womenData = await response.json();

var women = womenData.data;

// console.log(women);

women.forEach(woman => {
    console.log(woman.id);
    // let womenHTML = `<p>${woman.name}</p>`
    let womenHTML = `<a href=persoon.html?id=${woman.id}>
                        <li>
                            <img src=" https://fdnd.directus.app/assets/${woman.image}" alt="Image 1">
                            <h3>${woman.name}</h3>
                        </li>
                    </a>`
    lijst.insertAdjacentHTML("beforeend",womenHTML)
});