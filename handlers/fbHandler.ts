// import Jimp from "jimp"
// import fs from "fs"
// import axios from "axios"
// import quotes from "../data/other/newig"
// import createQuote from "../functions/canvas/sendImageQuote"

// const photo = "173.212.239.101:7777/fbImage.jpg"

// async function fbHandler() {
//   await fs.unlink("./temp/fbImage.png", () => {})
//   await fs.unlink("./temp/fbImage.jpg", () => {})
//   const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)]
//   const resultText = selectedQuote.content
//   const resultQuote = selectedQuote.quote
//   const photoDescription = "https://reinkarnacia.sk/"

//   await createQuote(null, resultText, resultQuote, "").then((imageBuffer) => {
//     fs.writeFileSync("./temp/fbImage.png", imageBuffer)
//   })
//   Jimp.read("./temp/fbImage.png", (err2, image) => {
//     if (err2) console.error(err2)
//     else image.write("./temp/fbImage.jpg")
//   })
//   setTimeout(async () => {
//     // await axios.post(`https://graph.facebook.com/111383764782486/photos?url=${photo}&access_token=${process.env.FB_ACCESS_TOKEN}&message=${photoDescription}`)
//     // .then((res) => console.log(res))
//     // .catch(err => console.log(err))

//     await axios.post(`graph.facebook.com/333460573412422/feed?url=${photo}&access_token=EAAayiZAYS1YYBAJft4KtqpauWyY1XPOrLZARrIr8nBnQ9ZBc4Hy8awjBfQmzrC6L6De3cpKJcwgiHzK1tgDGCA3qW5s4HKPvx7amVpMGwTTZAV6do0W4ZCLO839Dfkc6yZC82UwCZBUXb0C3FyS61RFj7ZBS5vmy1HaFpKgzI9uG5tk65PKFLYRjM1TQSFeZBucSrC74r2ZBgTfLj3iwGIMR9F5FOdoPnywgcZD&message=${photoDescription}`)
//       .catch((err) => console.error(err))
//   }, 10000)
//   setTimeout(fbHandler, 3600000 * (Math.random() * 2 + 3))
// }
// export default fbHandler
