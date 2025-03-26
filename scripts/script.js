var lijst = document.querySelector("#demo");
var baseURL = "https://fdnd.directus.app/items/women_in_tech";
var response = await fetch(baseURL);
var womenData = await response.json();
var women = womenData.data;

const demo = document.getElementById('demo');

// Add smooth scrolling CSS
demo.style.scrollBehavior = 'smooth';

demo.onscrollsnapchange = event => {
    demo.querySelector(':scope .snapped')?.classList.remove('snapped')
    event.snapTargetInline.classList.add('snapped')
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
const loadMoreItems = (count = 10) => {
    // Shuffle the women array before appending
    const shuffledWomen = shuffleArray([...women]).slice(0, count);
    const fragment = document.createDocumentFragment();
    shuffledWomen.forEach(woman => {
        let womenHTML = `
                        <li>
                            <a href=persoon.html?id=${woman.id}>
                                <ul class="card" style="background-image: url('https://fdnd.directus.app/assets/${woman.image}');">
                                    <li class="name">
                                        <h2>${woman.name}</h2>
                                    </li>
                                    <li class="color">
                                    </li>
                                    <li class="tagline">
                                        <p>${woman.tagline}</p>               
                                    </li>
                                    <li class="period">
                                        <p>${woman.period}</p>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5217 13.4798C11.2884 14.2466 12.3286 14.6779 13.4135 14.6788C13.7721 14.6738 14.1291 14.6281 14.4774 14.5426C15.1679 14.3509 15.7974 13.9849 16.3052 13.4798L17.2737 12.5125L20.1517 9.62398C20.8746 8.84914 21.2681 7.82429 21.2494 6.76536C21.2307 5.70643 20.8012 4.69609 20.0515 3.94719C19.3017 3.1983 18.2903 2.76932 17.2301 2.75064C16.17 2.73195 15.144 3.12502 14.3683 3.84703L11.4902 6.73551" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12.4449 17.3357L9.55321 20.2241C8.77213 20.9143 7.75675 21.2805 6.71446 21.248C5.67216 21.2155 4.68161 20.7868 3.94511 20.0494C3.20861 19.312 2.78174 18.3215 2.75169 17.2803C2.72163 16.2391 3.09066 15.2258 3.7834 14.4472L6.67512 11.5587L7.64358 10.5913C8.1514 10.0862 8.78087 9.72024 9.47137 9.52861C10.1661 9.34294 10.8975 9.34342 11.5919 9.52999C12.2864 9.71656 12.9193 10.0826 13.427 10.5913" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> 
                                    </li>
                                    <li class="gradient">
                                    </li>
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

demo.addEventListener('scroll', () => {
    if (demo.scrollTop + demo.clientHeight >= demo.scrollHeight - 100 || demo.scrollLeft + demo.clientWidth >= demo.scrollWidth - 100) {
        loadMoreItems();
    }
});

// Observe all list items
const observeListItems = () => {
    const listItems = lijst.querySelectorAll('li');
    listItems.forEach(item => observer.observe(item));
};

// Initial load with more items
loadMoreItems(20);
observeListItems();
