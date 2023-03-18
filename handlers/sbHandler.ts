import { Message, Client, EmbedBuilder } from "discord.js"
import sb from "../data/sb/sb"
import rkQuotesSb from "../data/sb/rk-sb"
import sendImg from "../functions/canvas/sendImageQuote"
import sendRandomSb from "../functions/books/sb/sendRandomSb"
import sendRandomSbImage from "../functions/books/sb/sendRandomSbImage"

function sbHandler(message: Message, client: Client) {
  const { channelId } = message
  const words = message.content.split(" ")
  if (words.length !== 2) return
  const firstWord = words[0]
  if (!["?sb", "?sbi"].includes(firstWord)) return
  const secondWord = words[1]


  if (secondWord.match(/^\d+\.\d+\.\d+$/g)) {
    const words = message.content.split(" ")[1].split(".").map(w => Number(w))
    if (words.some(w => !w)) return
    let [canto, chapter, quoteNum] = words

    if (Number.isNaN(canto) || Number.isNaN(chapter) || Number.isNaN(quoteNum)) return
    canto = Number(canto)
    chapter = Number(chapter)
    quoteNum = Number(quoteNum)
    if (canto < 1 || canto > 12) return message.channel.send("wrong canto number")
    if (chapter < 1 || sb[canto - 1].length < chapter) return message.channel.send("wrong chapter number")
    if (quoteNum < 1 ||
    (Number(sb[canto - 1][chapter - 1][sb[canto - 1][chapter - 1].length - 1].number.split("-")[0]) < quoteNum)) return message.channel.send("wrong quote number")
    const quoteIndex = sb[canto - 1][chapter - 1].findIndex(q => {
      if (q.number === String(quoteNum)) return true
      if (q.number.includes("-")) {
        const firstNum = q.number.split("-")[0]
        const secondNum = q.number.split("-")[1]
        if (quoteNum >= Number(firstNum) && quoteNum <= Number(secondNum)) return true
      }
    })

    const resultQuote = sb[canto - 1][chapter - 1][quoteIndex]

    if (firstWord === "?sb") {
      const srimadEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`${resultQuote.text} \n\n[Śrīmad-Bhāgavatam ${canto}.${chapter}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`)
      message.channel.send({ embeds: [srimadEmbed] })
    } else {
      sendImg(message, resultQuote.text, `Śrīmad-Bhāgavatam ${canto}.${chapter}.${quoteNum}`)
    }
  }

  if (secondWord === "r" && firstWord === "?sb") sendRandomSb(client, channelId)
  if (secondWord === "r" && firstWord === "?sbi") sendRandomSbImage(message)

  if (secondWord === "top" && firstWord === "?sb") {
    let selQuote = ""
    while (!selQuote) {
      const quote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)]
      if (typeof (quote) === "string") selQuote = quote
    }
    const cantoNum = Number(selQuote.split(".")[0])
    const chapterNum = Number(selQuote.split(".")[1])
    const quoteNum = Number(selQuote.split(".")[2])
    message.channel.send(` Śrīmad-Bhāgavatam ${sb[cantoNum - 1][chapterNum - 1][quoteNum - 1].text} ** Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum} **`)
  }

  if (secondWord === "top" && firstWord === "?sbi") {
    let selQuote = ""
    while (!selQuote) {
      const quote = rkQuotesSb[Math.floor(Math.random() * rkQuotesSb.length)]
      if (typeof (quote) === "string") selQuote = quote
    }
    const cantoNum = Number(selQuote.split(".")[0])
    const chapterNum = Number(selQuote.split(".")[1])
    const quoteNum = Number(selQuote.split(".")[2])
    sendImg(message, sb[cantoNum - 1][chapterNum - 1][quoteNum - 1].text, `Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}`)
  }
}

export default sbHandler
