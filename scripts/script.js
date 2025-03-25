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
    for (let i = 0; i < 10; i++) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = './images/duck.jpg';
        img.alt = `Image ${demo.children.length + 1}`;
        const h3 = document.createElement('h3');
        h3.textContent = `Title ${demo.children.length + 1}`;
        li.appendChild(img);
        li.appendChild(h3);
        demo.appendChild(li);
    }
};

demo.addEventListener('scroll', () => {
    if (demo.scrollTop + demo.clientHeight >= demo.scrollHeight - 100 || demo.scrollLeft + demo.clientWidth >= demo.scrollWidth - 100) {
        loadMoreItems();
    }
});

// Initial load
loadMoreItems();