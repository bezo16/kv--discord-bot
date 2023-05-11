import { Message } from "discord.js"
import findBgQuote from "../functions/books/bg/findBgQuote"
import sendImg from "../functions/canvas/sendImageQuote"
import sendRandomBg from "../functions/books/bg/sendRandomBg"
import sendRandomBgImage from "../functions/books/bg/sendRandomBgImage"
import createTextEmbed from "../functions/common/createTextEmbed"

import rkQuotesBg from "../data/bg/rk-bg"

function bgHandler(message: Message) {
  const words = message.content.split(" ")
  if (words.length !== 2) return
  const [firstWord, secondWord] = words
  if (!["?bg", "?bgi"].includes(firstWord)) return


  if (secondWord.match(/^\d+\.\d+$/g)) {
    const resultQuote = findBgQuote(secondWord, message)
    if (!resultQuote) return
    const chapterNum = secondWord.split(".")[0]

    if (firstWord === "?bgi") sendImg(message, resultQuote.text, `Bhagavad-Gītā ${chapterNum}.${resultQuote.number}`)
    if (firstWord === "?bg") {
      const embed = createTextEmbed({ description: `${resultQuote.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`, title: "Hare Krišna" })
      message.channel.send({ embeds: [embed] })
    }
  }


  if (secondWord === "top" && firstWord === "?bg") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const chapterNum = selectedQuoteBg[0]
    const resultQuote = findBgQuote(selectedQuoteBg.join("."), message)
    const embed = createTextEmbed({ description: `${resultQuote!.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote!.number}](https://vedabase.io${resultQuote!.link})`, title: "Hare Krišna" })
    message.channel.send({ embeds: [embed] })
  }

  if (secondWord === "top" && firstWord === "?bgi") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const resultQuote = findBgQuote(selectedQuoteBg.join("."), message)
    sendImg(message, `${resultQuote?.text}`, `Bhagavad-Gītā ${selectedQuoteBg[0]}.${resultQuote?.number}`)
  }


  if (firstWord === "?bg" && secondWord === "r") sendRandomBg(message)
  if (firstWord === "?bgi" && secondWord === "r") sendRandomBgImage(message)
}

export default bgHandler
