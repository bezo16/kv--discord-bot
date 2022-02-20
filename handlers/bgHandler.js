const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const bg = JSON.parse(fs.readFileSync(appDir + '/data/BG-cs.json'));
const bgsk = JSON.parse(fs.readFileSync(appDir + '/data/BG-sk.json'));
const sendImg = require('../functions/sendImageQuote')


function bgHandler(message) {

    if(message.content.split(' ').length === 2) {
        let firstWord = message.content.split(" ")[0]  
        let secondWord = message.content.split(" ")[1]

        
        if( firstWord.toLowerCase() === 'bg' || firstWord.toLowerCase() === 'bgi' || firstWord.toLowerCase() === 'bgsk' || firstWord.toLowerCase() === 'bgisk') {
            if(secondWord.includes('.')  && secondWord.charAt(0) != '.' && secondWord.charAt(secondWord.length-1) != '.' ){ 
                let splitSecondWord = secondWord.split(".")
                let chapter = splitSecondWord[0]           
                let chapterText = splitSecondWord[1]    
                
                console.log('BG WRITEN')

                if(!isNaN(chapterText) && !isNaN(chapter) ){  
                    if(chapter < 1 ) chapter = 1                
                    if(chapterText < 1 ) chapterText = 1
                    if(chapter > 18) chapter = 18
                    if(chapterText > bg[chapter-1].length) chapterText = bg[chapter-1].length
                    
                    // LANGUAGES
                    
                    let resultText = bg[chapter-1][chapterText-1]
                    if(firstWord.toLowerCase() === 'bgsk' || firstWord.toLowerCase() === 'bgisk') resultText = bgsk[chapter-1][chapterText-1]
                    
                    if(firstWord.toLowerCase() === 'bgi' || firstWord.toLowerCase() === 'bgisk') sendImg(message,resultText, `Bhagavad-Gītā ${chapter}.${chapterText}`) 
                    else if(firstWord.toLowerCase() === 'bg' || firstWord.toLowerCase() === 'bgsk') {
                        if(resultText.length <= 256) {
                            let gitaEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle( resultText)
                            .setDescription(`[Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
                            message.channel.send(gitaEmbed)
                        } else {
                            let gitaEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setDescription(`${resultText} \n [Bhagavad-Gītā ${chapter}.${chapterText}](https://vedabase.io/sk/library/bg/${chapter}/${chapterText}/)`)
                            message.channel.send(gitaEmbed)
                        }
                    }
                }
            }
            
            if(secondWord === "k"){ 
                message.channel.send("KAPITOLA PRVÁ: Pozorovanie armád na Kuruovskom bojisku\nKAPITOLA DRUHÁ: Zhrnutie obsahu Bhagavad-gīty \nKAPITOLA TRETIA: Karma-yoga \nKAPITOLA ŠTVRTÁ: Transcendentálne poznanie \nKAPITOLA PIATA: Karma-yoga — konanie s mysľou upretou na Kṛṣṇu \nKAPITOLA ŠIESTA: Dhyāna-yoga \nKAPITOLA SIEDMA: Poznanie o Absolútnom \nKAPITOLA ÔSMA: Dosiahnutie Najvyššieho \nKAPITOLA DEVIATA: Najdôvernejšie poznanie \nKAPITOLA DESIATA: Majestát Absolútneho \nKAPITOLA JEDENÁSTA: Vesmírna podoba \nKAPITOLA DVANÁSTA: Oddaná služba \nKAPITOLA TRINÁSTA: Príroda, požívateľ, vedomie \nKAPITOLA ŠTRNÁSTA: Tri kvality hmotnej prírody \nKAPITOLA PÄTNÁSTA: Yoga Najvyššej Osobnosti \nKAPITOLA ŠESTNÁSTA: Božské a démonské povahy \nKAPITOLA SEDEMNÁSTA: Druhy viery \nOSEMNÁSTA KAPITOLA: Dokonalosť odriekania")
            }
            if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'bg'){ 
                chapter = Math.floor(Math.random() * 18);   
                chapterText = Math.floor(Math.random() * bg[chapter].length)
                let resultText = bg[chapter][chapterText]
                let resultQuote = ` ${chapter +1}.${chapterText +1}`
                let gitaEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle( resultText)
                .setDescription(`[Bhagavad-Gītā ${resultQuote}](https://vedabase.io/sk/library/bg/${chapter + 1}/${chapterText + 1}/)`)
                message.channel.send(gitaEmbed)
            }
            if(secondWord.toLowerCase() === 'r' && firstWord.toLowerCase() === 'bgi'){ 
                chapter = Math.floor(Math.random() * 18);   
                chapterText = Math.floor(Math.random() * bg[chapter].length)
                let resultText = bg[chapter][chapterText]
                let resultQuote = `Bhagavad-Gītā ${chapter +1}.${chapterText +1}`
                sendImg(message,resultText,resultQuote)
            }
            if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'bg') {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = selectedQuoteBg[0]
                let quote = selectedQuoteBg[1]
                message.channel.send(`${bg[chapter -1][quote -1].text}  Bhagavad-Gītā ** ${chapter}.${quote} ** `)
            }
            if(secondWord.toLowerCase() === 'top' && firstWord.toLowerCase() === 'bgi') {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = selectedQuoteBg[0]
                let quote = selectedQuoteBg[1]
                sendImg(message,`${bg[chapter -1][quote -1]}`,`Bhagavad-Gītā ${chapter}.${quote}`)
            }
        }
    }
    }
    
    
    
    module.exports = bgHandler