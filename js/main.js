'use strict'
var gCanvas;
var gCtx;
var gCanvasUp;
var gCtxUp;

function onInit() {
    gCanvas = document.querySelector('.canvas')
    gCtx = gCanvas.getContext('2d')
    gCanvasUp=document.querySelector('.canvas-up');
    gCtxUp=gCanvasUp.getContext('2d')

}
function onImgSelect(imgId) {
    // console.log(+imgId)
    var imgToCanvas = getImg(+imgId)
    // console.log(imgToCanvas)
    drawImg(imgToCanvas)
    var memeToCanvas=getMeme(+imgId)
    drawText(memeToCanvas,150,100)
    var container = document.querySelector('.gallery-container')
    container.hidden = true;
    var memeEditor = document.querySelector('.canvas-container')
    memeEditor.hidden = false
}

function drawImg(url) {
    var img = new Image()
    img.src = url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function drawText(text, x, y) {
    gCtxUp.lineWidth = 2
    gCtxUp.strokeStyle = 'red'
    gCtxUp.fillStyle = 'white'
    gCtxUp.font = '40px Arial'
    gCtxUp.textAlign = 'center'
    gCtxUp.fillText(text, x, y)
    gCtxUp.strokeText(text, x, y)
}