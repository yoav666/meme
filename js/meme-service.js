'use strict'
const MEME = 'MEME'
var gMeme;
var gFilterBy={
    txt:''
};
var gKeyWords = {
    'happy': 0,
    'funny': 0,
}
var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy','strong','trump','bb'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['funny','cute'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['funny','sweet'] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: ['funny'] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: ['funny'] },
];

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getImgToDisplay() {
    return gImgs
}
function getImgToDisplay() {
    console.log('hi')
    var regex = new RegExp(gFilterBy.txt, 'i')
    var imgs = gImgs.filter(function(img) {
        return regex.test(img.keywords)
    })
    return imgs
}
function getNewMeme(imgId, currIdx, posX, posY) {
    createMeme(imgId, currIdx, posX, posY)
    saveToStorage(MEME, gMeme)
    return gMeme
}
function getMeme() {
    return gMeme
}
function textAdd(newLine) {
    gMeme.lines.push(newLine)
    saveToStorage(MEME, gMeme)
    return gMeme.lines
}

function createMeme(id, currIdx, posX = gCanvas.width / 2, posY = gCanvas.height / 10, txt = makeLorem(3), size = 50, font = 'IMPACT', align = 'center', color = 'black', strokeColor = 'white') {
    gMeme = {
        id,
        url: `meme-imgs/${id}.jpg`,
        lines: [
            {
                txt,
                currIdx,
                color,
                strokeColor,
                size,
                font,
                align,
                posX,
                posY,
            },
        ]
    }
}
function changeText(idx, char) {
    var text = gMeme.lines[idx].txt
    text = char
    gMeme.lines[idx].txt = text
    return gMeme.lines
}
//need to make it better.... now its for 3 not so good!!!!
function deleteMeme(idx) {
    var firstposx = gMeme.lines[idx].posX
    var firstposy = gMeme.lines[idx].posY
    if (gMeme.lines[idx + 1]) {
        var nexttposx = gMeme.lines[idx + 1].posX
        var nexttposy = gMeme.lines[idx + 1].posY
    }
    gMeme.lines.splice(idx, 1)
    if (!gMeme.lines.length) return gMeme
    gMeme.lines.forEach(line => {
        if (line.currIdx < idx) line.currIdx = line.currIdx
        if (line.currIdx > idx) {
            if (line.currIdx - idx === 1) {
                line.posX = firstposx
                line.posY = firstposy
            }
            if (line.currIdx - idx === 2) {
                line.posX = nexttposx
                line.posY = nexttposy
            }
            line.currIdx--
        }
    });
    return gMeme
}
function changeFontSize(idx, diff) {
    var currFontSize = gMeme.lines[idx].size
    currFontSize += diff
    gMeme.lines[idx].size = currFontSize
}
function changeFont(idx, font) {
    var currFont = gMeme.lines[idx].font
    currFont = font
    gMeme.lines[idx].font = currFont
}
function changeAlign(idx, align) {
    var currAlign = gMeme.lines[idx].align
    currAlign = align
    gMeme.lines[idx].align = currAlign
}
function changeStrokeColor(idx, strokeColor) {
    var currStrokeColor = gMeme.lines[idx].strokeColor
    currStrokeColor = strokeColor
    gMeme.lines[idx].strokeColor = currStrokeColor
}
function changeFillColor(idx, fillColor) {
    var currFillColor = gMeme.lines[idx].color
    currFillColor = fillColor
    gMeme.lines[idx].color = currFillColor

}
function moveText(idx, diffY) {
    var currPosY = gMeme.lines[idx].posY
    currPosY += diffY
    gMeme.lines[idx].posY = currPosY
}