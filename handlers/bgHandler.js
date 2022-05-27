const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const bg = JSON.parse(fs.readFileSync(appDir + '/data/BG-cs.json'));
const bgsk = JSON.parse(fs.readFileSync(appDir + '/data/BG-sk.json'));
const rkQuotesBg = require('../data/rk-bg')
const sendImg = require('../functions/sendImageQuote')

const sendRandomBg = require('../functions/sendRandomBg')
const sendRandomBgImage = require('../functions/sendRandomBgImage')


function bgHandler(message,client) {
    const channelId = message.channelId

    if(message.content.split(' ').length === 2) {
        let firstWord = message.content.split(" ")[0]  
        let secondWord = message.content.split(" ")[1]

        
        if( firstWord.toLowerCase() === 'bg' || firstWord.toLowerCase() === 'bgi' || firstWord.toLowerCase() === 'bgsk' || firstWord.toLowerCase() === 'bgisk') {

            if(secondWord.includes('.')  && secondWord.charAt(0) != '.' && secondWord.charAt(secondWord.length-1) != '.' ){ 
                let splitSecondWord = secondWord.split(".")
                let chapter = splitSecondWord[0]           
                let chapterText = splitSecondWord[1]    
                

                if(!isNaN(chapterText) && !isNaN(chapter) ){  
                    if(chapter < 1) chapter = 1                
                    if(chapter > 18) chapter = 18
                    if(chapterText < 1) chapterText = 1
                    if(chapterText > bg[chapter-1].length) chapterText = bg[chapter-1].length
                    let resultText = bg[chapter-1][chapterText-1]
                    
                    // LANGUAGES 
                        // change to svk
                    if(firstWord.toLowerCase() === 'bgsk' || firstWord.toLowerCase() === 'bgisk') resultText = bgsk[chapter-1][chapterText-1]
                    
                    if(firstWord.toLowerCase() === 'bgi' || firstWord.toLowerCase() === 'bgisk') sendImg(client,channelId,resultText, `Bhagavad-Gītā ${chapter}.${chapterText}`) 
                    else if(firstWord.toLowerCase() === 'bg' || firstWord.toLowerCase() === 'bgsk') {
                        let link = `[Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`
                        if((link.length + resultText.length) <= 256) {
                            let gitaEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(resultText)
                            .setDescription(`[Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
                            message.channel.send({embeds:[gitaEmbed]})
                        } else {
                            let gitaEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setDescription(`${resultText} \n [Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
                            message.channel.send({embeds: [gitaEmbed]})
                        }
                    }
                }
            }

            if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'bg'){ 
                sendRandomBg(client,channelId)
            }
            if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'bgi'){ 
                sendRandomBgImage(client,channelId)
            }
            if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'bg') {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = selectedQuoteBg[0]
                let quote = selectedQuoteBg[1]
                message.channel.send(`${bg[chapter -1][quote -1]}  Bhagavad-Gītā ** ${chapter}.${quote} ** `)
            }
            if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'bgi') {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = selectedQuoteBg[0]
                let quote = selectedQuoteBg[1]
                sendImg(client,channelId,`${bg[chapter -1][quote -1]}`,`Bhagavad-Gītā ${chapter}.${quote}`)
            }
            if(secondWord === "k"){ 
                message.channel.send("KAPITOLA PRVÁ: Pozorovanie armád na Kuruovskom bojisku\nKAPITOLA DRUHÁ: Zhrnutie obsahu Bhagavad-gīty \nKAPITOLA TRETIA: Karma-yoga \nKAPITOLA ŠTVRTÁ: Transcendentálne poznanie \nKAPITOLA PIATA: Karma-yoga — konanie s mysľou upretou na Kṛṣṇu \nKAPITOLA ŠIESTA: Dhyāna-yoga \nKAPITOLA SIEDMA: Poznanie o Absolútnom \nKAPITOLA ÔSMA: Dosiahnutie Najvyššieho \nKAPITOLA DEVIATA: Najdôvernejšie poznanie \nKAPITOLA DESIATA: Majestát Absolútneho \nKAPITOLA JEDENÁSTA: Vesmírna podoba \nKAPITOLA DVANÁSTA: Oddaná služba \nKAPITOLA TRINÁSTA: Príroda, požívateľ, vedomie \nKAPITOLA ŠTRNÁSTA: Tri kvality hmotnej prírody \nKAPITOLA PÄTNÁSTA: Yoga Najvyššej Osobnosti \nKAPITOLA ŠESTNÁSTA: Božské a démonské povahy \nKAPITOLA SEDEMNÁSTA: Druhy viery \nOSEMNÁSTA KAPITOLA: Dokonalosť odriekania")
            }
        }
    }
    }
    
    
    
    module.exports = bgHandler