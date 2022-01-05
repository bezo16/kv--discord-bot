require('dotenv').config()
const { registerFont, createCanvas } = require('canvas') 
const Discord = require('discord.js')
const fs = require('fs') 
const Canvas = require('canvas')
const Instagram = require('instagram-web-api')
// config knižnic
const client = new Discord.Client()
const instagramClient = new Instagram({ username : process.env.IGUSERNAME, password: process.env.IGPASSWORD }) 
// DATA
const rkQuotesSb = require('./data/rk-sb')
const ig = require('./data/newig')
const rkQuotesBg = require('./data/rk-bg')
const sb = JSON.parse(fs.readFileSync(__dirname + '/data/sb2.json'));
const cc = JSON.parse(fs.readFileSync(__dirname + '/data/cc.json'));  
const miso = JSON.parse(fs.readFileSync(__dirname + '/data/citaty.json'));  
const bg = JSON.parse(fs.readFileSync(__dirname + '/data/BG-cs.json'));
const bgsk = JSON.parse(fs.readFileSync(__dirname + '/data/BG-sk.json'));
// FUNKCIE
const resize = require('./functions/resizes');
const postImageInstagram = require('./functions/postImageInstagram');
const bgHandler = require('./functions/bgHandler');
const sbHandler = require('./functions/sbHandler');
const ccHandler = require('./functions/ccHandler');
const kvEvents = require('./functions/kvEvents');
const ekadashi = require('./functions/ekadashi');
const dailyQuotes = require('./functions/dailyQuotes')
// FONTS 
registerFont('./fonts/Gabriola.ttf', { family: 'Comic Sans' })


// LOCAL FUNCTIONS 
    // postImageInstagram('',ig,sendImageQuote,instagramClient) 
    // setInterval(() => {
    //     postImageInstagram()
    // }, 3600000 * 5);


 // funkcie
 async function sendImageQuote(message,text,quote,canvasreturn=false) {
    let imageUrl
    let textLength = 0
    let resultText = ''
    let textWidth = null
    let quoteImage = {url:''}
    let randomNum = Math.floor(Math.random() * 64) + 1
    quoteImage.url =  `./img/bg${randomNum}.jpg` 
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
    let resizeValues = {
         posY : 160,
         posYChange : 72,
         charLength : 20,
    }

    resize(text,ctx,resizeValues)
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
            else if(letter === 'Ṭ') item += 'T'
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




client.once('ready',() => {   
    ekadashi() // EKADASI
    dailyQuotes(client) // automatic send of quotes to main chat
    
})

client.on('message',message =>{ 

    if(message.content.split(" ").length === 2){ 

    bgHandler(message,bg,sendImageQuote)      // BHAGAVAD GITA
    sbHandler(message,sb,sendImageQuote)      // SRIMAD BHAGABATAM    
    ccHandler(message,cc,sendImageQuote)      // CC

    kvEvents(message)                         // EVENTS
} 
                



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




if( message.author.bot){return;}
})



 client.login(process.env.TOKEN) 