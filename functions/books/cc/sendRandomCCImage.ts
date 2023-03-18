import cc from "../../../data/cc/cc"
import sendImg from "../../canvas/sendImageQuote"
import { Message } from "discord.js"

function sendRandomCCImage(message: Message) {
  const cantoNum = Math.floor(Math.random() * 3)
  const cantoArray = cc[cantoNum]
  const chapterNum = Math.floor(Math.random() * cantoArray.length)
  const chapter = cantoArray[chapterNum]
  const quoteNum = Math.floor(Math.random() * chapter.length)
  sendImg(message, chapter[quoteNum], `Śrī Caitanya-Caritāmrta ${cantoNum + 1}.${chapterNum + 1}.${quoteNum + 1}`)
}

export default sendRandomCCImage
