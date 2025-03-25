// Uses css grid for the items for no apparent reason
// Original idea, with less issues from https://codepen.io/radixzz/pen/eRJKXy

console.clear();

let photos = Array.from({length: 26}, (v,i)=> i).map( i => `https://anemolo-codepen.s3.amazonaws.com/thumb_${i}.jpg` ) 
// The infinite grid changes the img.src for all images on a jump.
// And downloading that new images shows a flash. Even if it's a blob, or saved on storage
// So, I just convert the images > blobs > dataURI to make the flash go away.
// The drawback is that it doesn't work with large images
photos = photos.map( (src,i) => {
  return fetch(src).then(r => r.blob()).then((blob)=>{
    // Yolo swag blobs
    let reader  =  new FileReader();
    reader.readAsDataURL(blob);
    
    return new Promise( (resolve, reject) =>{
      reader.onload = function(){
        resolve(reader.result);
        //Hopefully this does not cause a memory leak :b
        photos[i] = reader.result;
      }
      reader.onerror = function(){
        reject('Error on reader');
        //Hopefully this does not cause a memory leak :b
        photos[i] = '';
      }
    });
  })
})


class GridItem  {
  constructor(index = 0){
    this.item = document.createElement('div');
    // this.item.append(document)
    this.img = document.createElement('img');
    this.index = index;
    this.setImage();
    // console.log(index)
    
    
    // this.item.append(this.img);
    this.item.classList.add('grid-item');
  }
  setIndex(index){
    this.index = index;
    this.setImage()
  }
  setImage(){
    let image = photos[(this.index % photos.length)];
    if(Object.prototype.toString.call(image) === "[object String]" ){
      this.item.style.backgroundImage = `url(${image})`;
    } else {
      image.then((src)=>{
        this.item.style.backgroundImage = `url(${src})`;
      })
    }
  }
}
class Drag {
  constructor(ele, handleDrag){
     this.dragging = false;
    this.lastX = null;
    this.lastY = null;
    this.handleDrag = handleDrag;
    
    ele.addEventListener('touchstart', this.onStart.bind(this), false);
    ele.addEventListener('touchmove', this.onMove.bind(this), false);
    ele.addEventListener('touchend', this.onEnd.bind(this), false);
    
    ele.addEventListener('mousedown', this.onStart.bind(this))
    ele.addEventListener('mousemove', this.onMove.bind(this));
    ele.addEventListener('mouseup', this.onEnd.bind(this));
    ele.addEventListener('mouseuot', this.onEnd.bind(this));
  }
  onStart(ev){
    ev = ev.type == 'touchstart' ? ev.touches[0] : ev;
    
    this.dragging = true;
    this.lastX = ev.clientX;
    this.lastY = ev.clientY;
    
  }
  onMove(ev){
    
    if(!this.dragging) return; 
    
    
    ev = ev.type == "touchmove" ? ev.touches[ 0 ] : ev;
    let xDelta = ev.clientX - this.lastX;
    let yDelta = ev.clientY - this.lastY;
    let vel = Math.abs(xDelta * yDelta);
    if(vel > 50){
      let v = {x: xDelta * 0.5, y:yDelta * 0.5};
      if(this.anime) this.anime.pause();
      this.anime = anime(
      {targets: v,
        x: 0,
        y: 0,
       update: (anim)=>{
         this.handleDrag(v.x,v.y)
       }
      }
      )
    }
    this.handleDrag(xDelta, yDelta);
    this.lastX = ev.clientX;
    this.lastY = ev.clientY;
    
  }
  onEnd(ev){
    this.dragging = false;
    
  }
}
class InfiniteGrid {
  constructor(nCol = 2, nRow = 2){
    this.grid = document.getElementById('grid');
    this.container = document.getElementById('container');
    this.Drag = new Drag(this.container, this.onDrag.bind(this));
    this.offsetX = 0;
    this.offsetY = 0;
    // Overshoot items
    this.items = [];
    this.setGrid(nCol,nRow);
    
    
    
  }
  onDrag(xDelta, yDelta){
    this.offsetX += xDelta;
    this.offsetY += yDelta;
    
    // Move the grid back by 1 item whenever it goes over 1/2 of an item
    // Making the movement invisible
    const itemWidth = 100./this.cols;
    const itemHeight = 100./this.rows;
    const pixelWidth = (itemWidth * window.innerWidth) / 100;
    const pixelHeight = (itemHeight * window.innerHeight) / 100;
    let jumpX = null;
    let jumpY = null;
    if(Math.abs(this.offsetX) > pixelWidth/2.){
      this.offsetX -= pixelWidth* Math.sign(this.offsetX);
      jumpX = Math.sign(this.offsetX);
    }
    if(Math.abs(this.offsetY) > pixelHeight/2.){
      this.offsetY -= pixelHeight * Math.sign(this.offsetY);
      jumpY = Math.sign(this.offsetY);
    }
    // console.log(this.rows, this.cols, jumpY)
    if(jumpX || jumpY){
      this.items.forEach(item => {
        if(jumpX) item.setIndex(this.shiftIndex(item.index + jumpX));
        if(jumpY) item.setIndex(this.shiftIndex(item.index + jumpY * (this.cols +2 )));
      })
    }
    
    this.grid.style.transform = `translate(${this.offsetX}px,${this.offsetY}px)`;
  }
  shiftIndex(index){
    if(index < 0 ){
      index = this.items.length + index;
    }
    index = index % this.items.length;
    
    return index;
  }
  
