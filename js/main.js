'use strict'
var gCanvas;
var gCtx;
var gstartPos;
var gText;
var gImg;
var gfont
var gfontSize;
var gfontColor;
var gfontStrokeColor;
var gTextAlign;
var gPos;
var gLines = 0;
var gCurrIdx = 0;
var gIsChange = false;

function onInit() {
    gCanvas = document.querySelector('.canvas')
    gCtx = gCanvas.getContext('2d')

    renderGallery()

}

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
    gfont = memeToCanvas.lines[gCurrIdx].font
    gfontColor = memeToCanvas.lines[gCurrIdx].color
    gfontStrokeColor = memeToCanvas.lines[gCurrIdx].strokeColor
    gTextAlign = memeToCanvas.lines[gCurrIdx].align
    var posX = memeToCanvas.lines[gCurrIdx].posX
    var posY = memeToCanvas.lines[gCurrIdx].posY
    gPos = { posX, posY }
    gImg = memeToCanvas.url
    drawImg(gImg, gText, gstartPos.posX, gstartPos.posY)
    var btnAdd = document.querySelector('.add-meme')
    btnAdd.addEventListener('click', onTextAdd)

}
function closeEditor() {
    var galleryContainer = document.querySelector('.gallery-container')
    galleryContainer.style.display = 'grid'
    var memeEditor = document.querySelector('.canvas-container-out')
    memeEditor.style.display = 'none'
    gCurrIdx = 0

}

