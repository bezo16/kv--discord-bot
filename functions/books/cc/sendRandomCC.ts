import cc from "../../../data/cc/cc"
import { Message } from "discord.js"

function sendRandomCC(message: Message) {

  const cantoNum = Math.floor(Math.random() * 3)
  const canto = cc[cantoNum]
  const chapterNum = Math.floor(Math.random() * canto.length)
  const chapter = canto[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  message.channel.send({ content: `${chapter[quoteNum]} ** ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1} ** ` })
}

export default sendRandomCC
