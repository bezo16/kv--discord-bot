const Discord = require('discord.js')
const Canvas = require('canvas') 
const resize = require('../functions/resizes')
const { registerFont} = require('canvas'); 
registerFont('./fonts/Gabriola.ttf', { family: 'Comic Sans' })

async function sendImageQuote(client,channelId,text,quote,canvasreturn=false) {
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
            else if(letter === 'ṁ') item += 'm'
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
        client.channels.cache.get(channelId).send({files:[atachment]})
    }
}

module.exports = sendImageQuote