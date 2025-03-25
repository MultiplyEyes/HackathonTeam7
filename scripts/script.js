const state = {
    inline: {
      change: undefined,
      changing: undefined,
    },
    block: {
      change: undefined,
      changing: undefined,
    }
  }
  
  demo.onscrollsnapchange = event => {
    state.inline.change?.classList.remove('snapped-inline')
    state.block.change?.classList.remove('snapped-block')
    
    event.snapTargetInline?.classList.add('snapped-inline')
    event.snapTargetBlock?.classList.add('snapped-block')
    
    state.inline.change = event.snapTargetInline
    state.block.change = event.snapTargetBlock
  }
  
  demo.onscrollsnapchanging = event => {
    state.inline.changing?.classList.remove('snap-changing-inline')
    state.block.changing?.classList.remove('snap-changing-block')
    
    event.snapTargetInline?.classList.add('snap-changing-inline')
    event.snapTargetBlock?.classList.add('snap-changing-block')
    
    state.inline.changing = event.snapTargetInline
    state.block.changing = event.snapTargetBlock
  }