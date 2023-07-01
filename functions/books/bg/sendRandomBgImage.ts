
import bg from "../../../data/bg/bhagavad-gita-sk"
import sendImg from "../../canvas/sendImageQuote"
import { Message } from "discord.js"
import findBgQuote from "./findBgQuote"

function sendRandomBgImage(message: Message) {
  const chapterNum = Math.floor(Math.random() * 18)
  const quoteNum = Math.floor(Math.random() * bg[chapterNum].length)
  const resultquote = findBgQuote(`${chapterNum + 1}.${quoteNum + 1}`, "sk", message)

  if (!resultquote) {
    message.channel.send("quote not found")

    return
  }

  sendImg(message, resultquote.text, `Bhagavad-Gītā ${chapterNum}.${resultquote.number}`)
}

export default sendRandomBgImage
