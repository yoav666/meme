'use strict'
const MEME = 'MEME'
var gMeme;
var gKeyWords = {
    'happy': 0,
    'funny': 0,
}
var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: ['funny'] },
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
// var gMeme = {
//     selectedImgId: null,
//     selectedLineIdx: null,
//     lines: [
//         {   
//             txt: 'I never eat falafel',
//             size: 50,
//             align: 'center',
//             color: 'black',
//             strokeColor: 'white'
//         },
//     ]
// }



// function getImg(imgId) {
//     var img = gImgs.find(function (img) {
//         return +imgId === img.id
//     })
//     return img.url
// }

function getImgTodisplay() {
    return gImgs
}
function getNewMeme(imgId,currIdx,posX,posY) {
    createMeme(imgId,currIdx,posX,posY)
    saveToStorage(MEME, gMeme)
    console.log(gMeme)
    return gMeme
}
function getMeme() {
    return gMeme
}
// function getMeme(imgId) {
//     gMeme.selectedImgId = +imgId
//     gMeme.selectedLineIdx = gMeme.selectedImgId - 1
//     var line = gMeme.lines[gMeme.selectedLineIdx]
//     return line
// }
// function textAdd(newTxt) {
//     console.log(gMeme.selectedImgId)
//     gMeme.lines[gMeme.selectedLineIdx].txt.push(newTxt)
//     console.log(gMeme)
//     console.log(gMeme.lines[gMeme.selectedLineIdx])
// }
function textAdd(newLine) {
    gMeme.lines.push(newLine)
    saveToStorage(MEME, gMeme)
    console.log(gMeme)
    return gMeme.lines
    // gMeme.lines.push(newLine)
}
// function changeFontSize(line){
    
// }

function createMeme(id,currIdx, posX=gCanvas.width/2, posY=gCanvas.height/10, txt = makeLorem(3), size = 50, align = 'center', color = 'black', strokeColor = 'white') {
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
                align,
                posX,
                posY,
            },
        ]
    }
}
function deleteMeme(idx){
    console.log(idx)
var memeToDel=gMeme.lines[idx]
gMeme.lines.splice(idx,1)
if(!gMeme.lines.length)return gMeme
gMeme.lines.forEach(line => {
    if (line.currIdx<idx) line.currIdx=line.currIdx
    if (line.currIdx>idx)line.currIdx--
    // line.currIdx--
    // if (line.currIdx<0) line.currIdx=gMeme.lines.length
    // if (line.currIdx<0) line.currIdx=0
});
console.log(memeToDel)
console.log(gMeme)
return gMeme
}
function changeFontSize(idx,diff){
var currFontSize=gMeme.lines[idx].size
console.log(currFontSize)
currFontSize+=diff
console.log(currFontSize)
gMeme.lines[idx].size=currFontSize
console.log(gMeme)
return gMeme.lines
}