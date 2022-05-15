const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const sb = JSON.parse(fs.readFileSync(appDir + '/data/sb2.json'));
const sendImg = require('../functions/sendImageQuote')

function sendRandomSbImage(client,channelId) {
    const cantoNum = Math.floor(Math.random() * 12)    
    const canto = sb[cantoNum]
    const chapterNum = Math.floor(Math.random() * canto.length)
    const chapter = canto[chapterNum]
    const quoteNum = Math.floor(Math.random() * chapter.length)
    sendImg(client,channelId,chapter[quoteNum],` Śrīmad-Bhāgavatam ${cantoNum+1}.${chapterNum+1}.${quoteNum+1}`)
}


module.exports = sendRandomSbImage