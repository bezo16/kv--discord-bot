require('dotenv').config()
const { registerFont, createCanvas } = require('canvas') 
const Discord = require('discord.js')
const fetch = require('node-fetch');
const fs = require('fs') 
const Canvas = require('canvas')
const moment = require('moment')
const request = require('request')
const puppeteer = require("puppeteer");
const fullScreenshot = require("fullpage-puppeteer-screenshot");
const Instagram = require('instagram-web-api')
// config knižnic
const client = new Discord.Client()
const instagramClient = new Instagram({ username : process.env.IGUSERNAME, password: process.env.IGPASSWORD }) 
// DATA
const ekadashi = require('./data/eka')
const rkQuotesSb = require('./data/rk-sb')
const ig = require('./data/newig')
const rkQuotesBg = require('./data/rk-bg')
let sb = JSON.parse(fs.readFileSync(__dirname + '/data/sb2.json'));  // vytiahne data z sb2.json (tam su všetky verše srimadu)
let cc = JSON.parse(fs.readFileSync(__dirname + '/data/cc.json'));  // vytiahne data z cc.json (tam su všetky verše srimadu)
let miso = JSON.parse(fs.readFileSync(__dirname + '/data/citaty.json'));  
let bg = JSON.parse(fs.readFileSync(__dirname + '/data/BG-cs.json'));
let bgsk = JSON.parse(fs.readFileSync(__dirname + '/data/BG-sk.json'));
// FUNKCIE
const resize = require('./functions/resizes');
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./functions/bgHandler');
const sbHandler = require('./functions/sbHandler');
// FONTS 
registerFont('./fonts/Gabriola.ttf', { family: 'Comic Sans' })


// LOCAL FUNCTIONS 
    // postImageInstagram('',ig,sendImageQuote,instagramClient) 
    // setInterval(() => {
    //     postImageInstagram()
    // }, 3600000 * 5);


 // funkcie
 async function sendImageQuote(message,text,quote,canvasreturn=false) {
     console.log('pes')
    console.log(message)
    let imageUrl
    let textLength = 0
    let resultText = ''
    let textWidth = null
    // let quoteImage = await fetch('https://picsum.photos/600')
    let quoteImage = {url:''}
    let randomNum = Math.floor(Math.random() * 64) + 1
    quoteImage.url =  `./img/bg${randomNum}.jpg` 
    // quoteImage.url =  `./img/kv19.jpg` 
    imageUrl = quoteImage.url
    imageUrl2 = `./img/logo.png`

    const canvas = Canvas.createCanvas(700,700)
    const ctx = canvas.getContext('2d')
    
    const background = await Canvas.loadImage(imageUrl)
    ctx.drawImage(background,0,0,canvas.width,canvas.height)
    
    const background2 = await Canvas.loadImage(imageUrl2)
    let logoWidth = 70
    let logoHeight = 50
    ctx.drawImage(background2,( 350 - (logoWidth / 2)),canvas.height - 85,logoWidth,logoHeight)


    console.log(quote + ' ' + text.length)
    // SIZES  SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES
    let resizeValues = {

         posY : 160,
         posYChange : 72,
         charLength : 20,
    }

    resize(text,ctx,resizeValues)
    //  SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES SIZES END
    let font = ctx.font.slice(0,2)

   
    let splitedText = text.split(' ')
    splitedText.forEach((item,index) =>{
        textLength += item.length
        let splititem = item.split('')
            item = ''
            splititem.forEach(letter => {

                if(letter === String.fromCharCode(7779)) item += 's'
                else if(letter === 'ṇ') item += 'n'
                else if(letter === 'ṅ') item += 'n'
                else if(letter === 'Ṛ') item += 'R'
                else if(letter === 'ṛ') item += 'r'
                else if(letter === 'ḥ') item += 'h'
                else if(letter === 'ṭ') item += 't'
                else if(letter === 'ḍ') item += 'd'
                else item += letter
            }) 

        if(textLength < resizeValues.charLength) {
            resultText += `${item} `
            if(index === splitedText.length - 1) {
                textLength = 0
                textWidth = ctx.measureText(resultText)
                ctx.shadowColor="black";
                ctx.shadowBlur= 5;
                ctx.lineWidth= 4;
                ctx.strokeText(resultText,((350) - (textWidth.width / 2)),resizeValues.posY);
                ctx.shadowBlur=0;
                ctx.fillStyle="white";
                ctx.fillText(resultText,((350) - (textWidth.width / 2)),resizeValues.posY);
                resultText = ''
                resizeValues.posY += resizeValues.posYChange
            }
        }
        else {
            resultText += `${item} `
            textLength = 0
            textWidth = ctx.measureText(resultText)
            ctx.shadowColor="black";
            ctx.shadowBlur=8;
            ctx.lineWidth=3;
            ctx.strokeText(resultText,((350) - (textWidth.width / 2)),resizeValues.posY);
            ctx.shadowBlur=0;
            ctx.fillStyle="white";
            ctx.fillText(resultText,((350) - (textWidth.width / 2)),resizeValues.posY);
            resultText = ''
            resizeValues.posY += resizeValues.posYChange
        }
    })
    
    
    ctx.font = `${Math.floor(font * 0.5 )}px Gabriola`
    ctx.shadowBlur = 1;
    
    let quoteText = quote
    textWidth = ctx.measureText(quoteText)
    
    ctx.fillText(quoteText,((350) - (textWidth.width / 2)),resizeValues.posY );

    ctx.font = "30px Gabriola"
    
    ctx.fillStyle = "white";
    let reinText = `@reinkarnacia.sk`
    textWidth = ctx.measureText(reinText)
    ctx.fillText(reinText,((350) - (textWidth.width / 2)),canvas.height - 15 );

    if(canvasreturn) return canvas.toBuffer()
    else {
        const atachment = new Discord.MessageAttachment(canvas.toBuffer(),'bot-quotes.png')
        message.channel.send(atachment)
    }
}





