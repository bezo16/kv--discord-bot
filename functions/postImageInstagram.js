let Jimp = require('jimp')
let fs = require('fs')

async function postImageInstagram(quotes,func,instagramClient) {
    let selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]
    let resultText = selectedQuote.content
    let resultQuote = selectedQuote.quote
    console.log('post image instagram')


    await func(resultText, resultQuote,true).then(res => {
        fs.writeFileSync('./temp/igImage.png', res)
    })
    ;(async () => {
        await instagramClient.login() 
        console.log('loged')
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
            console.log('before uplaod')
            await instagramClient.uploadPhoto({ photo, caption: resultQuote, post: 'feed' })  
            console.log('after uplaod')
            fs.unlink('./temp/igImage.jpg',() => {})
            fs.unlink('./temp/igImage.png',() => {})
            console.log('after delete image')
        }, 10000);
      })()
    } 



    
module.exports = postImageInstagram