const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const cc = JSON.parse(fs.readFileSync(appDir + '/data/cc.json'));




    function sendRandomCC(client,channelId) {
        const cantoNum = Math.floor(Math.random() * 3)    
        const canto = cc[cantoNum]
        const chapterNum = Math.floor(Math.random() * canto.length)
        const chapter = canto[chapterNum]
        const quoteNum = Math.floor(Math.random() * chapter.length)
        client.channels.cache.get(channelId).send({content: `${chapter[quoteNum]} ** ${cantoNum+1}.${chapterNum+1}.${quoteNum+1} ** `})
    }



    module.exports = sendRandomCC