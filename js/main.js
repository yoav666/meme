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
    memeEditor.style.display = 'flex'
    resizeCanvas()
    gstartPos = { posX: gCanvas.width / 2, posY: gCanvas.height / 10 }
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
    memeEditor.style.display = 'none'
    gCurrIdx = 0

}

function onTextAdd(ev, txt) {
    // var btnAdd=document.querySelector('.btn-add-meme')
    // if (btnAdd.style.backgroundColor==='red'){
    //     ev.preventDefualt()
    // }
    // btnAdd.style.backgroundColor='white'
    ev.stopPropagation()
    var meme = getMeme()
    // if (inputText.value === undefined) inputText.value = lines[gCurrIdx].txt
    // console.log(ev)
    var inputText = document.querySelector('input[name=input-text]')
    if (!inputText.value) return
    // var meme = loadFromStorage(MEME)
    // console.log('gpos', gPos)
    if (meme.lines.length === 0) {
        var newLine = {
            txt: txt,
            currIdx: gCurrIdx,
            size: gfontSize,
            color: gfontColor,
            strokeColor: gfontStrokeColor,
            posX: gPos.posX,
            posY: gPos.posY,
        }
    } else if (meme.lines.length === 1) {
        var newLine = {
            txt: txt,
            currIdx: gCurrIdx,
            size: gfontSize,
            color: gfontColor,
            strokeColor: gfontStrokeColor,
            posX: gCanvas.width / 2,
            posY: gCanvas.height - gCanvas.height / 10,
        }
    } else {
        var newLine = {
            txt: txt,
            currIdx: gCurrIdx,
            size: gfontSize,
            color: gfontColor,
            strokeColor: gfontStrokeColor,
            posX: gCanvas.width / 2,
            posY: gCanvas.height - gCanvas.height / 2,
        }

    }
    var lines = textAdd(newLine)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImgAfter(meme.url)
    drawTextAgain()
    // console.log(gLines)
    // if (lines.currIdx === 0) {
    //     console.log('hi0')
    //     gPos = { posX: gCanvas.width / 2, posY: gCanvas.height / 8 }
    //     // drawText(txt, gPos.posX, gPos.posY)
    //     gLines++
    //     gCurrIdx++
    // }
    // if (lines.currIdx === 1) {
    //     console.log('hi1')
    //     gPos = { posX: gCanvas.width / 2, posY: gCanvas.height - gCanvas.height / 10 }
    //     // drawText(txt, gPos.posX, gPos.posY)
    //     gLines++
    //     gCurrIdx++
    // } else {
    //     console.log('hi2...')
    //     gPos = { posX: gCanvas.width / 2, posY: gCanvas.height / 2 }
    //     // drawText(txt, gPos.posX, gPos.posY)
    // }
    gLines++
    gCurrIdx++
    inputText.value = ''
}
function drawTextAgain() {
    var lines = getMeme()
    lines.lines.forEach(line => {
        if (line.currIdx === 0) {
            console.log('line curr', line.currIdx)
            // drawImgAfter(meme.url, meme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8)
            drawText(line.txt, line.color, line.strokeColor, line.size, line.align, gCanvas.width / 2, gCanvas.height / 10)
        } else if (line.currIdx === 1) {
            // console.log('line curr', line.currIdx)
            // console.log('hi')
            // console.log(gCanvas.w)
            // drawImgAfter(meme.url, meme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8)
            drawText(line.txt, line.color, line.strokeColor, line.size, line.align, gCanvas.width / 2, gCanvas.height-20)
        } else {
            console.log('line curr', line.currIdx)
            //     // drawImgAfter(meme.url, meme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 8)
            drawText(line.txt, line.color, line.strokeColor, line.size, line.align, gCanvas.width / 2, gCanvas.height / 2)
        }
    })
}
// var gchar = ''
// function onTextAddNow(char) {
// gchar = char
// // getMeme()
// var meme = loadFromStorage(MEME)
// drawImgAfter(meme.url, char, gCanvas.width / 2, gCanvas.height / 2)
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
// }
function onChangeLines(ev, num = 0) {
    // ev.preventDefualt()
    // ev.stopPropagation()
    var meme = getMeme()
    if (!meme.lines.length) return
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImgAfter(meme.url)
    drawTextAgain()
    var lineLength = meme.lines.length
    var idx = gLines
    idx += num
    if (idx === lineLength || idx > lineLength) idx = 0
    if (idx < 0) idx = lineLength - 1
    gLines = idx
    if (idx === 0) {
        console.log('posy', meme.lines[idx].posY)
        console.log('posx', meme.lines[idx].posX)
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'red'
        gCtx.strokeRect(1, 1, gCanvas.width - 1, gCanvas.height / 10 + 10)
        console.log('meme0', idx, meme.lines[idx].txt)
        var inputText = document.querySelector('input[name=input-text]')
        inputText.value = meme.lines[idx].txt
        // var btnAdd=document.querySelector('.btn-add-meme').style.backgroundColor='red'
        // drawTextAgain()
        // drawText(inputText.value,gCanvas.width/2,gCanvas.height/8)
    }
    if (idx === 1) {
        console.log('posx', meme.lines[idx].posX)
        console.log('posy', meme.lines[idx].posY)
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'green'
        gCtx.strokeRect(1, gCanvas.height - gCanvas.height / 10, gCanvas.width - 1, gCanvas.height / 10)
        console.log('meme1', idx, meme.lines[idx].txt)
        var inputText = document.querySelector('input[name=input-text]')
        inputText.value = meme.lines[idx].txt

    }
    if (idx >= 2) {
        console.log('posx', meme.lines[idx].posX)
        console.log('posy', meme.lines[idx].posY)
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'yellow'
        gCtx.strokeRect(1, gCanvas.height / 2 - gCanvas.height / 10, gCanvas.width - 1, gCanvas.height / 10)
        console.log('meme' + idx, meme.lines[idx].txt)
        var inputText = document.querySelector('input[name=input-text]')
        inputText.value = meme.lines[idx].txt
    }
}
// function renderImg(){
//     getMeme()
// }
function textChanged() {
    console.log('hi')
}
function renderGallery() {
    var imgs = getImgTodisplay()
    var strHTMLs = imgs.map(function (img) {
        return `<img id="${img.id}" onclick="onImgSelect(this.id)" src="${img.url}">`
    })
    var elgallery = document.querySelector('.gallery-container')
    elgallery.innerHTML = strHTMLs.join('')
}
function onChangeFontSize(ev, num) {
    console.log(ev)
    ev.stopPropagation()
    gCtx.save()
    console.log(gLines, num)
    var lines = changeFontSize(gLines, num)
    console.log(lines)
    // drawText()
    var meme = getMeme()
    // console.log(meme)

    // var currFontSize = meme.lines[gLines].size
    // console.log(currFontSize)
    // currFontSize += num

    // changeFontSize(word)
    drawImgAfter(meme.url)
    drawTextAgain()
    onChangeLines()
    // gfontSize += num
    gCtx.restore()
}
function drawText(text, fontColor = 'black', fontStrokeColor = 'white', fontSize = 50, textAlign = 'center', x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = fontStrokeColor
    gCtx.fillStyle = fontColor
    gCtx.font = `${fontSize + 'px'} IMPACT`
    gCtx.textAlign = textAlign
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
function drawImgAfter(url) {
    var img = new Image()
    img.src = url;
    // img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    // gCtx.lineWidth = 2
    // gCtx.strokeStyle = gfontStrokeColor
    // gCtx.fillStyle = gfontColor
    // gCtx.font = `${gfontSize + 'px'} IMPACT`
    // gCtx.textAlign = gTextAlign
    // gCtx.fillText(text, posX, posY)
    // gCtx.strokeText(text, posX, posY)
    // }
}
function onDeleteMeme() {
    var meme = getMeme()
    if (!meme.lines.length) return
    console.log(gLines)
    var memeafter = deleteMeme(gLines)
    gLines--
    gCurrIdx--
    drawImgAfter(memeafter.url)
    drawTextAgain()
    // console.log(gCurrIdx)
}
