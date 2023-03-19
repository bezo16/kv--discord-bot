import cc from "../../../data/cc/cc"
import { Message } from "discord.js"

function sendRandomCC(message: Message) {

  const cantoNum = Math.floor(Math.random() * 3)
  const chapterNum = Math.floor(Math.random() * cc[cantoNum].length)
  const quoteNum = Math.floor(Math.random() * cc[cantoNum][chapterNum].length)
  message.channel.send({ content: `${cc[cantoNum][chapterNum][quoteNum]} ** ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1} ** ` })
}

export default sendRandomCC
