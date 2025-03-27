let lijst = document.querySelector("#demo");
let baseURL = "https://fdnd.directus.app/items/women_in_tech";
console.log(baseURL);
let response = await fetch(baseURL);
let womenData = await response.json();
let women = womenData.data;

const demo = document.getElementById('demo');

// Add smooth scrolling CSS
lijst.style.scrollBehavior = 'smooth';

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Debounce function to limit scroll event calls
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// Infinite scrolling logic
const loadMoreItems = (count = 10) => {
    const shuffledWomen = shuffleArray([...women]).slice(0, count);
    const fragment = document.createDocumentFragment();
    shuffledWomen.forEach(woman => {
        let womenHTML = `
                <li class="card-item">
                    <a href="persoon.html?id=${woman.id}" style="--sibling-index:${woman.id}">
                        <ul class="card" style="background-image: url('https://fdnd.directus.app/assets/${woman.image}')">
                            <li class="name">
                            <h2>${woman.name}</h2>
                            <h3>${woman.name}</h3>
                            </li>
                            <li class="color"></li>
                            <li class="tagline"><p>${woman.tagline}</p></li>
                            <li class="period"><p>${woman.period}</p></li>
                            <li class="gradient"></li>
                        </ul>
                    </a>
                </li>
            `;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = womenHTML;
        fragment.appendChild(tempDiv.firstElementChild);
    });
    lijst.appendChild(fragment);
};

// IntersectionObserver to remove items that are not visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            entry.target.remove();
        }
    });
}, {
    root: demo,
    threshold: 0
});

// Debounced scroll event listener
demo.addEventListener('scroll', debounce(() => {
    if (demo.scrollTop + demo.clientHeight >= demo.scrollHeight - 100 || demo.scrollLeft + demo.clientWidth >= demo.scrollWidth - 100) {
        loadMoreItems();
    }
}, 200));

// Observe all list items
const observeListItems = () => {
    const listItems = lijst.querySelectorAll('li');
    listItems.forEach(item => observer.observe(item));
};

// Initial load with more items
loadMoreItems(50);
observeListItems();