var lijst = document.querySelector("#demo");
var baseURL = "https://fdnd.directus.app/items/women_in_tech";
var response = await fetch(baseURL);
var womenData = await response.json();
var women = womenData.data;

const state = { 
    inline: {
        change: undefined,
        changing: undefined,
    },
    block: {
        change: undefined,
        changing: undefined,
    }
};

const demo = document.getElementById('demo');

demo.onscrollsnapchanging = function(event) {
    if (state.block.changing) {
        state.block.changing.classList.remove('snap-changing-inline');
    }
    if (state.inline.changing) {
        state.inline.changing.classList.remove('snap-changing-inline');
    }

    if (event.snapTargetInline) {
        event.snapTargetInline.classList.add('snap-changing-inline');
    }
    if (event.snapTargetBlock) {
        event.snapTargetBlock.classList.add('snap-changing-inline');
    }
    
    state.inline.changing = event.snapTargetInline;
    state.block.changing = event.snapTargetBlock;
};

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Infinite scrolling logic
const loadMoreItems = () => {
    // Shuffle the women array before appending
    const shuffledWomen = shuffleArray([...women]);
    shuffledWomen.forEach(woman => {
        let womenHTML = `
                        <li>
                            <a href=persoon.html?id=${woman.id}>
                                <img src="https://fdnd.directus.app/assets/${woman.image}" alt="Image 1">
                                <h3>${woman.name}</h3>
                            </a>
                        </li>
                        `;
        lijst.insertAdjacentHTML("beforeend",womenHTML);
    });
};

demo.addEventListener('scroll', () => {
    if (demo.scrollTop + demo.clientHeight >= demo.scrollHeight - 100 || demo.scrollLeft + demo.clientWidth >= demo.scrollWidth - 100) {
        loadMoreItems();
    }
});

// Initial load
loadMoreItems();