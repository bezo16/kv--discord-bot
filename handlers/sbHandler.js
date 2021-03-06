const { channel } = require('diagnostics_channel');
const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const sb = JSON.parse(fs.readFileSync(appDir + '/data/sb2.json'));
const rkQuotesSb = require('../data/rk-sb')
const sendImg = require('../functions/sendImageQuote')

const sendRandomSb = require('../functions/sendRandomSb')
const sendRandomSbImage = require('../functions/sendRandomSbImage')


    function sbHandler(message,client) {
    const channelId = message.channelId


    let firstWord = message.content.split(" ")[0]  
    let secondWord = message.content.split(" ")[1]
    


    if(firstWord.toLowerCase() === 'sb' || firstWord.toLowerCase() === 'sbi') {

    if(secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length -1) !== '.' && secondWord.includes('.')) { 
        let canto = secondWord.split('.')[0]
        let chapter = secondWord.split('.')[1]
        let quote = secondWord.split('.')[2]
        
        if(!isNaN(canto) && !isNaN(chapter) && !isNaN(quote)) { 
            canto = Number(canto)
            chapter = Number(chapter)
            quote = Number(quote)
            if(canto < 1) canto = 1
            if(chapter < 1) chapter = 1
            if(quote < 1) quote = 1
            if(canto > 12) canto = 12
            if(sb[canto -1].length  < chapter) chapter = sb[canto -1].length
            if(sb[canto -1][chapter -1].length  < quote) quote = sb[canto -1][chapter -1].length

            let sendMessageText = sb[canto -1][chapter -1][quote -1]

             if( firstWord.toLowerCase() === 'sb') {
                 let srimadEmbed = new Discord.MessageEmbed()
                 .setColor('#0099ff')
                 .setDescription(` ${sendMessageText} \n [Śrīmad-Bhāgavatam ${canto}.${chapter }.${quote}](https://vedabase.io/cs/library/sb/${canto}/${chapter}/${quote}/)`)
                 message.channel.send({embeds: [srimadEmbed]})
             }
              else {
                sendImg(client,channelId,sendMessageText,` Śrīmad-Bhāgavatam ${canto}.${chapter}.${quote}`) 
             }
             }
         }


    if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'sb') { 
          sendRandomSb(client,channelId)
    }  
      
     if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'sbi') { 
          sendRandomSbImage(client,channelId)
       }   
       
 
    if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'sb') { 
       let selQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length )].split('.')
       let cantoNum = Number(selQuote[0])   
       let chapterNum = Number(selQuote[1])
       let quoteNum = Number(selQuote[2])
       message.channel.send(` Śrīmad-Bhāgavatam ${sb[cantoNum -1][chapterNum -1][quoteNum -1]} ** Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum} **`)
     }

     if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'sbi') { 
         let selQuote = ''
         while(!selQuote) {
            const quote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length )]
            if(typeof(quote) === 'string') selQuote = quote

         }
         let cantoNum = Number(selQuote.split('.')[0])   
         let chapterNum = Number(selQuote.split('.')[1])
         let quoteNum = Number(selQuote.split('.')[2])
         sendImg(client,channelId,sb[cantoNum -1][chapterNum -1][quoteNum -1],`Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}`)
       }

} 
    }


    module.exports = sbHandler