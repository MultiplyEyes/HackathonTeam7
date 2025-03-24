let url = new URLSearchParams(window.location.search);
let id = url.get('id');

var baseURL = "https://fdnd.directus.app/items/women_in_tech";
var endPoint = "?filter={%22id%22:"+id+"}";
var apiURL = baseURL + endPoint;
var response = await fetch(apiURL);
var lookForMyData = await response.json();

console.log(id);

console.log(lookForMyData.data[0].name)