setInterval(() => {
        // let random = Math.floor(Math.random() * 2)  
        let random = 0  
        let channelID = '810552435981680702' 
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
}, 3600000 * 4);

client.once('ready',() => {   
    
    /// EKADASI
    /// EKADASI
    /// EKADASI

    let ekadashiFound = false
    setInterval(() => {
        if(!ekadashiFound) {

            ekadashi.forEach(eka => {
                let ekadashiText = ``
                let date1 = moment(eka.date)
                let date2 = moment()
                let diff = date1.diff(date2,'days')
                if(diff == 0 && !ekadashiFound && date2.hours() === 5 ) {
                    ekadashiText = `Dnes (${eka.date.split('-')[2]}.${eka.date.split('-')[1]}.${eka.date.split('-')[0]}) bude ${eka.name}, prečítajte si viac: ${eka.link}`
                    ekadashiFound = true
                    client.channels.cache.get('849347945798959124').send(ekadashiText)
                    setTimeout(() => {
                        ekadashiFound = false
                    }, 3600000);
                }
                if(diff == 1 && !ekadashiFound && date2.hours() === 19) {
                    ekadashiText = `Zajtra (${eka.date.split('-')[2]}.${eka.date.split('-')[1]}.${eka.date.split('-')[0]}) bude ${eka.name}, prečítajte si viac: ${eka.link}`
                    ekadashiFound = true
                    client.channels.cache.get('849347945798959124').send(ekadashiText)
                    setTimeout(() => {
                        ekadashiFound = false
                    }, 3600000);
                }
            })
        }
    }, 3600000);

                

    setInterval(() => {
        
        ekadashi.forEach(eka => {
            if(eka.end) {
                let end = moment(eka.end)
                if(end.month() === moment().month() && end.day() === moment().day() && end.hours() === moment().hours() && end.minutes() === moment().minutes() ) {
                    let startDva = Number(eka.end.split(' ')[1].split(':')[0]) * 60 + Number(eka.end.split(' ')[1].split(':')[1])    
                    let endDva = Number(eka.break.split(':')[0] * 60) + Number(eka.break.split(':')[1])
                    let minutesLeft = endDva - startDva 
                    client.channels.cache.get('849347945798959124').send(`ekadaši konči!! na ukončenie maš ${minutesLeft}minut (${eka.end.split(' ')[1].split('-')[0]}-${eka.break})`)
                }
            }
        })
    }, 60000);
    /// EKADASI
    /// EKADASI
    
})

