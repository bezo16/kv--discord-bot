let Jimp = require('jimp')
let fs = require('fs')
const axios = require('axios');
const quotes = require('../data/newig')
let func = require('../functions/sendImageQuote')
let message = ''

async function fbHandler() {

        
        
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
                const photo = './temp/fbImage.jpg'
                await axios.post(`https://graph.facebook.com/111383764782486/photos?url=${photo}&access_token=EAAHQ2UMugWcBAPw29NXJZAT6V19tg8DTg8XXDOHrzsW2aFBdTD7gSIcbkN3CW8ZB0cKxK8yUuzEMkHDtSSDghBIk2nlHAzWBgjQjdZABZBn0pmcFmC1UazcvGjRzvp68DC4SeHBZBlHgXoZB6vHovPF6MZB8yE3CttaDLOQHgPGmeh91ZAsSl3D3edGLfqfqkwMZD`)
                .then((res) => console.log(res))
                fs.unlink('./temp/fbImage.jpg',() => {})
                fs.unlink('./temp/fbImage.png',() => {})
            }, 10000);
        setTimeout(fbHandler, 3600000 * (Math.random() * 10 + 10))
    } 



    
module.exports = fbHandler