import { Message, Client } from "discord.js"
import findBgQuote from "../functions/books/bg/findBgQuote"
import sendImg from "../functions/canvas/sendImageQuote"
import sendRandomBg from "../functions/books/bg/sendRandomBg"
import sendRandomBgImage from "../functions/books/bg/sendRandomBgImage"
import createTextEmbed from "../functions/common/createTextEmbed"

import rkQuotesBg from "../data/bg/rk-bg"

function bgHandler(message: Message, client: Client) {
  const { channelId } = message
  const words = message.content.split(" ")
  if (words.length !== 2) return
  const [firstWord, secondWord] = words
  if (!["?bg", "?bgi", "?bgsk", "?bgisk"].includes(firstWord)) return


  if (secondWord.match(/^\d+\.\d+$/g)) {
    const resultQuote = findBgQuote(secondWord, message)
    if (!resultQuote) return
    const chapterNum = secondWord.split(".")[0]

    if (firstWord === "?bgi") sendImg(client, channelId, resultQuote.text, `Bhagavad-Gītā ${chapterNum}.${resultQuote.number}`)
    if (firstWord === "?bg") {
      const embed = createTextEmbed({ description: `${resultQuote.text} \n\n [Bhagavad-Gītā ${chapterNum}.${resultQuote.number}](https://vedabase.io${resultQuote.link})`, title: "Hare Krišna" })
      message.channel.send({ embeds: [embed] })
    }
  }


  if (secondWord === "top" && firstWord === "?bg") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const resultQuote = findBgQuote(selectedQuoteBg.join("."), message)
    message.channel.send(`${resultQuote?.text} \n\n**Bhagavad-Gītā ${selectedQuoteBg[0]}.${resultQuote?.number} ** `)
  }

  if (secondWord === "top" && firstWord === "?bgi") {
    const selectedQuoteBg = rkQuotesBg[Math.floor(Math.random() * rkQuotesBg.length)].split(".")
    const resultQuote = findBgQuote(selectedQuoteBg.join("."), message)
    sendImg(client, channelId, `${resultQuote?.text}`, `Bhagavad-Gītā ${selectedQuoteBg[0]}.${resultQuote?.number}`)
  }


  if (firstWord === "?bg" && secondWord === "r") sendRandomBg(client, channelId)
  if (firstWord === "?bgi" && secondWord === "r") sendRandomBgImage(client, channelId)
}

export default bgHandler
