'use strict'
var gKeyWords = {
    'happy': 0,
    'funny': 0,
}
var gImgs = [
    { id: 1, url: '/meme-imgs (square)/1.jpg', keywords: ['happy'] },
    { id: 2, url: '/meme-imgs (square)/2.jpg', keywords: ['funny'] },
    { id: 3, url: '/meme-imgs (square)/3.jpg', keywords: ['funny'] }


];
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: [
        {
            txt: 'I never eat falafel',
            size: 20,
            align: 'Left',
            color: 'red'
        },
        {
            txt: 'I never eat cats',
            size: 20,
            align: 'Left',
            color: 'red'
        }
    ]
}

function getImg(imgId) {
    var img = gImgs.find(function (img) {
        return  imgId===img.id
})
getMeme(imgId)
return img.url
}
function getMeme(imgId){
    gMeme.selectedImgId=imgId

return gMeme.lines[0].txt
}
