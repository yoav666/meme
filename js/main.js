'use strict'
var gCanvas;
var gCtx;
// var gstartPos;
var gText;
var gImg;
var gfontSize;
var gfontColor;
var gfontStrokeColor;
var gTextAlign;
var gPos;
// var gTexts=[]

function onInit() {
    gCanvas = document.querySelector('.canvas')
    gCtx = gCanvas.getContext('2d')
    // addEventListeners()
    // resizeCanvas()
    renderGallery()

}
// function addEventListeners(){
//     gCanvas.addEventListener('mousemove',onMove)
//     gCanvas.addEventListener('mousedown',onDown)
//     gCanvas.addEventListener('mouseup',onUp)
// }
// function onUp(){

// }
// function onDown(){

// }
// function onMove(){

// }
// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container')
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }
function onImgSelect(imgId) {
    var memeToCanvas = getNewMeme(imgId)
    console.log(memeToCanvas.lines[0].txt)
    gText = memeToCanvas.lines[0].txt
    gfontSize=memeToCanvas.lines[0].size
    gfontColor=memeToCanvas.lines[0].color
    gfontStrokeColor=memeToCanvas.lines[0].strokeColor
    gTextAlign=memeToCanvas.lines[0].align
    var posX=memeToCanvas.lines[0].posX
    var posY=memeToCanvas.lines[0].posY
    
    gImg=memeToCanvas.url
    // gTexts.push(text)
    drawImg(gImg,gText,posX,posY)
    var galleryContainer = document.querySelector('.gallery-container')
    galleryContainer.hidden = true;
    var memeEditor = document.querySelector('.canvas-container-out')
    memeEditor.hidden = false
}

function onTextAdd(txt) {
    var newLine={
        txt:txt,
        size:gfontSize,
        color:gfontColor,
        strokeColor:gfontStrokeColor,
    }
    var lineidx=textAdd(newLine)
    if (lineidx<=2){
        drawText(txt, 400, 700)
    }else{
        drawText(txt, 400, 350)
    }
    var inputText = document.querySelector('input[name=input-text]')
    inputText.value = ''
}
// function onTextAddNow(char){
//     drawText(char,200,400)
//     var inputText = document.querySelector('input[name=input-text]')
//     inputText.value = `${char}`
//     drawImg()
// }
function onChangeLines(num){
    var meme=getMeme()
    var lineLength=meme.lines.length
   var lastLine= meme.lines[lineLength-1].txt
   var line=meme.lines[(lineLength-1)+num].txt
   lastLine=line
   console.log(line)
//    if !line
//    console.log(lastLine)
//    console.log(meme.lines.length)
//    console.log(meme.lines.)
}
function renderGallery() {
    var imgs = getImgTodisplay()
    var strHTMLs = imgs.map(function (img) {
        return `<img id="${img.id}" onclick="onImgSelect(this.id)" src="${img.url}">`
    })
    var elgallery = document.querySelector('.gallery-container')
    elgallery.innerHTML = strHTMLs.join('')
}
function changeFontSize(num){
    gfontSize+=num
}
function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gfontStrokeColor
    gCtx.fillStyle = gfontColor
    gCtx.font = `${gfontSize+'px'} IMPACT`
    gCtx.textAlign = gTextAlign
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
function drawImg(url,text,posX,posY) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gCtx.lineWidth = 2
        gCtx.strokeStyle = gfontStrokeColor
        gCtx.fillStyle = gfontColor
        gCtx.font = `${gfontSize+'px'} IMPACT`
        gCtx.textAlign = gTextAlign
        gCtx.fillText(text, posX, posY)
        gCtx.strokeText(text, posX, posY)
    }
}
