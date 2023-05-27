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
  if (!["?bg", "?bgi", "?bgien", "?bgen", "?bgicz", "?bgcz"].includes(firstWord)) return


  if (secondWord.match(/^\d+\.\d+$/g)) {

    if (firstWord === "?bgi" || firstWord === "?bg") { // SVK
      const resultQuote = findBgQuote(secondWord, "sk", message)
      if (!resultQuote) return
      const chapterNum = secondWord.split(".")[0]

      if (firstWord === "?bgi") sendImg(message, resultQuote.text, `Bhagavad-Gītā ${chapterNum}.${resultQuote.number}`)
      if (firstWord === "?bg") {
        const embed = createTextEmbed({ description: `${resultQuote.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`, title: "Hare Krišna" })
        message.channel.send({ embeds: [embed] })
      }
    }

    if (firstWord === "?bgicz" || firstWord === "?bgcz") { // CZ
      const resultQuote = findBgQuote(secondWord, "cz", message)
      if (!resultQuote) return
      const chapterNum = secondWord.split(".")[0]

      if (firstWord === "?bgicz") sendImg(message, resultQuote.text, `Bhagavad-Gītā ${chapterNum}.${resultQuote.number}`)
      if (firstWord === "?bgcz") {
        const embed = createTextEmbed({ description: `${resultQuote.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`, title: "Hare Krišna" })
        message.channel.send({ embeds: [embed] })
      }
    }

    if (firstWord === "?bgien" || firstWord === "?bgen") { // EN
      const resultQuote = findBgQuote(secondWord, "en", message)
      if (!resultQuote) return
      const chapterNum = secondWord.split(".")[0]

      if (firstWord === "?bgien") sendImg(message, resultQuote.text, `Bhagavad-Gītā ${chapterNum}.${resultQuote.number}`)
      if (firstWord === "?bgen") {
        const embed = createTextEmbed({ description: `${resultQuote.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`, title: "Hare Krišna" })
        message.channel.send({ embeds: [embed] })
      }
    }

  }


  if (secondWord === "top" && firstWord === "?bg") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const chapterNum = selectedQuoteBg[0]
    const resultQuote = findBgQuote(selectedQuoteBg.join("."), "sk", message)
    const embed = createTextEmbed({ description: `${resultQuote!.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote!.number}](https://vedabase.io${resultQuote!.link})`, title: "Hare Krišna" })
    message.channel.send({ embeds: [embed] })
  }

  if (secondWord === "top" && firstWord === "?bgi") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const resultQuote = findBgQuote(selectedQuoteBg.join("."), "cz", message)
    sendImg(message, `${resultQuote?.text}`, `Bhagavad-Gītā ${selectedQuoteBg[0]}.${resultQuote?.number}`)
  }


  if (firstWord === "?bg" && secondWord === "r") sendRandomBg(message)
  if (firstWord === "?bgi" && secondWord === "r") sendRandomBgImage(message)
}

export default bgHandler
