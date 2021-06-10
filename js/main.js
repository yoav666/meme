'use strict'
var gCanvas;
var gCtx;
var gstartPos;
var gText;
var gImg;
var gfontSize;
var gfontColor;
var gfontStrokeColor;
var gTextAlign;
var gPos;
var gLines = 0;
var gCurrIdx = 0;
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
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}
function onImgSelect(imgId) {
    var galleryContainer = document.querySelector('.gallery-container')
    galleryContainer.style.display = 'none'
    var memeEditor = document.querySelector('.canvas-container-out')
    memeEditor.style.display='flex'
    resizeCanvas()
    gstartPos = { posX: gCanvas.width / 2, posY: gCanvas.height / 8 }
    console.log(gstartPos)
    var memeToCanvas = getNewMeme(imgId, gCurrIdx, gstartPos.posX, gstartPos.posY)
    gText = memeToCanvas.lines[gCurrIdx].txt
    gfontSize = memeToCanvas.lines[gCurrIdx].size
    gfontColor = memeToCanvas.lines[gCurrIdx].color
    gfontStrokeColor = memeToCanvas.lines[gCurrIdx].strokeColor
    gTextAlign = memeToCanvas.lines[gCurrIdx].align
    var posX = memeToCanvas.lines[gCurrIdx].posX
    var posY = memeToCanvas.lines[gCurrIdx].posY
    gPos = { posX, posY }
    gImg = memeToCanvas.url
    drawImg(gImg, gText, gstartPos.posX, gstartPos.posY)

    // galleryContainer.hidden = true;

}
function closeEditor() {
    var galleryContainer = document.querySelector('.gallery-container')
    galleryContainer.style.display = 'grid'
    var memeEditor = document.querySelector('.canvas-container-out')
    memeEditor.style.display='none'
    gCurrIdx = 0

}

function onTextAdd(txt) {
    var inputText = document.querySelector('input[name=input-text]')
    if(!inputText.value)return
    var meme = loadFromStorage(MEME)
    console.log('gpos', gPos)
    var newLine = {
        txt: txt,
        currIdx: gCurrIdx,
        size: gfontSize,
        color: gfontColor,
        strokeColor: gfontStrokeColor,
        posX: gPos.posX,
        posY: gPos.posY,
    }
    textAdd(newLine)
    // console.log(gLines)
    // if (meme.lines.length <= 1) {
    //     gPos = { posX: gCanvas.width / 2, posY: gCanvas.height - gCanvas.height / 10 }
    //     drawText(txt, gPos.posX, gPos.posY)
    //     gLines++
    //     gCurrIdx++
    // } else {
    //     gPos = { posX: gCanvas.width / 2, posY: gCanvas.height / 2 }
    //     drawText(txt, gPos.posX, gPos.posY)
    //     gLines++
    //     gCurrIdx++
    // }

    meme.lines.forEach(line => {
        console.log('line curr', line.currIdx)
        if(line.currIdx===0){
            // drawImgAfter(meme.url, meme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8)
            drawText(line.txt,gCanvas.width/2,gCanvas.height/8)
        }
        if (line.currIdx === 1) {
            console.log('hi')
            console.log(gCanvas.w)
            // drawImgAfter(meme.url, meme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8)
            drawText(line.txt, gCanvas.width / 2, gCanvas.height -30)
        }
        //  else {
        //     // drawImgAfter(meme.url, meme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8)
        //     // drawText(line.txt, gCanvas.width / 2, gCanvas.height / 2)
        // }
    })
    inputText.value = ''
}
// var gchar = ''
function onTextAddNow(char) {
    // gchar = char
    // // getMeme()
    var meme = loadFromStorage(MEME)
    drawImgAfter(meme.url, char, gCanvas.width / 2, gCanvas.height / 2)
    // // drawImg(meme.url,)
    // drawText(char,gCanvas.width/2,gCanvas.height/2)
    // meme.lines.forEach(line => {
    //     if (line.currIdx===0){
    //         drawText(line.txt,gCanvas.width/2,gCanvas.height/8)
    //     }

    // });
    // saveToStorage()
    // gCtx.restore()
    // var inputText = document.querySelector('input[name=input-text]')
    // gchar = inputText.value
    // var x = getMeme()
    // console.log(x)
    // x.lines.forEach(line => {

    // });
    // drawImg(gImg,gText,200,400)
    // drawImg(gImg,char,200,400)
    // inputText.value = `${char}`
    // drawImg()
}
function onChangeLines(num) {
    var meme = getMeme()
    var lineLength = meme.lines.length
    console.log(lineLength)
    console.log('glines', gLines)
    var idx = gLines
    console.log('idx', idx)
    idx += num
    if (idx === lineLength || idx > lineLength) idx = 0
    if (idx < 0) idx = lineLength - 1
    gLines = idx
    console.log('idx', idx)
    if (idx === 0) {
        console.log('posx', meme.lines[idx].posX)
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'red'
        gCtx.strokeRect(1, 10, gCanvas.width - 1, 70)
        console.log('meme0', meme.lines[idx].txt)
        var inputText = document.querySelector('input[name=input-text]')
        inputText.value = meme.lines[idx].txt
    }
    if (idx === 1) {
        console.log('posx', meme.lines[idx].posX)
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'green'
        gCtx.strokeRect(1, gCanvas.height - 100, gCanvas.width - 1, 70)
        console.log('meme1', meme.lines[idx].txt)
        var inputText = document.querySelector('input[name=input-text]')
        inputText.value = meme.lines[idx].txt

    }
    if (idx >= 2) {
        console.log('posx', meme.lines[idx].posX)
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'yellow'
        gCtx.strokeRect(1, gCanvas.height / 2 - gfontSize, gCanvas.width - 1, 70)
        console.log('meme' + idx, meme.lines[idx].txt)
        var inputText = document.querySelector('input[name=input-text]')
        inputText.value = meme.lines[idx].txt
    }
}

function renderGallery() {
    var imgs = getImgTodisplay()
    var strHTMLs = imgs.map(function (img) {
        return `<img id="${img.id}" onclick="onImgSelect(this.id)" src="${img.url}">`
    })
    var elgallery = document.querySelector('.gallery-container')
    elgallery.innerHTML = strHTMLs.join('')
}
function changeFontSize(num) {
    gfontSize += num
}
function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gfontStrokeColor
    gCtx.fillStyle = gfontColor
    gCtx.font = `${gfontSize + 'px'} IMPACT`
    gCtx.textAlign = gTextAlign
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
function drawImg(url, text, posX, posY) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gCtx.lineWidth = 2
        gCtx.strokeStyle = gfontStrokeColor
        gCtx.fillStyle = gfontColor
        gCtx.font = `${gfontSize + 'px'} IMPACT`
        gCtx.textAlign = gTextAlign
        gCtx.fillText(text, posX, posY)
        gCtx.strokeText(text, posX, posY)
        gLines++
        gCurrIdx++
        // gCtx.save()
    }
}
function drawImgAfter(url, text, posX, posY) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gCtx.lineWidth = 2
        gCtx.strokeStyle = gfontStrokeColor
        gCtx.fillStyle = gfontColor
        gCtx.font = `${gfontSize + 'px'} IMPACT`
        gCtx.textAlign = gTextAlign
        gCtx.fillText(text, posX, posY)
        gCtx.strokeText(text, posX, posY)
    }
}
