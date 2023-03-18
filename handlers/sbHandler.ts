import { Message, Client, EmbedBuilder } from "discord.js"
import sb from "../data/sb/sb"
import rkQuotesSb from "../data/sb/rk-sb"
import sendImg from "../functions/canvas/sendImageQuote"
import sendRandomSb from "../functions/books/sb/sendRandomSb"
import sendRandomSbImage from "../functions/books/sb/sendRandomSbImage"
import findSBQuote from "../functions/books/sb/findSbQuote"

function sbHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length !== 2) return
  const firstWord = words[0]
  if (!["?sb", "?sbi"].includes(firstWord)) return
  const secondWord = words[1]


  if (secondWord.match(/^\d+\.\d+\.\d+$/g)) {
    const words = message.content.split(" ")[1].split(".").map(w => Number(w))
    const cantoNum = Number(words[0])
    const chapterNum = Number(words[1])
    const quoteNum = Number(words[2])


    const resultQuote = findSBQuote(`${cantoNum}.${chapterNum}.${quoteNum}`, message)
    if (!resultQuote) return

    if (firstWord === "?sb") {
      const srimadEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setDescription(`${resultQuote.text} \n\n[Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`)
      message.channel.send({ embeds: [srimadEmbed] })
    }
    if (firstWord === "?sbi") sendImg(message, resultQuote.text, `Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}`)
  }

  if (secondWord === "r" && firstWord === "?sb") sendRandomSb(message)
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
