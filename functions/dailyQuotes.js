const Discord = require('discord.js')
const fs = require('fs')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const sb = JSON.parse(fs.readFileSync(appDir + '/data/BG-cs.json'));
const bg = JSON.parse(fs.readFileSync(appDir + '/data/BG-cs.json'));


    function dailyQuotes(client) {
    let cooldown = 0.01 // time for next quote to main chat(pokec)
    let channelID = '810552435981680702' // ID of pokec channel

        setInterval(() => {
            // let random = Math.floor(Math.random() * 2)  
            let random = 0  
            if(random === 1) {
                let selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length )].split('.')
                let chapter = Number(selectedQuoteBg[0])
                let quote = Number(selectedQuoteBg[1])
    
                let gitaEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(bg[chapter - 1][quote - 1])
                .setDescription(`[Bhagavad-Gītā ${chapter}.${quote}](https://vedabase.io/sk/library/bg/${chapter}/${quote}/)`)
                client.channels.cache.get(channelID).send(gitaEmbed)
            } else {
                let ranQuote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length )]
                if(typeof(ranQuote) == 'object') {
                    for(i = 0; i < ranQuote.length; i++) {
                        let cantoNum = Number(ranQuote[i].split('.')[0])   
                        let chapterNum = Number(ranQuote[i].split('.')[1])
                        let quoteNum = Number(ranQuote[i].split('.')[2])
                        
                        let srimadEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        // .setTitle('Śrīmad-Bhāgavatam')
                        .setDescription(`${sb[cantoNum -1][chapterNum -1][quoteNum -1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum }/${quoteNum}/)`)
                        
                        client.channels.cache.get(channelID).send(srimadEmbed)
                    }
                }
                else {
    
                    let selQuote = ranQuote.split('.')
                    let cantoNum = Number(selQuote[0])   
                    let chapterNum = Number(selQuote[1])
                    let quoteNum = Number(selQuote[2])
                    
                    let srimadEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    // .setTitle('Śrīmad-Bhāgavatam')
                    .setDescription(`${sb[cantoNum -1][chapterNum -1][quoteNum -1]} \n\n [Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}](https://vedabase.io/cs/library/sb/${cantoNum}/${chapterNum }/${quoteNum}/)`)
                    
                    client.channels.cache.get(channelID).send(srimadEmbed)
                }
            }      
    }, 3600000 * cooldown);

    }


    module.exports = dailyQuotes