
const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const cc = JSON.parse(fs.readFileSync(appDir + '/data/cc.json'));
const sendImg = require('../functions/sendImageQuote')


    function ccHandler(message) {

    if(message.content.split(' ').length === 2) {
        let firstWord = message.content.split(" ")[0].toLowerCase()
        let secondWord = message.content.split(" ")[1].toLowerCase()    
    


    if(firstWord === 'cc' || firstWord === 'cci') {



        if(secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length -1) !== '.' && secondWord.includes('.') && (firstWord === 'cc' || firstWord === 'cci')) { 
            let canto = secondWord.split('.')[0]
            let chapter = secondWord.split('.')[1]
            let quote = secondWord.split('.')[2]
            if(!isNaN(canto) && !isNaN(chapter) && !isNaN(quote)) { 
                if(canto < 1) canto = 1
                if(chapter < 1) chapter = 1
                if(quote < 1) quote = 1
                if(canto > 12) canto = 12
                if(cc[canto -1].length  < chapter) chapter = cc[canto -1].length
                if(cc[canto -1][chapter -1].length  < quote) quote = cc[canto -1][chapter -1].length
                if(firstWord === 'cc')message.channel.send(cc[canto -1][chapter -1][quote -1])
                else sendImg(message,cc[canto -1][chapter -1][quote -1],`Śrī Caitanya-Caritāmrta ${canto}.${chapter}.${quote}`)
                }
            }
    
        if(firstWord == 'cc' && secondWord === 'r') { 
        let cantoNum = Math.floor(Math.random() * 3)    
        let canto = cc[cantoNum]
        let chapterNum = Math.floor(Math.random() * canto.length)
        let chapter = canto[chapterNum]
        let quoteNum = Math.floor(Math.random() * chapter.length)
        message.channel.send(`${chapter[quoteNum]} ** ${cantoNum+1}.${chapterNum+1}.${quoteNum+1} ** `)
        }

        if(firstWord === 'cci' && secondWord === 'r') { 
            let cantoNum = Math.floor(Math.random() * 3)    
            let cantoArray = cc[cantoNum]
            let chapterNum = Math.floor(Math.random() * cantoArray.length)
            let chapter = cantoArray[chapterNum]
            let quoteNum = Math.floor(Math.random() * chapter.length)
            sendImg(message,chapter[quoteNum],`Śrī Caitanya-Caritāmrta ${cantoNum +1}.${chapterNum +1}.${quoteNum +1}`)
        }

    }

    }



}


module.exports = ccHandler