import { Message } from "discord.js"
import rkQuotesSb from "../data/sb/rk-sb"
import sendImg from "../functions/canvas/sendImageQuote"
import sendRandomSb from "../functions/books/sb/sendRandomSb"
import sendRandomSbImage from "../functions/books/sb/sendRandomSbImage"
import findSBQuote from "../functions/books/sb/findSbQuote"
import findTopSbQuote from "../functions/books/sb/findTopSbQuote"
import createTextEmbed from "../functions/common/createTextEmbed"

function sbHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length !== 2) return
  const firstWord = words[0]
  if (!["?sb", "?sbi"].includes(firstWord)) return
  const secondWord = words[1]


  if (secondWord.match(/^\d+\.\d+\.\d+$/g)) {
    const [cantoNum, chapterNum, quoteNum] = secondWord.split(".")


    const resultQuote = findSBQuote(`${cantoNum}.${chapterNum}.${quoteNum}`, message)
    if (!resultQuote) return

    if (firstWord === "?sb") {
      const embed = createTextEmbed({ description: `${resultQuote.text} \n\n[Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`, title: "Hare Krišna" })
      message.channel.send({ embeds: [embed] })
    }
    if (firstWord === "?sbi") sendImg(message, resultQuote.text, `Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${quoteNum}`)
  }


  if (secondWord === "r" && firstWord === "?sb") sendRandomSb(message)
  if (secondWord === "r" && firstWord === "?sbi") sendRandomSbImage(message)


  if (secondWord === "top" && firstWord === "?sb") {
    const { resultQuote, cantoNum, chapterNum } = findTopSbQuote(message)
    message.channel.send(`Śrīmad-Bhāgavatam ${resultQuote?.text} ** Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote?.number} **`)
  }

  if (secondWord === "top" && firstWord === "?sbi") {
    const { resultQuote, cantoNum, chapterNum } = findTopSbQuote(message)
    sendImg(message, resultQuote!.text, `Śrīmad-Bhāgavatam ${cantoNum}.${chapterNum}.${resultQuote!.number}`)
  }
}

export default sbHandler
