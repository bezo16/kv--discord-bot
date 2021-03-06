let Jimp = require('jimp')
let fs = require('fs')
const quotes = require('../data/newig')
const Instagram = require('instagram-web-api')
const instagramClient = new Instagram({username:process.env.IGUSERNAME,password:process.env.IGPASSWORD})
let func = require('../functions/sendImageQuote')
let message = ''

// can edit 
let hashtags = '#duchovno#poznanie#bhagavadgita#hinduizmus#sanathanadharma#citaty#slovensko'



async function postImageInstagram() {
        setTimeout( async () => {
        console.log('post image instagram')
            
            
            
            let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]
            let resultText = selectedQuote.content
            let resultQuote = selectedQuote.quote
            
            
            await func(message,resultText, resultQuote,true).then(res => {
                fs.writeFileSync('./temp/igImage.png', res)
             })
            ;(async () => {
            await instagramClient.login() 
            Jimp.read("./temp/igImage.png", function (err2, image) {
                if (err2) console.log(err2)
                else image.write("./temp/igImage.jpg")
            })
            setTimeout( async () => {
                const photo = './temp/igImage.jpg'
                await instagramClient.uploadPhoto({ photo, caption: resultQuote + `\n${hashtags}`, post: 'feed' })  
                fs.unlink('./temp/igImage.jpg',() => {})
                fs.unlink('./temp/igImage.png',() => {})
            }, 10000);
        })()
        setTimeout(postImageInstagram, 3600000 * (Math.random() * 20 + 20))

    }, 3600000 * (Math.random() * 20 + 20))
} 



    
module.exports = postImageInstagram