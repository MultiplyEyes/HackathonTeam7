// var slides = document.getElementsByClassName("persons");

// for (let i = 0; i < slides.length; i++) {
//     console.log(i);
//     console.log(slides[i].value);
// }
var lijst = document.querySelector("ul");
var baseURL = "https://fdnd.directus.app/items/women_in_tech";
var response = await fetch(baseURL);
var womenData = await response.json();

var women = womenData.data;

// console.log(women);

women.forEach(woman => {
    console.log(woman.id);
    let womenHTML = `<p>${woman.name}</p>`
    lijst.insertAdjacentHTML("beforeend",womenHTML)
});