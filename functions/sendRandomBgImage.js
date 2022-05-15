const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const bg = JSON.parse(fs.readFileSync(appDir + '/data/BG-cs.json'));
const sendImg = require('./sendImageQuote')






function sendRandomBgImage(client,channelId) {



        console.log(client,channelId)

        // data
        chapter = Math.floor(Math.random() * 18);   
        chapterText = Math.floor(Math.random() * bg[chapter].length)
        let resultText = bg[chapter][chapterText]
        let resultQuote = `Bhagavad-Gītā ${chapter +1}.${chapterText +1}`
        // output
        sendImg(client,channelId,resultText,resultQuote)

}

module.exports = sendRandomBgImage