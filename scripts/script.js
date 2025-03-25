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

// Infinite scrolling logic
const loadMoreItems = () => {
    women.forEach(woman => {
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
};

demo.addEventListener('scroll', () => {
    if (demo.scrollTop + demo.clientHeight >= demo.scrollHeight - 100 || demo.scrollLeft + demo.clientWidth >= demo.scrollWidth - 100) {
        loadMoreItems();
    }
});

// Initial load
loadMoreItems();