client.on('message',message =>{ 




    
    if(message.content.split(" ").length === 2){ 
        let firstWord = message.content.split(" ")[0]  
        let secondWord = message.content.split(" ")[1]

                            bgHandler(message,bg,sendImageQuote)      // BHAGAVAD GITA
                            sbHandler(message,sb,sendImageQuote)    // SRIMAD BHAGABATAM    

                            ///////////////////////////// CC  /////////////////////////////////////////
                     

   if(firstWord.toLowerCase() === 'cc') {
       if(secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length -1) !== '.' && secondWord.includes('.')) { 
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
                message.channel.send(cc[canto -1][chapter -1][quote -1])
                }
            }
    
       if(secondWord.toLowerCase() === 'r') { 
          let cantoNum = Math.floor(Math.random() * 3)    
          let canto = cc[cantoNum]
          let chapterNum = Math.floor(Math.random() * canto.length)
          let chapter = canto[chapterNum]
          let quoteNum = Math.floor(Math.random() * chapter.length)
          message.channel.send(`${chapter[quoteNum]} ** ${cantoNum+1}.${chapterNum+1}.${quoteNum+1} ** `)
        }
    }


    if(firstWord.toLowerCase() === 'cci') {
        if(secondWord.charAt(0) !== '.' && secondWord.charAt(secondWord.length -1) !== '.' && secondWord.includes('.')) { 
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
                 sendImageQuote(message,cc[canto -1][chapter -1][quote -1],`Śrī Caitanya-Caritāmrta ${canto}.${chapter}.${quote}`)
                 }
             }
     
        if(secondWord.toLowerCase() === 'r') { 
           let cantoNum = Math.floor(Math.random() * 3)    
           let canto = cc[cantoNum]
           let chapterNum = Math.floor(Math.random() * canto.length)
           let chapter = canto[chapterNum]
           let quoteNum = Math.floor(Math.random() * chapter.length)
           sendImageQuote(message,chapter[quoteNum],`Śrī Caitanya-Caritāmrta ${cantoNum +1}.${chapterNum +1}.${quoteNum +1}`)
         }
     }
                       
             


                                           /////////////////////////// EVENTS
                                           /////////////////////////// EVENTS
                                           /////////////////////////// EVENTS
                                           /////////////////////////// EVENTS



                              
                   if(secondWord.toLowerCase() === 'events' && firstWord.toLowerCase() === 'kv') {
                    async function sendScreen()  {
                        const browser = await puppeteer.launch({headless: true,
                            args: ['--no-sandbox']});
                        const page = await browser.newPage();
                        await page.goto("https://objective-archimedes-06e9ca.netlify.app/?st=1", {
                          waitUntil: "networkidle2"
                        });
                      
                        await fullScreenshot(page, {
                          path: "foo.png"
                        });
                      
                        await browser.close(); 

                        const screenshot = await Canvas.loadImage('./foo.png')
                        const canvas = Canvas.createCanvas(1920,1400)
                        const ctx = canvas.getContext('2d')
                        ctx.drawImage(screenshot,0,0,canvas.width,canvas.height)
                        const atachment = new Discord.MessageAttachment(canvas.toBuffer(),'screenshot.png')
                        message.channel.send(atachment)
                        fs.unlink('./foo.png',() => {})
                    } sendScreen()
                }
                
                if(secondWord.toLowerCase().includes('events') && firstWord.toLowerCase() === 'kv' && !isNaN(secondWord.charAt(6)) && secondWord.length > 6) {
                    
                    
                    let year = secondWord.slice(6,8)
                    let month = secondWord.slice(8)


                    async function sendScreenDate()  {
                        const browser = await puppeteer.launch({headless: true,
                            args: ['--no-sandbox']});
                        const page = await browser.newPage();
                        await page.goto(`https://objective-archimedes-06e9ca.netlify.app/?date=20${year}-${month}-01&st=1`, {
                          waitUntil: "networkidle2"
                        });
                      
                        await fullScreenshot(page, {
                          path: "foo.png"
                        });
                      
                        await browser.close(); 

                        const screenshot = await Canvas.loadImage('./foo.png')
                        const canvas = Canvas.createCanvas(1200,1000)
                        const ctx = canvas.getContext('2d')
                        ctx.drawImage(screenshot,0,0,canvas.width,canvas.height)
                        const atachment = new Discord.MessageAttachment(canvas.toBuffer(),'screenshot.png')
                        message.channel.send(atachment)
                        fs.unlink('./foo.png',() => {})
                    } sendScreenDate()
                }




                                           /////////////////////////// EVENTS
                                           /////////////////////////// EVENTS
                                           /////////////////////////// EVENTS
                                           /////////////////////////// EVENTS


 
 
} 
                                           // END 2
                                           // END 2
                                           // END 2
                                           /////////////////////////// CUSTOM
                                           /////////////////////////// CUSTOM
                                           /////////////////////////// CUSTOM
                                           /////////////////////////// CUSTOM
                                           /////////////////////////// CUSTOM
                                           /////////////////////////// CUSTOM
 
 
                if(message.content.split(' ')[0].toLowerCase() === 'customquote' && message.content.includes('"') && message.content.includes('{') && message.content.includes('}')) {
                    let text = message.content.slice(message.content.indexOf('"') + 1,message.content.lastIndexOf('"'))
                    let book = message.content.slice(message.content.indexOf('{') + 1,message.content.indexOf('}'))
                    sendImageQuote(message,`${text}`,`${book}`)
                    setTimeout(() => {
                        message.delete()
                       }, 2000);
                   }

                   
                   
    
                                             /////////////////////////// CUSTOM
                                             /////////////////////////// CUSTOM
                                             /////////////////////////// CUSTOM
                                             /////////////////////////// CUSTOM
                                             /////////////////////////// CUSTOM
                                             /////////////////////////// CUSTOM
                                             /////////////////////////// CUSTOM


                    




if( message.author.bot){return;}
})



 client.login(process.env.TOKEN) 