function onTextAdd(ev, txt) {
    var inputText = document.querySelector('input[name=input-text]')
    if (!inputText.value) return
    ev.stopPropagation()
    if (gIsChange) return
    var meme = getMeme()
    var newLine = {
        txt: txt,
        currIdx: gCurrIdx,
        size: gfontSize,
        font: gfont,
        color: gfontColor,
        strokeColor: gfontStrokeColor,
        align: gTextAlign,
    }
    if (meme.lines.length === 0) {
        newLine.posX = gPos.posX
        newLine.posY = gPos.posY
    } else if (meme.lines.length === 1) {
        newLine.posX = gCanvas.width / 2
        newLine.posY = gCanvas.height - gCanvas.height / 10
    } else {
        newLine.posX = gCanvas.width / 2
        newLine.posY = gCanvas.height - gCanvas.height / 2
    }
    textAdd(newLine)
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    drawImgAfter(meme.url)
    drawTextAgain()
    gLines++
    gCurrIdx++
    inputText.value = ''
}
function drawTextAgain() {
    var lines = getMeme()
    lines.lines.forEach(line => {
        if (line.currIdx === 0) {
            console.log('line curr', line.currIdx)
            drawText(line.txt, line.color, line.strokeColor, line.size, line.font, line.align, line.posX, line.posY)
        } else if (line.currIdx === 1) {
            drawText(line.txt, line.color, line.strokeColor, line.size, line.font, line.align, line.posX, line.posY)
        } else {
            console.log('line curr', line.currIdx)
            drawText(line.txt, line.color, line.strokeColor, line.size, line.font, line.align, line.posX, line.posY)
        }
    })
}
function onChangeLines(ev, num = 0) {
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
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'red'
    gCtx.strokeRect(1, meme.lines[idx].posY - meme.lines[idx].size, gCanvas.width - 1, meme.lines[idx].size + meme.lines[idx].size / 10)
    console.log('meme0', idx, meme.lines[idx].txt)
    var inputText = document.querySelector('input[name=input-text]')
    inputText.value = meme.lines[idx].txt
    var btnAdd = document.querySelector('.add-meme')
    btnAdd.style.backgroundColor = 'yellowgreen'
    gIsChange = true
    inputText.addEventListener('input', onChangeText)
    btnAdd.removeEventListener('click', onTextAdd)
    btnAdd.addEventListener('click', onAproveText)

}
function onChangeStrokeColor(color){
    gfontStrokeColor=color
    if (!gIsChange) return
    gCtx.save()
    changeStrokeColor(gLines,color)
    var meme = getMeme()
    drawImgAfter(meme.url)
    drawTextAgain()
    onChangeLines()
    gCtx.restore()
}
function onChangeFillColor(color){
    gfontColor=color
    if (!gIsChange) return
    gCtx.save()
    changeFillColor(gLines,color)
    var meme = getMeme()
    drawImgAfter(meme.url)
    drawTextAgain()
    onChangeLines()
    gCtx.restore()
}
function onChangeText() {
    var meme = getMeme()
    var inputText = document.querySelector('input[name=input-text]')
    console.log('hi changing', gLines)
    console.log(inputText.value)
    changeText(gLines, inputText.value)
    drawTextAgain()
    drawImgAfter(meme.url)
    onChangeLines()
}
function onAproveText(ev) {
    ev.stopPropagation()
    var meme = getMeme()
    drawTextAgain()
    drawImgAfter(meme.url)
    if (gIsChange) {
        gIsChange = false
        drawTextAgain()
    }
    var btnAdd = document.querySelector('.add-meme')
    var inputText = document.querySelector('input[name=input-text]')
    inputText.removeEventListener('input', onChangeText)
    inputText.value = ''
    btnAdd.style.backgroundColor = 'white'
    btnAdd.removeEventListener('click', onAproveText)
    btnAdd.addEventListener('click', onTextAdd)
}
function onChangeFontSize(ev, num) {
    gfontSize+=num
    if (!gIsChange) return
    ev.stopPropagation()
    gCtx.save()
    changeFontSize(gLines, num)
    var meme = getMeme()
    drawImgAfter(meme.url)
    drawTextAgain()
    onChangeLines()
    gCtx.restore()
}
function onChangeFont(ev, fontName) {
    gfont = fontName
    console.log('hi fontName', fontName)
    if (!gIsChange) return
    ev.stopPropagation()
    gCtx.save()
    changeFont(gLines, fontName)
    var meme = getMeme()
    drawImgAfter(meme.url)
    drawTextAgain()
    onChangeLines()
    gCtx.restore()
}
function onChangeAlign(ev, align) {
    if (!gIsChange) return
    gCtx.save()
    changeAlign(gLines, align)
    console.log('changing align', gLines)
    var meme = getMeme()
    drawImgAfter(meme.url)
    drawTextAgain()
    onChangeLines()
    gCtx.restore()
}
function onDeleteMeme() {
    if (!gIsChange) return
    var meme = getMeme()
    if (!meme.lines.length) return
    console.log(gLines)
    var memeafter = deleteMeme(gLines)
    gLines--
    gCurrIdx--
    var inputText = document.querySelector('input[name=input-text]')
    inputText.value = ''
    var btnAdd = document.querySelector('.add-meme')
    btnAdd.style.backgroundColor = 'white'
    inputText.removeEventListener('input', onChangeText)
    btnAdd.removeEventListener('click', onAproveText)
    btnAdd.addEventListener('click', onTextAdd)
    gIsChange = false
    drawImgAfter(memeafter.url)
    drawTextAgain()
}
function drawText(text, fontColor = 'black', fontStrokeColor = 'white', fontSize = 50, font = 'IMPACT', textAlign = 'center', x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = fontStrokeColor
    gCtx.fillStyle = fontColor
    gCtx.font = `${fontSize + 'px'} ${font}`
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
        gCtx.font = `${gfontSize + 'px'} ${gfont}`
        gCtx.textAlign = gTextAlign
        gCtx.fillText(text, posX, posY)
        gCtx.strokeText(text, posX, posY)
        gLines++
        gCurrIdx++
    }
}
function drawImgAfter(url) {
    var img = new Image()
    img.src = url;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}
function renderGallery() {
    var imgs = getImgTodisplay()
    var strHTMLs = imgs.map(function (img) {
        return `<img id="${img.id}" onclick="onImgSelect(this.id)" src="${img.url}">`
    })
    var elgallery = document.querySelector('.gallery-container')
    elgallery.innerHTML = strHTMLs.join('')
}