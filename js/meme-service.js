'use strict'
var gMeme;
var gKeyWords = {
    'happy': 0,
    'funny': 0,
}
var gImgs = [
    { id: 1, url: '/meme-imgs (square)/1.jpg', keywords: ['happy'] },
    { id: 2, url: '/meme-imgs (square)/2.jpg', keywords: ['funny'] },
    { id: 3, url: '/meme-imgs (square)/3.jpg', keywords: ['funny'] },
    { id: 4, url: '/meme-imgs (square)/4.jpg', keywords: ['happy'] },
    { id: 5, url: '/meme-imgs (square)/5.jpg', keywords: ['funny'] },
    { id: 6, url: '/meme-imgs (square)/6.jpg', keywords: ['funny'] },
    { id: 7, url: '/meme-imgs (square)/7.jpg', keywords: ['happy'] },
    { id: 8, url: '/meme-imgs (square)/8.jpg', keywords: ['funny'] },
    { id: 9, url: '/meme-imgs (square)/9.jpg', keywords: ['funny'] },
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
function getNewMeme(imgId){
    createMeme(imgId)
    console.log(gMeme)
    return gMeme
}
function getMeme(){
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
function textAdd(newLine){
    
    gMeme.lines.push(newLine)
    console.log(gMeme)
    return gMeme.lines.length
    // gMeme.lines.push(newLine)
}


function createMeme(id, txt = makeLorem(3), size = 50, align = 'center', color = 'black', strokeColor = 'white', posX=400,posY=100) {
    gMeme = {
        id,
        url: '/meme-imgs (square)/' + id + '.jpg',
        lines: [
            {
            txt,
            size,
            align,
            color,
            strokeColor,
            posX,
            posY,
        },
    ]
    }}
   