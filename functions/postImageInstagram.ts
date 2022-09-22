// import Jimp from 'jimp'
// import fs from 'fs'
// import Instagram from 'instagram-web-api'
// import quotes from '../data/newig'
// import func from './sendImageQuote'

// const instagramClient = new Instagram({
//   username: process.env.IGUSERNAME,
//   password: process.env.IGPASSWORD
// })

// // can edit
// const hashtags = '#duchovno#poznanie#bhagavadgita#hinduizmus#sanathanadharma#citaty#slovensko'

// async function postImageInstagram() {
//   setTimeout(async () => {
//     const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]
//     const resultText = selectedQuote.content
//     const resultQuote = selectedQuote.quote

//     await func(null, resultText, resultQuote, '', true).then((res) => {
//       fs.writeFileSync('./temp/igImage.png', res)
//     });
//     (async () => {
//       await instagramClient.login()
//       Jimp.read('./temp/igImage.png', (err2, image) => {
//         if (err2) console.error(err2)
//         else image.write('./temp/igImage.jpg')
//       })
//       setTimeout(async () => {
//         const photo = './temp/igImage.jpg'
//         await instagramClient.uploadPhoto({ photo, caption: `${resultQuote}\n${hashtags}`, post: 'feed' })
//         fs.unlink('./temp/igImage.jpg', () => {})
//         fs.unlink('./temp/igImage.png', () => {})
//       }, 10000);
//     })()
//     setTimeout(postImageInstagram, 3600000 * (Math.random() * 20 + 20))
//   }, 3600000 * (Math.random() * 20 + 20))
// }

// module.exports = postImageInstagram
