const Discord = require('discord.js')
const puppeteer = require('puppeteer')
const Canvas = require('canvas')

   
   function kvEvents(message) {

    if(message.content.split(' ').length === 2) {
        let firstWord = message.content.split(" ")[0].toLowerCase()
        let secondWord = message.content.split(" ")[1].toLowerCase()     

                    
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
} 
}

module.exports = kvEvents