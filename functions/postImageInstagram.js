const Jimp,fs

async function postImageInstagram(ig,bg,func,instagramClient) {
    let selQuote = ig[Math.floor(Math.random() * ig.length)]
    console.log('post image instagram')
    let chapter = Number(selQuote.split('.')[0]) - 1  
    let chapterText = Number(selQuote.split('.')[1]) - 1  
    let resultText = bg[chapter][chapterText]
    let resultQuote = ` ${chapter +1}.${chapterText +1}`
    await func(resultText,'Bhagavad-Gītā ' + resultQuote,true).then(res => {
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
            await instagramClient.uploadPhoto({ photo, caption: 'Bhagavad-Gītā ' + resultQuote, post: 'feed' }) 
            console.log('after uplaod')
            fs.unlink('./temp/igImage.jpg',() => {})
            fs.unlink('./temp/igImage.png',() => {})
            console.log('after delete image')
        }, 10000);
      })()
    } 



    
module.exports = postImageInstagram