import { Message, AttachmentBuilder } from "discord.js"
import Canvas, { registerFont } from "canvas"
import resize from "./resizes"
registerFont("./data/fonts/Gabriola.ttf", { family: "Comic Sans" })

async function sendImageQuote(message: Message, text: string, quote: string, canvasreturn = false) {


  let textLength = 0
  let resultText = ""
  let textWidth = null
  const quoteImage = { url: "" }
  const randomNum = Math.floor(Math.random() * 64) + 1
  quoteImage.url = `./data/images/quotes-bgs/bg${randomNum}.jpg`
  const imageUrl = quoteImage.url
  const imageUrl2 = "./data/images/logos/logo.png"

  const canvas = Canvas.createCanvas(700, 700)
  const ctx = canvas.getContext("2d")

  const background = await Canvas.loadImage(imageUrl)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  const background2 = await Canvas.loadImage(imageUrl2)
  const logoWidth = 70
  const logoHeight = 50
  ctx.drawImage(background2, (350 - (logoWidth / 2)), canvas.height - 85, logoWidth, logoHeight)

  const resizeValues = {
    posY: 160,
    posYChange: 72,
    charLength: 20,
  }

  resize(text, ctx, resizeValues)
  const font = Number(ctx.font.slice(0, 2))

  const splitedText = text.split(" ")
  splitedText.forEach((item, index) => {
    textLength += item.length
    const splititem = item.split("")
    let parsedItem = ""
    splititem.forEach((letter) => {
      if (letter === String.fromCharCode(7779)) parsedItem += "s"
      else if (letter === "ṇ") parsedItem += "n"
      else if (letter === "ṅ") parsedItem += "n"
      else if (letter === "Ṛ") parsedItem += "R"
      else if (letter === "ṛ") parsedItem += "r"
      else if (letter === "ṁ") parsedItem += "m"
      else if (letter === "ḥ") parsedItem += "h"
      else if (letter === "ṭ") parsedItem += "t"
      else if (letter === "Ṭ") parsedItem += "T"
      else if (letter === "ḍ") parsedItem += "d"
      else parsedItem += letter
    })

    if (textLength < resizeValues.charLength) {
      resultText += `${parsedItem} `
      if (index === splitedText.length - 1) {
        textLength = 0
        textWidth = ctx.measureText(resultText)
        ctx.shadowColor = "black"
        ctx.shadowBlur = 5
        ctx.lineWidth = 4
        ctx.strokeText(resultText, ((350) - (textWidth.width / 2)), resizeValues.posY)
        ctx.shadowBlur = 0
        ctx.fillStyle = "white"
        ctx.fillText(resultText, ((350) - (textWidth.width / 2)), resizeValues.posY)
        resultText = ""
        resizeValues.posY += resizeValues.posYChange
      }
    } else {
      resultText += `${parsedItem} `
      textLength = 0
      textWidth = ctx.measureText(resultText)
      ctx.shadowColor = "black"
      ctx.shadowBlur = 8
      ctx.lineWidth = 3
      ctx.strokeText(resultText, ((350) - (textWidth.width / 2)), resizeValues.posY)
      ctx.shadowBlur = 0
      ctx.fillStyle = "white"
      ctx.fillText(resultText, ((350) - (textWidth.width / 2)), resizeValues.posY)
      resultText = ""
      resizeValues.posY += resizeValues.posYChange
    }
  })

  ctx.font = `${Math.floor(font * 0.5)}px Gabriola`
  ctx.shadowBlur = 1

  const quoteText = quote
  textWidth = ctx.measureText(quoteText)

  ctx.fillText(quoteText, ((350) - (textWidth.width / 2)), resizeValues.posY)

  ctx.font = "30px Gabriola"

  ctx.fillStyle = "white"
  const reinText = "@reinkarnacia.sk"
  textWidth = ctx.measureText(reinText)
  ctx.fillText(reinText, ((350) - (textWidth.width / 2)), canvas.height - 15)

  if (canvasreturn) return canvas.toBuffer()

  const atachment = new AttachmentBuilder(canvas.toBuffer(), { name: "bot-quotes.png" })
  message.channel.send({ files: [atachment] })
}

export default sendImageQuote
