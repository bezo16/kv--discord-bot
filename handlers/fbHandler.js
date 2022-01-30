let Jimp = require('jimp')
let fs = require('fs')
const axios = require('axios');
const quotes = require('../data/newig')
let func = require('../functions/sendImageQuote')
let message = ''
require('dotenv').config()

async function fbHandler() {

        
     
        await fs.unlink('./temp/fbImage.png',() => {})
        await fs.unlink('./temp/fbImage.jpg',() => {})
        let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]
        let resultText = selectedQuote.content
        let resultQuote = selectedQuote.quote
        console.log('post image instagram')
        
        
        await func(message,resultText, resultQuote,true).then(res => {
            fs.writeFileSync('./temp/fbImage.png', res)
        })

            Jimp.read("./temp/fbImage.png", function (err2, image) {
                if (err2) {
                    console.log(err2)
                } else {
                    image.write("./temp/fbImage.jpg")
                }
            })
            console.log('jimped jpg image')  
            setTimeout( async () => {
                const photo = '173.212.239.101:7777/fbImage.jpg'
                await axios.post(`https://graph.facebook.com/111383764782486/photos?url=${photo}&access_token=${process.env.FB_ACCESS_TOKEN}`)
                .then((res) => console.log(res))
            }, 10000);
        setTimeout(fbHandler, 3600000 * (Math.random() * 10 + 10))
    } 



    
module.exports = fbHandler