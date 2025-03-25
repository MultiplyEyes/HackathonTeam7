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


demo.onscrollsnapchanging = function(event) {
    if (state.block.changing, state.inline.changing) {
        state.block.changing.classList.remove('snap-changing-inline');
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