  setGrid(nCol = 2, nRow = 2) {            
    if(nCol === this.cols && nRow === this.rows) return;
    
    // Overshoot items
    const cols = nCol + 2;
    const rows = nRow + 2;
    // Add space for 2 more rows and columns using the current col/row size
    this.container.style.width = `${100 + 100/nCol*2.}vw`;
    this.container.style.height = `${100 + 100/nRow*2.}vh`;
     // Move the grid back by 1 col and row
    this.container.style.transform = `translate(${-100/nCol}vw, ${-100/nRow}vh)`
    
    // Do everything else taking into account the overshoot items
    this.grid.style.gridTemplateColumns = Array.from({length: cols}, ()=>'1fr').join(' ');
    this.grid.style.gridTemplateRows =  Array.from({length: rows}, ()=>'1fr').join(' ');
    
    const nItems =  cols * rows;
    this.cols = nCol;
    this.rows = nRow; 
    while(nItems < this.items.length){
    this.grid.removeChild(this.grid.children[this.items.length -1]);
      this.items = this.items.slice(0,this.items.length - 1);
    }
    while(nItems > this.items.length) {
        const item = new GridItem(this.items.length);
        this.items = this.items.concat(item);
        this.grid.append(item.item) 
    }
    
    this.items.forEach((item,index)=>{
      item.setIndex(index);
    })
    
  }
}

const grid = getColsAndRows();
const Infinite = new InfiniteGrid(grid.cols,grid.rows);

window.addEventListener('resize', ()=>{
const aspectRatio = window.innerWidth / window.innerHeight;
  
  const grid = getColsAndRows();
  Infinite.setGrid(grid.cols, grid.rows);
})

function getColsAndRows(){
  let cols = 3;
  let rows = 3;
  if(window.innerWidth > 800){
    cols = 4;
    rows = 4;
  }
  if(window.innerWidth < 500){
    rows = 1;
  }
  
const aspectRatio = window.innerWidth / window.innerHeight;
  
  cols +=  Math.max(0,Math.floor(aspectRatio) - 1);
  rows += Math.max(0, Math.floor(1. / (aspectRatio - 0.4)) -1)
  
  rows = Math.min(5, rows);
  cols = Math.min(8, cols);
  
  return {cols, rows};
}