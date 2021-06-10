'use strict'


function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['sky', 'above', 'the', 'was', 'tuned', 'to', ' dead ', 'css', 'All', 'happened', 'more', 'less', 'css', 'I', 'had', 'story', 'bit', 'people', 'and', 'such', 'each', 'it', 'was', 'html', 'js', 'but', 'high', 'css', 'It', 'was', 'pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


