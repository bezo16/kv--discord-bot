let Jimp = require('jimp')
let fs = require('fs')
const quotes = require('../data/newig')
const Instagram = require('instagram-web-api')
const instagramClient = new Instagram({username:process.env.IGUSERNAME,password:process.env.IGPASSWORD})
let message = ''

async function postImageInstagram(func) {
    let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]
    let resultText = selectedQuote.content
    let resultQuote = selectedQuote.quote
    console.log('post image instagram')


    await func(message,resultText, resultQuote,true).then(res => {
        fs.writeFileSync('./temp/igImage.png', res)
    })
    ;(async () => {
        await instagramClient.login() 
        Jimp.read("./temp/igImage.png", function (err2, image) {
            if (err2) {
                console.log(err2)
              } else {
                  image.write("./temp/igImage.jpg")
              }
          })
        console.log('jimped jpg image')  
        setTimeout( async () => {
            const photo = './temp/igImage.jpg'
            await instagramClient.uploadPhoto({ photo, caption: resultQuote, post: 'feed' })  
            fs.unlink('./temp/igImage.jpg',() => {})
            fs.unlink('./temp/igImage.png',() => {})
        }, 10000);
      })()
    } 



    
module.exports = postImageInstagram